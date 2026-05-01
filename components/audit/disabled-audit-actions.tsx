import type { LocalAuditActionPreview } from "@/lib/domain/types";

export function DisabledAuditActions({ actions }: { actions: LocalAuditActionPreview[] }) {
  return (
    <section className="shell__section session-panel">
      <div className="session-panel__header">
        <span className="section-note">Action previews</span>
      </div>
      <div className="settings-grid">
        {actions.map((action) => (
          <article className="settings-card" key={action.id}>
            <span className="settings-card__label">{action.kind}</span>
            <span className="settings-card__title">{action.label}</span>
            <p className="card-copy">{action.detail}</p>
            <button className="button button--disabled" disabled type="button">
              {action.mode === "disabled" ? "Disabled in this phase" : "Local preview only"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
