import type { LocalReleaseActionPreview } from "@/lib/domain/types";

const ACTION_LABELS: Record<LocalReleaseActionPreview["mode"], string> = {
  disabled: "Disabled",
  preview: "Preview",
};

export function DisabledReleaseActions({
  actions,
}: {
  actions: LocalReleaseActionPreview[];
}) {
  return (
    <section className="shell__section session-panel">
      <div className="session-panel__header">
        <span className="section-note">Release actions</span>
        <span className="workspace-pill workspace-pill--warn">Inert controls</span>
      </div>

      <p className="surface-heading__copy">
        The release controls below are rendered for review only. They do not publish, export, share, create GitHub releases, refresh changelogs, or deploy anything.
      </p>

      <div className="composer__actions release-action-grid">
        {actions.map((action) => (
          <button
            className="composer__button release-action-button"
            key={action.id}
            type="button"
            disabled
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="release-action-details">
        {actions.map((action) => (
          <article className="meta-card" key={action.id}>
            <span className="meta-card__label">{ACTION_LABELS[action.mode]}</span>
            <span className="meta-card__value">{action.label}</span>
            <p className="meta-card__copy">{action.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
