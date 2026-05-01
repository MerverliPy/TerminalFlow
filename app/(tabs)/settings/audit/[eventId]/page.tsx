import Link from "next/link";
import { notFound } from "next/navigation";

import { AuditEventDetail } from "@/components/audit/audit-event-detail";
import { AuditSafetyNote } from "@/components/audit/audit-safety-note";
import { MOCK_LOCAL_AUDIT_ACTION_PREVIEWS } from "@/lib/domain/mock-data";
import { ROUTES } from "@/lib/navigation/routes";
import {
  getPersistedAuditEvent,
  getPersistedAuditTimelineItems,
  getPersistedChangeHistoryEntries,
} from "@/lib/storage/local-store";

export default async function SettingsAuditEventPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const event = getPersistedAuditEvent(eventId);

  if (!event) {
    notFound();
  }

  const timeline = getPersistedAuditTimelineItems().filter((item) => item.eventId === event.id);
  const changes = getPersistedChangeHistoryEntries().filter((entry) => entry.eventId === event.id);
  const actions = MOCK_LOCAL_AUDIT_ACTION_PREVIEWS.filter((action) => event.actionPreviewIds.includes(action.id));

  return (
    <main className="shell__panel">
      <Link className="settings-link" href={ROUTES.settingsAudit}>
        Back to Audit Trail
      </Link>
      <AuditSafetyNote />
      <AuditEventDetail event={event} timelineItems={timeline} changeHistory={changes} actions={actions} />
    </main>
  );
}
