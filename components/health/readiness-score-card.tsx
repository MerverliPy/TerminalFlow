import type { ReadinessScore } from "@/lib/domain/types";

const STATUS_CLASSES: Record<ReadinessScore["status"], string> = {
  ready: "workspace-pill--good",
  watch: "workspace-pill--warn",
  blocked: "workspace-pill--blocked",
};

export function ReadinessScoreCard({ score }: { score: ReadinessScore }) {
  return (
    <article className="stat-card readiness-score-card">
      <span className="stat-card__label">{score.label}</span>
      <div className="readiness-score-card__header">
        <span className="readiness-score-card__value">{score.score}%</span>
        <span className={`workspace-pill ${STATUS_CLASSES[score.status]}`}>{score.status}</span>
      </div>
      <p className="card-copy">{score.detail}</p>
      <span className="readiness-score-card__note">{score.note}</span>
    </article>
  );
}
