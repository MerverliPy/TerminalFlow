import type { LocalStoreSchema, LocalStoreSnapshot } from "@/lib/storage/storage-types";

export const LOCAL_STORE_KEY = "terminalflow.local-store.v1";

export const LOCAL_STORE_SCHEMA: LocalStoreSchema = {
  version: 2,
} as const;

export function createEmptyLocalStoreSnapshot(): LocalStoreSnapshot {
  return {
    version: LOCAL_STORE_SCHEMA.version,
    updatedAt: new Date(0).toISOString(),
    collections: {
      projects: [],
      sessions: [],
      workflows: [],
      workflowRuns: [],
      workflowRunLogs: [],
      simulatedCommandResults: [],
      savedSimulationRuns: [],
      simulationReplaySessions: [],
      simulationComparisons: [],
      simulationComparisonFindings: [],
      commandSimulationHistoryBySessionId: {},
      commandDraftBySessionId: {},
    },
  };
}
