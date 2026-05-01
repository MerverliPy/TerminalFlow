"use client";

import { useEffect, useState } from "react";

import {
  getLocalStoreSummary,
  resetLocalStoreSnapshot,
  subscribeToLocalStoreChanges,
} from "@/lib/storage/local-store";
import type { LocalStoreSummary } from "@/lib/storage/storage-types";

const INITIAL_SUMMARY: LocalStoreSummary = {
  status: "unavailable",
  version: 1,
  updatedAt: null,
  counts: {
    projects: 0,
    sessions: 0,
    workflows: 0,
    workflowRuns: 0,
    workflowRunLogs: 0,
    simulatedCommandResults: 0,
    commandSimulationHistoryBySessionId: 0,
    commandDraftBySessionId: 0,
  },
};

const STATUS_LABELS: Record<LocalStoreSummary["status"], string> = {
  unavailable: "Unavailable",
  empty: "Empty",
  seeded: "Seeded",
  custom: "Custom",
};

const STATUS_CLASSES: Record<LocalStoreSummary["status"], string> = {
  unavailable: "workspace-pill--accent",
  empty: "workspace-pill--warn",
  seeded: "workspace-pill--good",
  custom: "workspace-pill--warn",
};

export function StorageStatusPanel() {
  const [summary, setSummary] = useState<LocalStoreSummary>(() => {
    if (typeof window === "undefined") {
      return INITIAL_SUMMARY;
    }

    const current = getLocalStoreSummary();
    if (current.status === "unavailable") {
      resetLocalStoreSnapshot();
      return getLocalStoreSummary();
    }

    return current;
  });

  const refresh = () => {
    setSummary(getLocalStoreSummary());
  };

  useEffect(() => {
    return subscribeToLocalStoreChanges(refresh);
  }, []);

  return (
    <section className="shell__section session-panel storage-panel">
      <div className="session-panel__header">
        <span className="section-note">Local storage status</span>
        <span className={`workspace-pill ${STATUS_CLASSES[summary.status]}`}>
          {STATUS_LABELS[summary.status]}
        </span>
      </div>

      <p className="surface-heading__copy">
        Local persistence keeps static app data on this device only. The schema is typed and versioned for future local migrations.
      </p>

      <div className="settings-grid storage-grid">
        <article className="settings-card">
          <span className="settings-card__label">Schema version</span>
          <span className="settings-card__title">v{summary.version}</span>
          <p className="card-copy">Explicit browser-local schema version.</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Last updated</span>
          <span className="settings-card__title">
            {summary.updatedAt ?? "Not stored yet"}
          </span>
          <p className="card-copy">Updated whenever a local write occurs.</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Simulated results</span>
          <span className="settings-card__title">{summary.counts.simulatedCommandResults}</span>
          <p className="card-copy">Stored command simulations by session.</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Simulation history</span>
          <span className="settings-card__title">{summary.counts.commandSimulationHistoryBySessionId}</span>
          <p className="card-copy">Per-session browser history records.</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Workflow runs</span>
          <span className="settings-card__title">{summary.counts.workflowRuns}</span>
          <p className="card-copy">Persisted static run snapshots and logs.</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Command drafts</span>
          <span className="settings-card__title">{summary.counts.commandDraftBySessionId}</span>
          <p className="card-copy">Stored locally by session for browser restore.</p>
        </article>
      </div>
    </section>
  );
}
