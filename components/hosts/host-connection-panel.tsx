import type { HostConnection } from "@/lib/domain/types";

export function HostConnectionPanel({ host }: { host: HostConnection }) {
  return (
    <section className="shell__section host-panel">
      <div className="session-panel__header">
        <span className="section-note">Connection setup</span>
        <span className="workspace-pill workspace-pill--accent">Static profile</span>
      </div>

      <div className="host-panel__grid">
        <article className="meta-card">
          <span className="meta-card__label">Host address</span>
          <span className="meta-card__value">{host.host}</span>
          <p className="meta-card__copy">Shown for reference only.</p>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Workspace root</span>
          <span className="meta-card__value">{host.workspaceRoot}</span>
          <p className="meta-card__copy">Local/static data only.</p>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Status</span>
          <span className="meta-card__value">{host.status}</span>
          <p className="meta-card__copy">
            Connection state is simulated and does not perform real networking.
          </p>
        </article>
      </div>
    </section>
  );
}
