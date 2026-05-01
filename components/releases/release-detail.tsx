import Link from "next/link";

import {
  MOCK_GROUPED_CHANGE_SUMMARIES,
  MOCK_PHASE_COMPLETION_SUMMARIES,
  MOCK_RELEASE_ACTION_PREVIEWS,
  MOCK_RELEASE_CHANGELOG_ENTRIES,
  MOCK_RELEASE_MILESTONES,
  MOCK_RELEASE_NOTES,
  MOCK_RELEASE_READINESS_CHECKS,
  MOCK_RELEASE_RISKS,
  MOCK_RELEASE_STORAGE_STATUS,
  MOCK_RELEASE_TIMELINE_ITEMS,
} from "@/lib/domain/mock-data";
import type { LocalReleaseNote } from "@/lib/domain/types";
import { ROUTES } from "@/lib/navigation/routes";
import { ChangelogTimeline } from "@/components/releases/changelog-timeline";
import { DisabledReleaseActions } from "@/components/releases/disabled-release-actions";
import { GroupedChangeSummary } from "@/components/releases/grouped-change-summary";
import { MilestoneReviewDashboard } from "@/components/releases/milestone-review-dashboard";
import { PhaseCompletionSummary } from "@/components/releases/phase-completion-summary";
import { ReleaseReadinessChecklist } from "@/components/releases/release-readiness-checklist";
import { ReleaseRiskPanel } from "@/components/releases/release-risk-panel";
import { ReleaseSafetyNote } from "@/components/releases/release-safety-note";

const STATUS_CLASSES: Record<LocalReleaseNote["status"], string> = {
  draft: "workspace-pill--accent",
  reviewing: "workspace-pill--warn",
  ready: "workspace-pill--good",
  published: "workspace-pill--good",
  blocked: "workspace-pill--blocked",
};

const STATUS_LABELS: Record<LocalReleaseNote["status"], string> = {
  draft: "Draft",
  reviewing: "Reviewing",
  ready: "Ready",
  published: "Published",
  blocked: "Blocked",
};

const TIMELINE_STATE_LABELS: Record<(typeof MOCK_RELEASE_TIMELINE_ITEMS)[number]["state"], string> = {
  recorded: "Recorded",
  reviewed: "Reviewed",
  ready: "Ready",
  blocked: "Blocked",
};

export function ReleaseDetail({ releaseId }: { releaseId: string }) {
  const release = MOCK_RELEASE_NOTES.find((item) => item.id === releaseId) ?? MOCK_RELEASE_NOTES[0];
  const milestones = MOCK_RELEASE_MILESTONES.filter((item) => item.releaseId === release.id);
  const phaseSummaries = MOCK_PHASE_COMPLETION_SUMMARIES.filter((item) => item.releaseId === release.id);
  const groupedChangeSummaries = MOCK_GROUPED_CHANGE_SUMMARIES.filter(
    (item) => item.releaseId === release.id,
  );
  const changelogEntries = MOCK_RELEASE_CHANGELOG_ENTRIES.filter((item) => item.releaseId === release.id);
  const readinessChecks = MOCK_RELEASE_READINESS_CHECKS.filter((item) => item.releaseId === release.id);
  const risks = MOCK_RELEASE_RISKS.filter((item) => item.releaseId === release.id);
  const actions = MOCK_RELEASE_ACTION_PREVIEWS.filter((item) => item.releaseId === release.id);
  const timelineItems = MOCK_RELEASE_TIMELINE_ITEMS.filter((item) => item.releaseId === release.id);
  const storageStatus = MOCK_RELEASE_STORAGE_STATUS;

  return (
    <main className="shell__panel release-detail">
      <header className="release-detail__header">
        <div className="session-detail-header__top">
          <Link className="session-detail-header__back" href={ROUTES.settingsReleases}>
            Back to release notes
          </Link>
          <span className={`workspace-pill ${STATUS_CLASSES[release.status]}`}>{STATUS_LABELS[release.status]}</span>
        </div>

        <section className="surface-heading">
          <span className="surface-heading__eyebrow">Release detail</span>
          <h1 className="surface-heading__title">{release.title}</h1>
          <p className="surface-heading__copy">{release.detail}</p>
        </section>

        <div className="release-hero__meta">
          <span className="workspace-pill workspace-pill--accent">{release.version}</span>
          <span className="workspace-pill workspace-pill--warn">{release.milestoneIds.length} milestones</span>
          <span className="workspace-pill workspace-pill--accent">{release.readinessCheckIds.length} checks</span>
          <span className="workspace-pill workspace-pill--accent">{release.timelineItemIds.length} timeline items</span>
        </div>

        <div className="release-detail__grid">
          <article className="meta-card">
            <span className="meta-card__label">Published</span>
            <span className="meta-card__value">{release.publishedAt}</span>
            <p className="meta-card__copy">{release.note}</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Updated</span>
            <span className="meta-card__value">{release.updatedAt}</span>
            <p className="meta-card__copy">All release notes remain local/static in this phase.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Storage state</span>
            <span className="meta-card__value">{storageStatus.state}</span>
            <p className="meta-card__copy">{storageStatus.note}</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Local coverage</span>
            <span className="meta-card__value">{storageStatus.groupedChangeCount} grouped changes</span>
            <p className="meta-card__copy">The release archive stays browser-local and typed.</p>
          </article>
        </div>
      </header>

      <ReleaseSafetyNote />
      <MilestoneReviewDashboard milestones={milestones} />
      <PhaseCompletionSummary summaries={phaseSummaries} />

      <section className="shell__section">
        <div className="card-stack">
          <div className="session-panel__header">
            <span className="section-note">Grouped change summaries</span>
            <span className="workspace-pill workspace-pill--accent">{groupedChangeSummaries.length} summaries</span>
          </div>
          <div className="release-group-stack">
            {groupedChangeSummaries.map((summary) => (
              <GroupedChangeSummary key={summary.id} summary={summary} />
            ))}
          </div>
        </div>
      </section>

      <ChangelogTimeline entries={changelogEntries} />
      <ReleaseReadinessChecklist checks={readinessChecks} />
      <ReleaseRiskPanel risks={risks} />
      <section className="shell__section session-panel">
        <div className="session-panel__header">
          <span className="section-note">Release timeline</span>
          <span className="workspace-pill workspace-pill--accent">{timelineItems.length} items</span>
        </div>

        <div className="release-timeline">
          {timelineItems
            .slice()
            .sort((left, right) => left.order - right.order)
            .map((item) => (
              <article className="release-timeline__item" key={item.id}>
                  <div className="card__top">
                    <div className="card-kv">
                      <span className="card-kv__label">
                        #{item.order} · {item.time}
                      </span>
                      <span className="card-title">{item.title}</span>
                    </div>
                    <span className="workspace-pill workspace-pill--accent">{TIMELINE_STATE_LABELS[item.state]}</span>
                  </div>
                  <p className="card-copy">{item.detail}</p>
                </article>
              ))}
        </div>
      </section>

      <DisabledReleaseActions actions={actions} />
    </main>
  );
}
