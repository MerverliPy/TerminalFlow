import type { LocalAuditTimelineItem } from "@/lib/domain/types";

export function AuditTimeline({ items }: { items: LocalAuditTimelineItem[] }) {
  return (
    <section className="shell__section session-panel">
      <div className="session-panel__header">
        <span className="section-note">Timeline</span>
      </div>
      <div className="card-stack">
        {items.map((item) => (
          <article className="settings-card" key={item.id}>
            <span className="settings-card__label">{item.time}</span>
            <span className="settings-card__title">{item.title}</span>
            <p className="card-copy">{item.detail}</p>
            <span className="workspace-pill workspace-pill--accent">{item.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
