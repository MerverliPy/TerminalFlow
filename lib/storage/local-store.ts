import { LOCAL_STORE_KEY, createEmptyLocalStoreSnapshot } from "@/lib/storage/schema";
import { migrateLocalStoreSnapshot } from "@/lib/storage/migrations";
import { createLocalStoreSeed } from "@/lib/storage/seed";
import type {
  LocalStoreCollection,
  LocalStoreSnapshot,
  LocalStoreStatus,
  LocalStoreSummary,
  PersistedSimulatedCommandResult,
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
    version: 1 as const,
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
