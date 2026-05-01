import { AuditCategoryCard } from "@/components/audit/audit-category-card";
import { AuditEventCard } from "@/components/audit/audit-event-card";
import { AuditFilterPanel } from "@/components/audit/audit-filter-panel";
import { AuditSafetyNote } from "@/components/audit/audit-safety-note";
import { AuditTimeline } from "@/components/audit/audit-timeline";
import { ChangeHistoryPanel } from "@/components/audit/change-history-panel";
import type {
  LocalAuditCategorySummary,
  LocalAuditEvent,
  LocalAuditFilterPreview,
  LocalAuditStorageStatus,
  LocalAuditTimelineItem,
  LocalChangeHistoryEntry,
} from "@/lib/domain/types";

export function AuditTrail({
  categories,
  events,
  filters,
  storageStatus,
  timelineItems,
  changeHistoryEntries,
}: {
  categories: LocalAuditCategorySummary[];
  events: LocalAuditEvent[];
  filters: LocalAuditFilterPreview[];
  storageStatus: LocalAuditStorageStatus;
  timelineItems: LocalAuditTimelineItem[];
  changeHistoryEntries: LocalChangeHistoryEntry[];
}) {
  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Settings / Audit</span>
        <h1 className="surface-heading__title">Audit trail and change history</h1>
        <p className="surface-heading__copy">Review local-only audit records, timeline updates, and mock change history entries.</p>
      </section>

      <AuditSafetyNote />

      <section className="shell__section session-panel">
        <div className="session-panel__header">
          <span className="section-note">Storage status</span>
          <span className="workspace-pill workspace-pill--accent">{storageStatus.state}</span>
        </div>
        <div className="settings-grid">
          <article className="settings-card">
            <span className="settings-card__label">Audit events</span>
            <span className="settings-card__title">{storageStatus.eventCount}</span>
          </article>
          <article className="settings-card">
            <span className="settings-card__label">Change entries</span>
            <span className="settings-card__title">{storageStatus.changeHistoryCount}</span>
          </article>
          <article className="settings-card">
            <span className="settings-card__label">Timeline items</span>
            <span className="settings-card__title">{storageStatus.timelineCount}</span>
          </article>
          <article className="settings-card">
            <span className="settings-card__label">Last updated</span>
            <span className="settings-card__title">{storageStatus.lastUpdatedAt}</span>
            <p className="card-copy">{storageStatus.note}</p>
          </article>
        </div>
      </section>

      <section className="shell__section">
        <div className="settings-grid">
          {categories.map((category) => (
            <AuditCategoryCard category={category} key={category.id} />
          ))}
        </div>
      </section>

      <AuditFilterPanel filters={filters} />

      <section className="shell__section session-panel">
        <div className="session-panel__header">
          <span className="section-note">Audit events</span>
        </div>
        <div className="card-stack">
          {events.map((event) => (
            <AuditEventCard event={event} key={event.id} />
          ))}
        </div>
      </section>

      <AuditTimeline items={timelineItems} />
      <ChangeHistoryPanel entries={changeHistoryEntries} />
    </main>
  );
}
