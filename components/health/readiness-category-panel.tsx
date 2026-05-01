import type { ReadinessActionPreview, ReadinessCategory, ReadinessFinding, ReadinessScore } from "@/lib/domain/types";

const STATUS_CLASSES: Record<ReadinessCategory["status"], string> = {
  ready: "workspace-pill--good",
  watch: "workspace-pill--warn",
  blocked: "workspace-pill--blocked",
};

const SCORE_CLASSES: Record<ReadinessScore["status"], string> = {
  ready: "workspace-pill--good",
  watch: "workspace-pill--warn",
  blocked: "workspace-pill--blocked",
};

const ACTION_MODE_CLASS: Record<ReadinessActionPreview["mode"], string> = {
  disabled: "workspace-pill--warn",
  preview: "workspace-pill--accent",
};

export function ReadinessCategoryPanel({
  category,
  score,
  findings,
  actionPreviews,
}: {
  category: ReadinessCategory;
  score: ReadinessScore;
  findings: ReadinessFinding[];
  actionPreviews: ReadinessActionPreview[];
}) {
  return (
    <article className="card readiness-category-panel">
      <div className="card__top">
        <div className="card__body">
          <span className="card-meta">{category.kind}</span>
          <span className="card-title">{category.title}</span>
        </div>
        <span className={`workspace-pill ${STATUS_CLASSES[category.status]}`}>{category.status}</span>
      </div>

      <p className="card-copy">{category.summary}</p>

      <div className="readiness-category-panel__score">
        <span className={`workspace-pill ${SCORE_CLASSES[score.status]}`}>{score.score}%</span>
        <span className="readiness-category-panel__score-label">{score.label}</span>
      </div>

      <p className="card-copy">{score.detail}</p>

      {findings.length > 0 ? (
        <div className="card-stack">
          <span className="section-note">Findings</span>
          <div className="card-stack">
            {findings.map((finding) => (
              <article className="settings-card" key={finding.id}>
                <div className="card__top">
                  <span className="settings-card__title">{finding.title}</span>
                  <span className={`workspace-pill workspace-pill--${finding.severity === "blocked" ? "blocked" : finding.severity === "warn" ? "warn" : "accent"}`}>
                    {finding.severity}
                  </span>
                </div>
                <p className="card-copy">{finding.preview}</p>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <p className="card-copy">No active findings are attached to this category in the mock review.</p>
      )}

      <div className="card-stack">
        <span className="section-note">Action previews</span>
        <div className="health-preview-list">
          {actionPreviews.map((action) => (
            <article className="meta-card" key={action.id}>
              <div className="card__top">
                <span className="meta-card__value">{action.label}</span>
                <span className={`workspace-pill ${ACTION_MODE_CLASS[action.mode]}`}>{action.mode}</span>
              </div>
              <p className="meta-card__copy">{action.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <span className="section-note">{category.note}</span>
    </article>
  );
}
