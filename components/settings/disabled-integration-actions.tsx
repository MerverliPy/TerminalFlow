import type { IntegrationActionPreview } from "@/lib/domain/types";

const ACTION_TONE_CLASSES: Record<IntegrationActionPreview["kind"], string> = {
  connect: "workspace-pill--good",
  disconnect: "workspace-pill--warn",
  reconnect: "workspace-pill--accent",
  sync: "workspace-pill--accent",
  authorize: "workspace-pill--warn",
  revoke: "workspace-pill--warn",
};

export function DisabledIntegrationActions({ actions }: { actions: IntegrationActionPreview[] }) {
  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Integration actions</span>
        <span className="workspace-pill workspace-pill--warn">Simulated only</span>
      </div>

      <p className="surface-heading__copy">
        Connect, disconnect, reconnect, sync, authorize, and revoke controls are shown as
        disabled review actions only.
      </p>

      <div className="composer__actions integration-actions">
        {actions.map((action) => (
          <button
            className="composer__button composer__button--primary"
            key={action.id}
            type="button"
            disabled
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="settings-grid">
        {actions.map((action) => (
          <article className="settings-card" key={`${action.id}-preview`}>
            <div className="session-panel__header">
              <span className="settings-card__label">{action.kind}</span>
              <span className={`workspace-pill ${ACTION_TONE_CLASSES[action.kind]}`}>
                {action.mode}
              </span>
            </div>
            <span className="settings-card__title">{action.label}</span>
            <p className="card-copy">{action.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
