"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { MOCK_WORKFLOWS } from "@/lib/domain/mock-data";
import { workflowRunCompareRoute, workflowRunReplayRoute } from "@/lib/navigation/routes";
import {
  clearSavedSimulationRuns,
  getLocalSimulationStorageStatus,
  resetSavedSimulationRuns,
  subscribeToLocalStoreChanges,
} from "@/lib/storage/local-store";
import type { LocalSimulationStorageStatus } from "@/lib/storage/storage-types";

const INITIAL_STATUS: LocalSimulationStorageStatus = {
  state: "unavailable",
  snapshotCount: 0,
  replaySessionCount: 0,
  comparisonCount: 0,
  comparisonFindingCount: 0,
  lastUpdatedAt: null,
  note: "Simulation storage has not been initialized yet.",
};

const STATUS_LABELS: Record<LocalSimulationStorageStatus["state"], string> = {
  unavailable: "Unavailable",
  empty: "Empty",
  seeded: "Seeded",
  custom: "Custom",
};

const STATUS_CLASSES: Record<LocalSimulationStorageStatus["state"], string> = {
  unavailable: "workspace-pill--accent",
  empty: "workspace-pill--warn",
  seeded: "workspace-pill--good",
  custom: "workspace-pill--warn",
};

export function LocalSimulationStoragePanel() {
  const [status, setStatus] = useState<LocalSimulationStorageStatus>(() =>
    typeof window === "undefined" ? INITIAL_STATUS : getLocalSimulationStorageStatus(),
  );
  const [lastAction, setLastAction] = useState("Simulation storage is local-only.");

  useEffect(() => {
    const refresh = () => setStatus(getLocalSimulationStorageStatus());
    refresh();
    return subscribeToLocalStoreChanges(refresh);
  }, []);

  function handleClear() {
    clearSavedSimulationRuns();
    setStatus(getLocalSimulationStorageStatus());
    setLastAction("Cleared saved simulations in browser-local storage.");
  }

  function handleRestore() {
    resetSavedSimulationRuns();
    setStatus(getLocalSimulationStorageStatus());
    setLastAction("Restored seeded simulation snapshots locally.");
  }

  const workflowId = MOCK_WORKFLOWS[0]?.id ?? "workflow-check";

  return (
    <section className="shell__section simulation-storage-panel">
      <div className="session-panel__header">
        <span className="section-note">Simulation storage</span>
        <span className={`workspace-pill ${STATUS_CLASSES[status.state]}`}>{STATUS_LABELS[status.state]}</span>
      </div>

      <p className="surface-heading__copy">
        Local simulation storage keeps saved snapshots, replay sessions, and comparison findings in browser storage only.
      </p>

      <div className="settings-grid">
        <article className="settings-card">
          <span className="settings-card__label">Snapshots</span>
          <span className="settings-card__title">{status.snapshotCount}</span>
          <p className="card-copy">Saved simulation snapshots stored on this device.</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Replay sessions</span>
          <span className="settings-card__title">{status.replaySessionCount}</span>
          <p className="card-copy">Replay control state remains browser-local.</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Comparisons</span>
          <span className="settings-card__title">{status.comparisonCount}</span>
          <p className="card-copy">Comparison records are seeded and local-only.</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Findings</span>
          <span className="settings-card__title">{status.comparisonFindingCount}</span>
          <p className="card-copy">Finding cards render from browser-local records.</p>
        </article>
      </div>

      <div className="composer__actions storage-actions">
        <button className="composer__button composer__button--primary" type="button" onClick={handleRestore}>
          Restore simulations
        </button>
        <button className="composer__button" type="button" onClick={handleClear}>
          Clear simulations
        </button>
      </div>

      <div className="workflow-builder__status">
        <Link className="settings-link" href={workflowRunReplayRoute(workflowId)}>
          Open replay history
        </Link>
        <Link className="settings-link" href={workflowRunCompareRoute(workflowId)}>
          Open compare view
        </Link>
      </div>

      <p className="composer__hint">{lastAction}</p>
      <p className="card-copy">{status.note}</p>
    </section>
  );
}
