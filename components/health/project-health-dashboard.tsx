import type {
  HealthDashboardMetric,
  ProjectHealthSummary,
  ReadinessActionPreview,
  ReadinessCategory,
  ReadinessFinding,
  ReadinessReview,
  ReadinessScore,
  WorkspaceReadinessSnapshot,
} from "@/lib/domain/types";

import { DisabledHealthActions } from "@/components/health/disabled-health-actions";
import { HealthSafetyNote } from "@/components/health/health-safety-note";
import { ReadinessCategoryPanel } from "@/components/health/readiness-category-panel";
import { ReadinessFindingCard } from "@/components/health/readiness-finding-card";
import { ReadinessSummaryGrid } from "@/components/health/readiness-summary-grid";
import { WorkspaceReadinessPanel } from "@/components/health/workspace-readiness-panel";

export function ProjectHealthDashboard({
  summary,
  review,
  snapshot,
  metrics,
  scores,
  categories,
  findings,
  actions,
}: {
  summary: ProjectHealthSummary;
  review: ReadinessReview;
  snapshot: WorkspaceReadinessSnapshot;
  metrics: HealthDashboardMetric[];
  scores: ReadinessScore[];
  categories: ReadinessCategory[];
  findings: ReadinessFinding[];
  actions: ReadinessActionPreview[];
}) {
  const overallScore = scores.find((score) => score.id === summary.overallScoreId) ?? scores[0];

  return (
    <main className="shell__panel health-dashboard">
      <section className="surface-heading health-dashboard__header">
        <span className="surface-heading__eyebrow">Health</span>
        <h1 className="surface-heading__title">Project health and readiness dashboard</h1>
        <p className="surface-heading__copy">
          Review workspace readiness, project posture, host safety gaps, workflow coverage, integration state, secrets/vault metadata, and notification posture from local mock data only.
        </p>
      </section>

      <section className="health-hero">
        <div className="health-hero__copy">
          <span className="section-note">Review summary</span>
          <h2 className="health-hero__title">{summary.title}</h2>
          <p className="card-copy">{summary.summary}</p>
          <div className="health-hero__meta">
            <span className="workspace-pill workspace-pill--accent">Updated {summary.updatedAt}</span>
            <span className="workspace-pill workspace-pill--good">{overallScore.score}% overall</span>
            <span className={`workspace-pill ${overallScore.status === "ready" ? "workspace-pill--good" : "workspace-pill--warn"}`}>
              {overallScore.status}
            </span>
          </div>
        </div>

        <div className="health-hero__aside">
          <article className="meta-card">
            <span className="meta-card__label">Review scope</span>
            <span className="meta-card__value">{review.categoryIds.length} readiness categories</span>
            <p className="meta-card__copy">The review is local and static, with no live audit engine behind it.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Finding count</span>
            <span className="meta-card__value">{review.findingIds.length}</span>
            <p className="meta-card__copy">Findings are preview metadata and remain fully inspectable.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Action previews</span>
            <span className="meta-card__value">{review.actionPreviewIds.length}</span>
            <p className="meta-card__copy">Fix, run audit, refresh checks, export report, and open issue are disabled controls only.</p>
          </article>
        </div>
      </section>

      <HealthSafetyNote />
      <WorkspaceReadinessPanel metrics={metrics} snapshot={snapshot} />
      <ReadinessSummaryGrid scores={scores} />

      <section className="shell__section">
        <div className="card-stack">
          <div className="card__top">
            <span className="section-note">Category readiness panels</span>
            <span className="workspace-pill workspace-pill--accent">{categories.length} categories</span>
          </div>
          <div className="health-category-grid">
            {categories.map((category) => {
              const categoryScore = scores.find((score) => score.id === category.scoreId) ?? scores[0];
              const categoryFindings = findings.filter((finding) => category.findingIds.includes(finding.id));
              const categoryActions = actions.filter((action) => category.actionPreviewIds.includes(action.id));

              return (
                <ReadinessCategoryPanel
                  key={category.id}
                  category={category}
                  score={categoryScore}
                  findings={categoryFindings}
                  actionPreviews={categoryActions}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="shell__section">
        <div className="card-stack">
          <span className="section-note">Readiness findings</span>
          <div className="health-finding-list">
            {findings.map((finding) => (
              <ReadinessFindingCard key={finding.id} finding={finding} />
            ))}
          </div>
        </div>
      </section>

      <DisabledHealthActions />

      <section className="shell__section">
        <div className="card-stack">
          <span className="section-note">Local review notes</span>
          <article className="settings-card">
            <span className="settings-card__title">Mock data only</span>
            <p className="card-copy">{summary.note}</p>
            <p className="card-copy">{review.summary}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
