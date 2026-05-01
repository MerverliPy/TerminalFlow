import type { ExecutionPlanActionPreview } from "@/lib/domain/types";

const ACTION_TONES: Record<ExecutionPlanActionPreview["kind"], string> = {
  "confirm-plan": "workspace-pill--good",
  "start-run": "workspace-pill--accent",
  "export-plan": "workspace-pill--warn",
  "share-plan": "workspace-pill--accent",
  "refresh-estimate": "workspace-pill--good",
  "approve-dry-run": "workspace-pill--warn",
};

export function DisabledExecutionPlanActions({
  actions,
}: {
  actions: ExecutionPlanActionPreview[];
}) {
  return (
    <section className="shell__section">
      <div className="card-stack">
        <div className="card__top">
          <span className="section-note">Plan actions</span>
          <span className="workspace-pill workspace-pill--warn">Simulated only</span>
        </div>

        <p className="surface-heading__copy">
          Confirm plan, start run, export plan, share plan, refresh estimate, and approve dry-run controls render here, but every action stays local and non-operational.
        </p>

        <div className="composer__actions run-actions">
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
                <span className={`workspace-pill ${ACTION_TONES[action.kind]}`}>{action.mode}</span>
              </div>
              <span className="settings-card__title">{action.label}</span>
              <p className="card-copy">{action.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
