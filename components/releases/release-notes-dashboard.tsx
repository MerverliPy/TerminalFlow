import type { LocalReleaseNote, LocalReleaseStorageStatus } from "@/lib/domain/types";

import { ReleaseNotesCard } from "@/components/releases/release-notes-card";
import { ReleaseSafetyNote } from "@/components/releases/release-safety-note";

const STATUS_LABELS: Record<LocalReleaseNote["status"], string> = {
  draft: "Draft",
  reviewing: "Reviewing",
  ready: "Ready",
  published: "Published",
  blocked: "Blocked",
};

const STORAGE_LABELS: Record<LocalReleaseStorageStatus["state"], string> = {
  "local-static": "Local static",
  "browser-local": "Browser local",
};

export function ReleaseNotesDashboard({
  releases,
  storageStatus,
}: {
  releases: LocalReleaseNote[];
  storageStatus: LocalReleaseStorageStatus;
}) {
  const latestRelease = releases[0];

  return (
    <main className="shell__panel release-dashboard">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Settings / Releases</span>
        <h1 className="surface-heading__title">Release notes and milestone review</h1>
        <p className="surface-heading__copy">
          Release summaries, milestone records, grouped changes, readiness checks, and disabled release actions are presented from static browser-local data only.
        </p>
      </section>

      <section className="release-hero">
        <div className="release-hero__copy">
          <span className="section-note">Local release archive</span>
          <h2 className="release-hero__title">{latestRelease.title}</h2>
          <p className="card-copy">{latestRelease.detail}</p>
          <div className="release-hero__meta">
            <span className="workspace-pill workspace-pill--warn">{STATUS_LABELS[latestRelease.status]}</span>
            <span className="workspace-pill workspace-pill--accent">{storageStatus.releaseCount} release notes</span>
            <span className="workspace-pill workspace-pill--good">{storageStatus.readinessCount} readiness checks</span>
            <span className="workspace-pill workspace-pill--accent">{storageStatus.timelineCount} timeline items</span>
          </div>
        </div>

        <div className="release-hero__aside">
          <article className="meta-card">
            <span className="meta-card__label">Storage state</span>
            <span className="meta-card__value">{STORAGE_LABELS[storageStatus.state]}</span>
            <p className="meta-card__copy">{storageStatus.note}</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Milestones</span>
            <span className="meta-card__value">{storageStatus.milestoneCount}</span>
            <p className="meta-card__copy">Milestone review data is local and inspectable.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Changelog</span>
            <span className="meta-card__value">{storageStatus.changelogCount}</span>
            <p className="meta-card__copy">Entries are ordered local records, not Git history output.</p>
          </article>
        </div>
      </section>

      <ReleaseSafetyNote />

      <section className="shell__section">
        <div className="card-stack">
          <div className="session-panel__header">
            <span className="section-note">Release notes</span>
            <span className="workspace-pill workspace-pill--accent">{releases.length} local records</span>
          </div>
          <div className="release-card-grid">
            {releases.map((release) => (
              <ReleaseNotesCard key={release.id} release={release} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
