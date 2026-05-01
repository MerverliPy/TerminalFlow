import Link from "next/link";

import type { ProjectHealthSummary, ReadinessReview, ReadinessScore } from "@/lib/domain/types";

import { ROUTES } from "@/lib/navigation/routes";

export function ReadinessReviewPanel({
  summary,
  review,
  score,
}: {
  summary: ProjectHealthSummary;
  review: ReadinessReview;
  score: ReadinessScore;
}) {
  return (
    <section className="shell__section">
      <div className="card-stack">
        <span className="section-note">Readiness review</span>
        <article className="settings-card readiness-review-panel">
          <span className="settings-card__title">{summary.title}</span>
          <p className="card-copy">{summary.summary}</p>
          <div className="readiness-review-panel__meta">
            <span className="workspace-pill workspace-pill--accent">{score.score}% overall</span>
            <span className="workspace-pill workspace-pill--warn">{review.findingIds.length} findings</span>
            <span className={`workspace-pill ${score.status === "ready" ? "workspace-pill--good" : "workspace-pill--warn"}`}>
              {score.status}
            </span>
          </div>
          <p className="card-copy">{summary.note}</p>
          <Link className="settings-link" href={ROUTES.health}>
            Open Health Dashboard
          </Link>
        </article>
      </div>
    </section>
  );
}
