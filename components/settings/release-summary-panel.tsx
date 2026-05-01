import Link from "next/link";

import type { LocalReleaseNote, LocalReleaseStorageStatus } from "@/lib/domain/types";
import { ROUTES, settingsReleaseDetailRoute } from "@/lib/navigation/routes";

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

export function ReleaseSummaryPanel({
  release,
  storageStatus,
}: {
  release: LocalReleaseNote;
  storageStatus: LocalReleaseStorageStatus;
}) {
  return (
    <section className="shell__section session-panel release-summary-panel">
      <div className="session-panel__header">
        <span className="section-note">Release summary</span>
        <span className="workspace-pill workspace-pill--warn">{STATUS_LABELS[release.status]}</span>
      </div>

      <p className="surface-heading__copy">
        {release.summary} The archive stays browser-local and visible from Settings.
      </p>

      <div className="settings-grid">
        <article className="settings-card">
          <span className="settings-card__label">Latest release</span>
          <span className="settings-card__title">{release.title}</span>
          <p className="card-copy">{release.updatedAt}</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Milestones</span>
          <span className="settings-card__title">{release.milestoneIds.length}</span>
          <p className="card-copy">Local milestone records only.</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Readiness checks</span>
          <span className="settings-card__title">{release.readinessCheckIds.length}</span>
          <p className="card-copy">Preview checks remain static and inspectable.</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Storage state</span>
          <span className="settings-card__title">{STORAGE_LABELS[storageStatus.state]}</span>
          <p className="card-copy">{storageStatus.note}</p>
        </article>
      </div>

      <div className="release-summary-panel__actions">
        <Link className="settings-link" href={ROUTES.settingsReleases}>
          Open release notes
        </Link>
        <Link className="settings-link" href={settingsReleaseDetailRoute(release.id)}>
          Open latest detail
        </Link>
      </div>
    </section>
  );
}
