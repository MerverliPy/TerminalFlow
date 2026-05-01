import Link from "next/link";

import type { HostConnection, Project, TerminalSession } from "@/lib/domain/types";
import { hostDetailRoute } from "@/lib/navigation/routes";

const HOST_STATUS_LABELS: Record<HostConnection["status"], string> = {
  connected: "Connected",
  connecting: "Connecting",
  offline: "Offline",
};

export function SessionHostPanel({
  session,
  project,
  host,
}: {
  session: TerminalSession;
  project: Project;
  host: HostConnection;
}) {
  return (
    <section className="shell__section session-panel">
      <div className="session-panel__header">
        <span className="section-note">Host context</span>
        <span
          className={`workspace-pill ${
            host.status === "connected"
              ? "workspace-pill--good"
              : host.status === "connecting"
                ? "workspace-pill--accent"
                : "workspace-pill--warn"
          }`}
        >
          {HOST_STATUS_LABELS[host.status]}
        </span>
      </div>

      <div className="session-panel__grid">
        <article className="meta-card">
          <span className="meta-card__label">Host</span>
          <span className="meta-card__value">{host.name}</span>
          <p className="meta-card__copy">
            {host.host}{" "}
            <Link className="session-detail-header__back" href={hostDetailRoute(host.id)}>
              Open host setup
            </Link>
          </p>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Operating system</span>
          <span className="meta-card__value">{host.operatingSystem}</span>
          <p className="meta-card__copy">Environment: {host.environment}</p>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Connection method</span>
          <span className="meta-card__value">{host.connectionMethod}</span>
          <p className="meta-card__copy">Workspace root: {host.workspaceRoot}</p>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Last checked</span>
          <span className="meta-card__value">{host.lastCheckedAt}</span>
          <p className="meta-card__copy">Connection metadata is static.</p>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Project root</span>
          <span className="meta-card__value">{project.path}</span>
          <p className="meta-card__copy">Current session cwd: {session.cwd}</p>
        </article>
      </div>
    </section>
  );
}
