import type { ExecutionGateActionPreview } from "@/lib/domain/types";

const ACTION_TONE_CLASSES: Record<ExecutionGateActionPreview["kind"], string> = {
  "approve-execution": "workspace-pill--good",
  "start-run": "workspace-pill--accent",
  "override-block": "workspace-pill--warn",
  "refresh-checks": "workspace-pill--accent",
  "export-preflight-report": "workspace-pill--warn",
};

export function DisabledPreflightActions({
  actions,
}: {
  actions: ExecutionGateActionPreview[];
}) {
  return (
    <section className="shell__section preflight-actions-panel">
      <div className="session-panel__header">
        <span className="section-note">Execution actions</span>
        <span className="workspace-pill workspace-pill--warn">Simulated only</span>
      </div>

      <p className="surface-heading__copy">
        Approve execution, start run, override block, refresh checks, and export preflight report are shown for review only and do not trigger any real action.
      </p>

      <div className="preflight-action-grid">
        {actions.map((action) => (
          <button
            className="composer__button composer__button--primary preflight-action-button"
            disabled
            key={action.id}
            type="button"
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="settings-grid preflight-action-preview-grid">
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
