import { DisabledAuditActions } from "@/components/audit/disabled-audit-actions";
import type { LocalAuditActionPreview, LocalAuditEvent, LocalAuditTimelineItem, LocalChangeHistoryEntry } from "@/lib/domain/types";

export function AuditEventDetail({
  event,
  timelineItems,
  changeHistory,
  actions,
}: {
  event: LocalAuditEvent;
  timelineItems: LocalAuditTimelineItem[];
  changeHistory: LocalChangeHistoryEntry[];
  actions: LocalAuditActionPreview[];
}) {
  return (
    <section className="shell__section session-panel">
      <div className="surface-heading">
        <span className="surface-heading__eyebrow">Audit event detail</span>
        <h1 className="surface-heading__title">{event.title}</h1>
        <p className="surface-heading__copy">{event.detail}</p>
      </div>

      <div className="settings-grid">
        <article className="settings-card">
          <span className="settings-card__label">Category</span>
          <span className="settings-card__title">{event.category}</span>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Severity / Status</span>
          <span className="settings-card__title">{event.severity} / {event.status}</span>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Actor</span>
          <span className="settings-card__title">{event.actor.label}</span>
          <p className="card-copy">{event.actor.role} · {event.actor.source}</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Affected resource</span>
          <span className="settings-card__title">{event.resource.label}</span>
          <p className="card-copy">{event.resource.type}</p>
          <p className="card-copy">Route preview: {event.resource.route}</p>
        </article>
      </div>

      <div className="card-stack">
        {timelineItems.map((item) => (
          <article className="settings-card" key={item.id}>
            <span className="settings-card__label">Timeline</span>
            <span className="settings-card__title">{item.time} · {item.title}</span>
            <p className="card-copy">{item.detail}</p>
          </article>
        ))}
        {changeHistory.map((entry) => (
          <article className="settings-card" key={entry.id}>
            <span className="settings-card__label">Change entry</span>
            <span className="settings-card__title">{entry.title}</span>
            <p className="card-copy">{entry.summary}</p>
          </article>
        ))}
      </div>

      <DisabledAuditActions actions={actions} />
    </section>
  );
}
