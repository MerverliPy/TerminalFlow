import type { HostConnection, Project, TerminalSession } from "@/lib/domain/types";

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
          <p className="meta-card__copy">{host.host}</p>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Platform</span>
          <span className="meta-card__value">{host.platform}</span>
          <p className="meta-card__copy">Workspace root: {host.workspaceRoot}</p>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Project root</span>
          <span className="meta-card__value">{project.path}</span>
          <p className="meta-card__copy">Current session cwd: {session.cwd}</p>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Last seen</span>
          <span className="meta-card__value">{host.lastSeenAt}</span>
          <p className="meta-card__copy">Connection metadata is static.</p>
        </article>
      </div>
    </section>
  );
}
