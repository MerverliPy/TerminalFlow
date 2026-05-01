import Link from "next/link";

import type { LocalReleaseNote } from "@/lib/domain/types";
import { settingsReleaseDetailRoute } from "@/lib/navigation/routes";

const STATUS_LABELS: Record<LocalReleaseNote["status"], string> = {
  draft: "Draft",
  reviewing: "Reviewing",
  ready: "Ready",
  published: "Published",
  blocked: "Blocked",
};

const STATUS_CLASSES: Record<LocalReleaseNote["status"], string> = {
  draft: "workspace-pill--accent",
  reviewing: "workspace-pill--warn",
  ready: "workspace-pill--good",
  published: "workspace-pill--good",
  blocked: "workspace-pill--blocked",
};

export function ReleaseNotesCard({ release }: { release: LocalReleaseNote }) {
  return (
    <Link
      className="card card--link release-notes-card"
      href={settingsReleaseDetailRoute(release.id)}
      aria-label={`Open release details for ${release.title}`}
    >
      <div className="card__top">
        <div className="card-kv">
          <span className="card-kv__label">{release.version}</span>
          <span className="card-title">{release.title}</span>
        </div>
        <span className={`workspace-pill ${STATUS_CLASSES[release.status]}`}>
          {STATUS_LABELS[release.status]}
        </span>
      </div>

      <div className="card__body">
        <p className="card-copy">{release.summary}</p>
        <div className="release-notes-card__meta">
          <span className="workspace-pill workspace-pill--accent">{release.milestoneIds.length} milestones</span>
          <span className="workspace-pill workspace-pill--accent">{release.readinessCheckIds.length} checks</span>
          <span className="workspace-pill workspace-pill--accent">{release.riskIds.length} risks</span>
        </div>
      </div>

      <div className="card__footer">
        <span className="card-meta">Updated {release.updatedAt}</span>
        <span className="workspace-pill workspace-pill--accent">Archive note</span>
      </div>
    </Link>
  );
}
