import { LOCAL_STORE_KEY, createEmptyLocalStoreSnapshot } from "@/lib/storage/schema";
import { migrateLocalStoreSnapshot } from "@/lib/storage/migrations";
import { createLocalStoreSeed } from "@/lib/storage/seed";
import type {
  LocalStoreCollection,
  LocalStoreSnapshot,
  LocalStoreStatus,
  LocalStoreSummary,
  LocalSimulationStorageStatus,
  PersistedSimulationRunSnapshot,
  PersistedSimulatedCommandResult,
  SimulationComparison,
  SimulationComparisonFinding,
  SimulationReplaySession,
} from "@/lib/storage/storage-types";

function hasBrowserStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readRawLocalStore(): LocalStoreSnapshot | null {
  if (!hasBrowserStorage()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(LOCAL_STORE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as LocalStoreSnapshot;
    return migrateLocalStoreSnapshot(parsed);
  } catch {
    return null;
  }
}

function writeRawLocalStore(snapshot: LocalStoreSnapshot) {
  if (!hasBrowserStorage()) {
    return;
  }

  window.localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(snapshot));
  window.dispatchEvent(new Event("terminalflow-local-store-changed"));
}

function countCollections(snapshot: LocalStoreSnapshot): Record<LocalStoreCollection, number> {
  return {
    projects: snapshot.collections.projects.length,
    sessions: snapshot.collections.sessions.length,
    workflows: snapshot.collections.workflows.length,
    workflowRuns: snapshot.collections.workflowRuns.length,
    workflowRunLogs: snapshot.collections.workflowRunLogs.length,
    simulatedCommandResults: snapshot.collections.simulatedCommandResults.length,
    savedSimulationRuns: snapshot.collections.savedSimulationRuns.length,
    simulationReplaySessions: snapshot.collections.simulationReplaySessions.length,
    simulationComparisons: snapshot.collections.simulationComparisons.length,
    simulationComparisonFindings: snapshot.collections.simulationComparisonFindings.length,
    commandSimulationHistoryBySessionId: Object.keys(
      snapshot.collections.commandSimulationHistoryBySessionId,
    ).length,
    commandDraftBySessionId: Object.keys(snapshot.collections.commandDraftBySessionId).length,
  };
}

function deriveStatus(snapshot: LocalStoreSnapshot | null): LocalStoreStatus {
  if (!snapshot) {
    return "unavailable";
  }

  const counts = countCollections(snapshot);
  const hasAnyData = Object.values(counts).some((count) => count > 0);

  if (!hasAnyData) {
    return "empty";
  }

  const seeded = createLocalStoreSeed();
  const seededCounts = countCollections(seeded);
  const matchesSeed = Object.entries(counts).every(
    ([key, count]) => count === seededCounts[key as LocalStoreCollection],
  );

  return matchesSeed ? "seeded" : "custom";
}

export function getLocalStoreSnapshot(): LocalStoreSnapshot {
  const snapshot = readRawLocalStore();

  if (snapshot) {
    return snapshot;
  }

  return createEmptyLocalStoreSnapshot();
}

export function saveLocalStoreSnapshot(snapshot: LocalStoreSnapshot): LocalStoreSnapshot {
  const nextSnapshot = {
    ...snapshot,
    version: 2 as const,
    updatedAt: new Date().toISOString(),
  };

  writeRawLocalStore(nextSnapshot);
  return nextSnapshot;
}

export function resetLocalStoreSnapshot(): LocalStoreSnapshot {
  const seed = createLocalStoreSeed();
  writeRawLocalStore(seed);
  return seed;
}

export function clearLocalStoreSnapshot(): LocalStoreSnapshot {
  const empty = createEmptyLocalStoreSnapshot();
  writeRawLocalStore(empty);
  return empty;
}

export function getLocalStoreSummary(): LocalStoreSummary {
  const snapshot = readRawLocalStore();

  if (!snapshot) {
    return {
      status: "unavailable",
      version: 2,
      updatedAt: null,
      counts: {
        projects: 0,
        sessions: 0,
        workflows: 0,
        workflowRuns: 0,
        workflowRunLogs: 0,
        simulatedCommandResults: 0,
        savedSimulationRuns: 0,
        simulationReplaySessions: 0,
        simulationComparisons: 0,
        simulationComparisonFindings: 0,
        commandSimulationHistoryBySessionId: 0,
        commandDraftBySessionId: 0,
      },
    };
  }

  return {
    status: deriveStatus(snapshot),
    version: snapshot.version,
    updatedAt: snapshot.updatedAt,
    counts: countCollections(snapshot),
  };
}

export function subscribeToLocalStoreChanges(listener: () => void) {
  if (!hasBrowserStorage()) {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LOCAL_STORE_KEY) {
      listener();
    }
  };

  const handleCustomChange = () => listener();

  window.addEventListener("storage", handleStorage);
  window.addEventListener("terminalflow-local-store-changed", handleCustomChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("terminalflow-local-store-changed", handleCustomChange);
  };
}

export function getSessionCommandDraft(sessionId: string) {
  const snapshot = getLocalStoreSnapshot();
  return snapshot.collections.commandDraftBySessionId[sessionId] ?? "";
}

export function getPersistedProjects() {
  return getLocalStoreSnapshot().collections.projects;
}

export function getPersistedSessions() {
  return getLocalStoreSnapshot().collections.sessions;
}

export function getPersistedWorkflows() {
  return getLocalStoreSnapshot().collections.workflows;
}

export function getPersistedWorkflowRuns() {
  return getLocalStoreSnapshot().collections.workflowRuns;
}

export function getPersistedWorkflowRunLogs() {
  return getLocalStoreSnapshot().collections.workflowRunLogs;
}

export function getPersistedWorkflowRunLogsByRunId(workflowRunId: string) {
  return getLocalStoreSnapshot().collections.workflowRunLogs.filter(
    (log) => log.workflowRunId === workflowRunId,
  );
}

export function getSessionCommandResults(sessionId: string): PersistedSimulatedCommandResult[] {
  const snapshot = getLocalStoreSnapshot();
  return snapshot.collections.commandSimulationHistoryBySessionId[sessionId] ?? [];
}

export function getPersistedSimulatedCommandResults() {
  return getLocalStoreSnapshot().collections.simulatedCommandResults;
}

export function getPersistedSavedSimulationRuns(): PersistedSimulationRunSnapshot[] {
  return getLocalStoreSnapshot().collections.savedSimulationRuns;
}

export function getPersistedSavedSimulationRun(runId: string) {
  return getPersistedSavedSimulationRuns().find((run) => run.id === runId);
}

export function getPersistedSimulationReplaySessions(): SimulationReplaySession[] {
  return getLocalStoreSnapshot().collections.simulationReplaySessions;
}

export function getPersistedSimulationComparisons(): SimulationComparison[] {
  return getLocalStoreSnapshot().collections.simulationComparisons;
}

export function getPersistedSimulationComparisonFindings(): SimulationComparisonFinding[] {
  return getLocalStoreSnapshot().collections.simulationComparisonFindings;
}

export function getLocalSimulationStorageStatus(): LocalSimulationStorageStatus {
  const summary = getLocalStoreSummary();

  return {
    state: summary.status,
    snapshotCount: summary.counts.savedSimulationRuns,
    replaySessionCount: summary.counts.simulationReplaySessions,
    comparisonCount: summary.counts.simulationComparisons,
    comparisonFindingCount: summary.counts.simulationComparisonFindings,
    lastUpdatedAt: summary.updatedAt,
    note:
      summary.counts.savedSimulationRuns === 0
        ? "No saved simulation snapshots are stored yet."
        : "Saved simulation snapshots, replay sessions, and comparisons are stored locally on this device.",
  };
}

function updateSimulationCollections(
  updater: (collections: LocalStoreSnapshot["collections"]) => LocalStoreSnapshot["collections"],
) {
  const snapshot = getLocalStoreSnapshot();
  const nextSnapshot: LocalStoreSnapshot = {
    ...snapshot,
    collections: updater(snapshot.collections),
  };

  return saveLocalStoreSnapshot(nextSnapshot);
}

export function savePersistedSimulationRunSnapshot(
  run: PersistedSimulationRunSnapshot,
): LocalStoreSnapshot {
  return updateSimulationCollections((collections) => {
    const nextRuns = collections.savedSimulationRuns.filter((item) => item.id !== run.id);
    return {
      ...collections,
      savedSimulationRuns: [run, ...nextRuns],
    };
  });
}

export function saveSimulationReplaySession(session: SimulationReplaySession): LocalStoreSnapshot {
  return updateSimulationCollections((collections) => {
    const nextSessions = collections.simulationReplaySessions.filter((item) => item.id !== session.id);
    return {
      ...collections,
      simulationReplaySessions: [session, ...nextSessions],
    };
  });
}

export function saveSimulationComparison(comparison: SimulationComparison): LocalStoreSnapshot {
  return updateSimulationCollections((collections) => {
    const nextComparisons = collections.simulationComparisons.filter((item) => item.id !== comparison.id);
    return {
      ...collections,
      simulationComparisons: [comparison, ...nextComparisons],
    };
  });
}

export function saveSimulationComparisonFindings(
  findings: SimulationComparisonFinding[],
): LocalStoreSnapshot {
  return updateSimulationCollections((collections) => {
    const existing = collections.simulationComparisonFindings.filter(
      (item) => !findings.some((finding) => finding.id === item.id),
    );
    return {
      ...collections,
      simulationComparisonFindings: [...findings, ...existing],
    };
  });
}

export function clearSavedSimulationRuns(): LocalStoreSnapshot {
  return updateSimulationCollections((collections) => ({
    ...collections,
    savedSimulationRuns: [],
    simulationReplaySessions: [],
    simulationComparisons: [],
    simulationComparisonFindings: [],
  }));
}

export function resetSavedSimulationRuns(): LocalStoreSnapshot {
  const seed = createLocalStoreSeed();
  return updateSimulationCollections((collections) => ({
    ...collections,
    savedSimulationRuns: seed.collections.savedSimulationRuns,
    simulationReplaySessions: seed.collections.simulationReplaySessions,
    simulationComparisons: seed.collections.simulationComparisons,
    simulationComparisonFindings: seed.collections.simulationComparisonFindings,
  }));
}

export function saveSessionCommandDraft(sessionId: string, draft: string): LocalStoreSnapshot {
  const snapshot = getLocalStoreSnapshot();
  const nextSnapshot: LocalStoreSnapshot = {
    ...snapshot,
    updatedAt: new Date().toISOString(),
    collections: {
      ...snapshot.collections,
      commandDraftBySessionId: {
        ...snapshot.collections.commandDraftBySessionId,
        [sessionId]: draft,
      },
    },
  };

  return saveLocalStoreSnapshot(nextSnapshot);
}

export function appendSessionCommandResult(
  sessionId: string,
  result: PersistedSimulatedCommandResult,
): LocalStoreSnapshot {
  const snapshot = getLocalStoreSnapshot();
  const nextResults = [
    result,
    ...(snapshot.collections.commandSimulationHistoryBySessionId[sessionId] ?? []),
  ];

  const nextSnapshot: LocalStoreSnapshot = {
    ...snapshot,
    updatedAt: new Date().toISOString(),
    collections: {
      ...snapshot.collections,
      commandSimulationHistoryBySessionId: {
        ...snapshot.collections.commandSimulationHistoryBySessionId,
        [sessionId]: nextResults,
      },
    },
  };

  return saveLocalStoreSnapshot(nextSnapshot);
}
