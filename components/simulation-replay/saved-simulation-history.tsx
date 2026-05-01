"use client";

import { useEffect, useState } from "react";

import { SavedSimulationCard } from "@/components/simulation-replay/saved-simulation-card";
import { ResetSimulationsPanel } from "@/components/simulation-replay/reset-simulations-panel";
import { SimulationComparisonPanel } from "@/components/simulation-replay/simulation-comparison-panel";
import { SimulationReplayPanel } from "@/components/simulation-replay/simulation-replay-panel";
import { SimulationReplaySafetyNote } from "@/components/simulation-replay/simulation-replay-safety-note";
import { SimulationSnapshotDetail } from "@/components/simulation-replay/simulation-snapshot-detail";
import {
  getLocalStoreSummary,
  getPersistedSavedSimulationRuns,
  getPersistedSimulationComparisons,
  getPersistedSimulationComparisonFindings,
  getPersistedSimulationReplaySessions,
  clearSavedSimulationRuns,
  resetLocalStoreSnapshot,
  resetSavedSimulationRuns,
  savePersistedSimulationRunSnapshot,
  saveSimulationComparison,
  saveSimulationComparisonFindings,
  saveSimulationReplaySession,
  subscribeToLocalStoreChanges,
} from "@/lib/storage/local-store";
import { createLocalStoreSeed } from "@/lib/storage/seed";
import type {
  PersistedSimulationRunSnapshot,
  SimulationComparison,
  SimulationComparisonFinding,
  SimulationReplaySession,
} from "@/lib/storage/storage-types";

const ACTION_PREVIEWS: SimulationReplaySession["actionPreviews"] = [
  {
    id: "preview-save",
    kind: "save",
    label: "Save snapshot",
    detail: "Store a new browser-local snapshot from the selected simulated run.",
    mode: "local-only",
  },
  {
    id: "preview-replay",
    kind: "replay",
    label: "Replay snapshot",
    detail: "Replay the selected snapshot from its ordered local frames.",
    mode: "local-only",
  },
  {
    id: "preview-compare",
    kind: "compare",
    label: "Compare snapshot",
    detail: "Create a local comparison record against another saved snapshot.",
    mode: "local-only",
  },
  {
    id: "preview-export",
    kind: "export",
    label: "Export snapshot",
    detail: "Prepare an export preview in the UI only.",
    mode: "local-only",
  },
  {
    id: "preview-clear",
    kind: "clear",
    label: "Clear saved simulations",
    detail: "Remove saved simulation records from browser storage.",
    mode: "local-only",
  },
  {
    id: "preview-restore",
    kind: "restore",
    label: "Restore seeded demos",
    detail: "Restore the seeded local simulation records.",
    mode: "local-only",
  },
];

function createFallbackSession(snapshot: PersistedSimulationRunSnapshot): SimulationReplaySession {
  return {
    id: snapshot.replaySessionId,
    snapshotId: snapshot.id,
    workflowId: snapshot.workflowId,
    workflowName: snapshot.workflowName,
    status: "ready",
    currentFrameIndex: 0,
    actionPreviews: ACTION_PREVIEWS,
    startedAt: snapshot.capturedAt,
    updatedAt: snapshot.capturedAt,
    note: "Replay session seeded from local snapshot data.",
  };
}

function buildComparison(
  leftSnapshot: PersistedSimulationRunSnapshot,
  rightSnapshot: PersistedSimulationRunSnapshot,
): {
  comparison: SimulationComparison;
  findings: SimulationComparisonFinding[];
} {
  const findings: SimulationComparisonFinding[] = [
    {
      id: `${leftSnapshot.id}-${rightSnapshot.id}-status`,
      title: "Lifecycle status",
      detail: `${leftSnapshot.status} on the left versus ${rightSnapshot.status} on the right.`,
      severity: leftSnapshot.status === rightSnapshot.status ? "info" : "warn",
      leftSnapshotId: leftSnapshot.id,
      rightSnapshotId: rightSnapshot.id,
      leftFrameId: leftSnapshot.replayFrames[0]?.id,
      rightFrameId: rightSnapshot.replayFrames[0]?.id,
    },
    {
      id: `${leftSnapshot.id}-${rightSnapshot.id}-steps`,
      title: "Step count",
      detail: `Left snapshot has ${leftSnapshot.steps.length} steps while right has ${rightSnapshot.steps.length}.`,
      severity: leftSnapshot.steps.length === rightSnapshot.steps.length ? "info" : "warn",
      leftSnapshotId: leftSnapshot.id,
      rightSnapshotId: rightSnapshot.id,
      leftFrameId: leftSnapshot.replayFrames.at(-1)?.id,
      rightFrameId: rightSnapshot.replayFrames.at(-1)?.id,
    },
    {
      id: `${leftSnapshot.id}-${rightSnapshot.id}-logs`,
      title: "Log surface",
      detail: "The comparison surfaces browser-local log differences without any backend log ingestion.",
      severity: "blocked",
      leftSnapshotId: leftSnapshot.id,
      rightSnapshotId: rightSnapshot.id,
    },
  ];

  return {
    comparison: {
      id: `comparison-${leftSnapshot.id}-${rightSnapshot.id}`,
      leftSnapshotId: leftSnapshot.id,
      rightSnapshotId: rightSnapshot.id,
      title: `${leftSnapshot.workflowName} vs ${rightSnapshot.workflowName}`,
      summary: `Browser-local comparison between saved snapshots for ${leftSnapshot.workflowName}.`,
      status:
        leftSnapshot.status === rightSnapshot.status &&
        leftSnapshot.steps.length === rightSnapshot.steps.length
          ? "matched"
          : "diverged",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      findingIds: findings.map((finding) => finding.id),
      note: "Comparison records are stored locally only.",
    },
    findings,
  };
}

function getSeededWorkflowState(workflowId: string) {
  const seed = createLocalStoreSeed();
  const snapshots = seed.collections.savedSimulationRuns.filter((run) => run.workflowId === workflowId);
  const snapshotIds = new Set(snapshots.map((snapshot) => snapshot.id));
  const replaySessions = seed.collections.simulationReplaySessions.filter((session) =>
    snapshotIds.has(session.snapshotId),
  );
  const comparisons = seed.collections.simulationComparisons.filter((comparison) =>
    snapshotIds.has(comparison.leftSnapshotId) || snapshotIds.has(comparison.rightSnapshotId),
  );
  const comparisonFindings = seed.collections.simulationComparisonFindings.filter((finding) =>
    comparisons.some(
      (comparison) =>
        comparison.leftSnapshotId === finding.leftSnapshotId &&
        comparison.rightSnapshotId === finding.rightSnapshotId,
    ),
  );

  return {
    snapshots,
    replaySessions,
    comparisons,
    comparisonFindings,
  };
}

export function SavedSimulationHistory({ workflowId }: { workflowId: string }) {
  const seededState = getSeededWorkflowState(workflowId);
  const [snapshots, setSnapshots] = useState<PersistedSimulationRunSnapshot[]>(seededState.snapshots);
  const [replaySessions, setReplaySessions] = useState<SimulationReplaySession[]>(seededState.replaySessions);
  const [comparisons, setComparisons] = useState<SimulationComparison[]>(seededState.comparisons);
  const [comparisonFindings, setComparisonFindings] = useState<SimulationComparisonFinding[]>(
    seededState.comparisonFindings,
  );
  const [selectedSnapshotId, setSelectedSnapshotId] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState("Saved simulation data is ready.");
  const [exportPreview, setExportPreview] = useState<string>("");

  function refresh() {
    const summary = getLocalStoreSummary();
    if (summary.status === "unavailable") {
      resetLocalStoreSnapshot();
    }

    const nextSnapshots = getPersistedSavedSimulationRuns().filter((run) => run.workflowId === workflowId);
    const nextSessions = getPersistedSimulationReplaySessions().filter(
      (session) => session.workflowId === workflowId,
    );
    const nextComparisons = getPersistedSimulationComparisons().filter((comparison) =>
      nextSnapshots.some(
        (snapshot) =>
          snapshot.id === comparison.leftSnapshotId || snapshot.id === comparison.rightSnapshotId,
      ),
    );
    const nextFindings = getPersistedSimulationComparisonFindings().filter((finding) =>
      nextComparisons.some(
        (comparison) =>
          comparison.leftSnapshotId === finding.leftSnapshotId &&
          comparison.rightSnapshotId === finding.rightSnapshotId,
      ),
    );

    setSnapshots(nextSnapshots);
    setReplaySessions(nextSessions);
    setComparisons(nextComparisons);
    setComparisonFindings(nextFindings);
  }

  useEffect(() => {
    refresh();
    return subscribeToLocalStoreChanges(refresh);
  }, [workflowId]);

  useEffect(() => {
    if (!snapshots.length) {
      setSelectedSnapshotId(null);
      return;
    }

    if (!selectedSnapshotId || !snapshots.some((snapshot) => snapshot.id === selectedSnapshotId)) {
      setSelectedSnapshotId(snapshots[0].id);
    }
  }, [selectedSnapshotId, snapshots]);

  const selectedSnapshot = snapshots.find((snapshot) => snapshot.id === selectedSnapshotId) ?? snapshots[0] ?? null;
  const activeSession = selectedSnapshot
    ? replaySessions.find((session) => session.snapshotId === selectedSnapshot.id) ??
      createFallbackSession(selectedSnapshot)
    : null;
  const activeComparison =
    selectedSnapshot &&
    comparisons.find(
      (comparison) =>
        comparison.leftSnapshotId === selectedSnapshot.id ||
        comparison.rightSnapshotId === selectedSnapshot.id,
    );
  const activeComparisonFindings = activeComparison
    ? comparisonFindings.filter((finding) => finding.leftSnapshotId === activeComparison.leftSnapshotId && finding.rightSnapshotId === activeComparison.rightSnapshotId)
    : [];
  const comparisonPeer = activeComparison
    ? snapshots.find(
        (snapshot) =>
          snapshot.id ===
          (activeComparison.leftSnapshotId === selectedSnapshot?.id
            ? activeComparison.rightSnapshotId
            : activeComparison.leftSnapshotId),
      ) ?? null
    : snapshots.find((snapshot) => snapshot.id !== selectedSnapshot?.id) ?? null;

  function handleSnapshotSelect(snapshotId: string) {
    setSelectedSnapshotId(snapshotId);
    setLastAction("Selected a saved simulation snapshot.");
  }

  function handleSaveSnapshot() {
    if (!selectedSnapshot) {
      return;
    }

    const capturedAt = new Date().toISOString();
    const savedSnapshot: PersistedSimulationRunSnapshot = {
      ...selectedSnapshot,
      id: `${selectedSnapshot.id}-manual-${Date.now()}`,
      source: "manual-save",
      capturedAt,
      note: "Manually saved from the local replay workspace.",
      comparisonIds: [],
      replaySessionId: `${selectedSnapshot.id}-manual-session-${Date.now()}`,
    };

    savePersistedSimulationRunSnapshot(savedSnapshot);
    saveSimulationReplaySession({
      ...createFallbackSession(savedSnapshot),
      status: "ready",
      startedAt: capturedAt,
      updatedAt: capturedAt,
    });
    setSelectedSnapshotId(savedSnapshot.id);
    setLastAction("Saved a new local snapshot to browser storage.");
    setExportPreview("");
  }

  function handleReplayChange(session: SimulationReplaySession) {
    saveSimulationReplaySession(session);
    setLastAction("Updated the local replay session.");
  }

  function handleCompareSnapshots() {
    if (!selectedSnapshot || !comparisonPeer) {
      return;
    }

    const { comparison, findings } = buildComparison(selectedSnapshot, comparisonPeer);
    saveSimulationComparison(comparison);
    saveSimulationComparisonFindings(findings);

    const nextLeft = snapshots.find((snapshot) => snapshot.id === comparison.leftSnapshotId);
    const nextRight = snapshots.find((snapshot) => snapshot.id === comparison.rightSnapshotId);
    if (nextLeft && nextRight) {
      const nextLeftSnapshot: PersistedSimulationRunSnapshot = {
        ...nextLeft,
        comparisonIds: Array.from(new Set([...nextLeft.comparisonIds, comparison.id])),
      };
      const nextRightSnapshot: PersistedSimulationRunSnapshot = {
        ...nextRight,
        comparisonIds: Array.from(new Set([...nextRight.comparisonIds, comparison.id])),
      };
      savePersistedSimulationRunSnapshot(nextLeftSnapshot);
      savePersistedSimulationRunSnapshot(nextRightSnapshot);
    }

    setLastAction("Created a browser-local comparison record.");
  }

  function handleExportSnapshot() {
    if (!selectedSnapshot) {
      return;
    }

    setExportPreview(JSON.stringify(selectedSnapshot, null, 2));
    setLastAction("Prepared a local export preview only.");
  }

  function handleClear() {
    clearSavedSimulationRuns();
    setLastAction("Cleared saved simulations from browser-local storage.");
    setExportPreview("");
  }

  function handleRestore() {
    resetSavedSimulationRuns();
    setLastAction("Restored seeded simulation snapshots locally.");
    setExportPreview("");
  }

  return (
    <section className="shell__section simulation-history-panel">
      <div className="session-panel__header">
        <span className="section-note">Saved simulation history</span>
        <span className="workspace-pill workspace-pill--accent">{snapshots.length} snapshots</span>
      </div>

      <p className="surface-heading__copy">
        Saved simulation snapshots, replay frames, and comparison records are loaded from browser-local storage only. Use the controls to inspect or reset the local replay history.
      </p>

      <div className="composer__actions simulation-history-panel__actions">
        <button className="composer__button composer__button--primary" type="button" onClick={handleSaveSnapshot}>
          Save snapshot
        </button>
        <button className="composer__button" type="button" onClick={handleCompareSnapshots}>
          Compare local snapshots
        </button>
        <button className="composer__button" type="button" onClick={handleExportSnapshot}>
          Export snapshot
        </button>
      </div>

      <div className="settings-grid">
        <article className="settings-card">
          <span className="settings-card__label">Snapshots</span>
          <span className="settings-card__title">{snapshots.length}</span>
          <p className="card-copy">Saved snapshot history stored on this device only.</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Replay sessions</span>
          <span className="settings-card__title">{replaySessions.length}</span>
          <p className="card-copy">Replay session state stays in browser-local storage.</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Comparisons</span>
          <span className="settings-card__title">{comparisons.length}</span>
          <p className="card-copy">Comparison records are local-only and seeded from static data.</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Findings</span>
          <span className="settings-card__title">{comparisonFindings.length}</span>
          <p className="card-copy">Each finding is derived from the current browser-local comparison set.</p>
        </article>
      </div>

      <div className="simulation-history-grid">
        <div className="simulation-history-list">
          {snapshots.map((snapshot) => (
            <SavedSimulationCard
              key={snapshot.id}
              snapshot={snapshot}
              selected={snapshot.id === selectedSnapshot?.id}
              onSelect={handleSnapshotSelect}
            />
          ))}
          {!snapshots.length ? (
            <article className="simulation-detail-block">
              <p className="card-copy">No saved simulations are currently stored. Restore the seeded demos to repopulate the browser-local history.</p>
            </article>
          ) : null}
        </div>

        <div className="simulation-history-detail">
          {selectedSnapshot ? (
            <>
              <SimulationSnapshotDetail snapshot={selectedSnapshot} />
              <SimulationReplayPanel
                snapshot={selectedSnapshot}
                session={activeSession ?? createFallbackSession(selectedSnapshot)}
                onSessionChange={handleReplayChange}
              />
              <SimulationComparisonPanel
                comparison={activeComparison ?? null}
                leftSnapshot={selectedSnapshot}
                rightSnapshot={comparisonPeer}
                findings={activeComparisonFindings}
                onCompare={handleCompareSnapshots}
                onExport={handleExportSnapshot}
              />
            </>
          ) : (
            <article className="simulation-detail-block">
              <p className="card-copy">Select a saved snapshot to inspect its metadata, replay frames, logs, and local comparison findings.</p>
            </article>
          )}
          <ResetSimulationsPanel onClear={handleClear} onRestore={handleRestore} lastAction={lastAction} />
          <SimulationReplaySafetyNote />
          {exportPreview ? (
            <article className="simulation-export-panel">
              <div className="session-panel__header">
                <span className="section-note">Export preview</span>
                <span className="workspace-pill workspace-pill--accent">Local JSON</span>
              </div>
              <pre className="simulation-export-panel__body">{exportPreview}</pre>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}
