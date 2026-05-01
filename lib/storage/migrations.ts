import { createEmptyLocalStoreSnapshot } from "@/lib/storage/schema";
import { createLocalStoreSeed } from "@/lib/storage/seed";
import type { LocalStoreMigration, LocalStoreSnapshot } from "@/lib/storage/storage-types";

export const LOCAL_STORE_MIGRATIONS: LocalStoreMigration[] = [
  {
    from: 1,
    to: 2,
    description: "Add saved simulation snapshots, replay sessions, and comparison records.",
    migrate(snapshot) {
      const seed = createLocalStoreSeed();
      const empty = createEmptyLocalStoreSnapshot();
      return {
        ...empty,
        ...snapshot,
        version: 2,
        updatedAt: snapshot.updatedAt,
        collections: {
          ...empty.collections,
          ...snapshot.collections,
          savedSimulationRuns:
            snapshot.collections.savedSimulationRuns?.length > 0
              ? snapshot.collections.savedSimulationRuns
              : seed.collections.savedSimulationRuns,
          simulationReplaySessions:
            snapshot.collections.simulationReplaySessions?.length > 0
              ? snapshot.collections.simulationReplaySessions
              : seed.collections.simulationReplaySessions,
          simulationComparisons:
            snapshot.collections.simulationComparisons?.length > 0
              ? snapshot.collections.simulationComparisons
              : seed.collections.simulationComparisons,
          simulationComparisonFindings:
            snapshot.collections.simulationComparisonFindings?.length > 0
              ? snapshot.collections.simulationComparisonFindings
              : seed.collections.simulationComparisonFindings,
          auditEvents:
            snapshot.collections.auditEvents?.length > 0
              ? snapshot.collections.auditEvents
              : seed.collections.auditEvents,
          auditTimelineItems:
            snapshot.collections.auditTimelineItems?.length > 0
              ? snapshot.collections.auditTimelineItems
              : seed.collections.auditTimelineItems,
          changeHistoryEntries:
            snapshot.collections.changeHistoryEntries?.length > 0
              ? snapshot.collections.changeHistoryEntries
              : seed.collections.changeHistoryEntries,
        },
      };
    },
  },
];

export function migrateLocalStoreSnapshot(snapshot: LocalStoreSnapshot): LocalStoreSnapshot {
  return LOCAL_STORE_MIGRATIONS.reduce((current, migration) => {
    if (current.version !== migration.from) {
      return current;
    }

    return migration.migrate(current);
  }, snapshot);
}
