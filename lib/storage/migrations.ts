import type { LocalStoreMigration, LocalStoreSnapshot } from "@/lib/storage/storage-types";

export const LOCAL_STORE_MIGRATIONS: LocalStoreMigration[] = [];

export function migrateLocalStoreSnapshot(snapshot: LocalStoreSnapshot): LocalStoreSnapshot {
  return LOCAL_STORE_MIGRATIONS.reduce((current, migration) => {
    if (current.version !== migration.from) {
      return current;
    }

    return migration.migrate(current);
  }, snapshot);
}
