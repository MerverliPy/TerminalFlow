import Link from "next/link";

import type { HostConnection, Project, TerminalSession } from "@/lib/domain/types";
import { ROUTES } from "@/lib/navigation/routes";

const STATUS_LABELS: Record<TerminalSession["state"], string> = {
  running: "Running",
  idle: "Idle",
  paused: "Paused",
};

export function SessionDetailHeader({
  session,
  project,
  host,
}: {
  session: TerminalSession;
  project: Project;
  host: HostConnection;
}) {
  return (
    <header className="session-detail-header">
      <div className="session-detail-header__top">
        <Link className="session-detail-header__back" href={ROUTES.sessions}>
          Back to Sessions
        </Link>
        <span
          className={`workspace-pill ${
            session.state === "running"
              ? "workspace-pill--good"
              : session.state === "paused"
                ? "workspace-pill--warn"
                : "workspace-pill--accent"
          }`}
        >
          {STATUS_LABELS[session.state]}
        </span>
      </div>

      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Session detail</span>
        <h1 className="surface-heading__title">{session.title}</h1>
        <p className="surface-heading__copy">
          {project.name} on {host.name}. Execution is not active yet, so the
          surface is informational only.
        </p>
      </section>

      <div className="session-meta-grid">
        <article className="meta-card">
          <span className="meta-card__label">Project</span>
          <span className="meta-card__value">{project.name}</span>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Host</span>
          <span className="meta-card__value">{host.host}</span>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Branch</span>
          <span className="meta-card__value">{session.branch}</span>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Last activity</span>
          <span className="meta-card__value">{session.lastActivityAt}</span>
        </article>
      </div>
    </header>
  );
}
