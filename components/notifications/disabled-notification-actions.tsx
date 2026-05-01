import type { AlertActionPreview } from "@/lib/domain/types";

const ACTION_TONE_CLASSES: Record<AlertActionPreview["kind"], string> = {
  "mark-read": "workspace-pill--good",
  snooze: "workspace-pill--warn",
  resolve: "workspace-pill--good",
  archive: "workspace-pill--accent",
  escalate: "workspace-pill--warn",
  "open-provider": "workspace-pill--accent",
};

export function DisabledNotificationActions({
  actions,
}: {
  actions: AlertActionPreview[];
}) {
  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Alert actions</span>
        <span className="workspace-pill workspace-pill--warn">Simulated only</span>
      </div>

      <p className="surface-heading__copy">
        Mark-read, snooze, resolve, archive, escalate, and open-provider actions render for
        review but remain disabled in this phase.
      </p>

      <div className="composer__actions notification-actions">
        {actions.map((action) => (
          <button
            className="composer__button composer__button--primary"
            disabled
            key={action.id}
            type="button"
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
              <span className={`workspace-pill ${ACTION_TONE_CLASSES[action.kind]}`}>{action.mode}</span>
            </div>
            <span className="settings-card__title">{action.label}</span>
            <p className="card-copy">{action.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
