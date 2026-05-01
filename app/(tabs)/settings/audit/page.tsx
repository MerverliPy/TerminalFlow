import { AuditTrail } from "@/components/audit/audit-trail";
import {
  MOCK_LOCAL_AUDIT_CATEGORIES,
  MOCK_LOCAL_AUDIT_FILTER_PREVIEWS,
  MOCK_LOCAL_AUDIT_STORAGE_STATUS,
} from "@/lib/domain/mock-data";
import {
  getPersistedAuditEvents,
  getPersistedAuditTimelineItems,
  getPersistedChangeHistoryEntries,
} from "@/lib/storage/local-store";

export default function SettingsAuditPage() {
  const events = getPersistedAuditEvents();
  const timelineItems = getPersistedAuditTimelineItems();
  const changeHistoryEntries = getPersistedChangeHistoryEntries();

  return (
    <AuditTrail
      categories={MOCK_LOCAL_AUDIT_CATEGORIES}
      events={events}
      filters={MOCK_LOCAL_AUDIT_FILTER_PREVIEWS}
      storageStatus={MOCK_LOCAL_AUDIT_STORAGE_STATUS}
      timelineItems={timelineItems}
      changeHistoryEntries={changeHistoryEntries}
    />
  );
}
