import type { LocalAuditFilterPreview } from "@/lib/domain/types";

export function AuditFilterPanel({ filters }: { filters: LocalAuditFilterPreview[] }) {
  return (
    <section className="shell__section session-panel">
      <div className="session-panel__header">
        <span className="section-note">Local-only filter preview</span>
      </div>
      <div className="settings-grid">
        {filters.map((filter) => (
          <article className="settings-card" key={filter.id}>
            <span className="settings-card__label">{filter.kind}</span>
            <span className="settings-card__title">{filter.label}: {filter.value}</span>
            <p className="card-copy">{filter.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
