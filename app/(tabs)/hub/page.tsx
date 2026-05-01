import {
  MOCK_HOST_CONNECTIONS,
  MOCK_PROJECTS,
  MOCK_SESSIONS,
  MOCK_WORKFLOWS,
  MOCK_WORKSPACE,
} from "@/lib/domain/mock-data";

export default function HubPage() {
  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Hub</span>
        <h1 className="surface-heading__title">Workspace summary</h1>
        <p className="surface-heading__copy">
          This phase keeps the product vocabulary local and static. The Hub
          surfaces the current mock workspace so the tab flow has a clear
          command center without any backend wiring.
        </p>
      </section>

      <section className="stats-grid" aria-label="Workspace stats">
        <article className="stat-card">
          <span className="stat-card__label">Workspace</span>
          <span className="stat-card__value">{MOCK_WORKSPACE.name}</span>
        </article>
        <article className="stat-card">
          <span className="stat-card__label">Projects</span>
          <span className="stat-card__value">{MOCK_WORKSPACE.projectCount}</span>
        </article>
        <article className="stat-card">
          <span className="stat-card__label">Sessions</span>
          <span className="stat-card__value">{MOCK_WORKSPACE.runningSessions} running</span>
        </article>
        <article className="stat-card">
          <span className="stat-card__label">Workflows</span>
          <span className="stat-card__value">{MOCK_WORKSPACE.workflowCount}</span>
        </article>
      </section>

      <section className="shell__section">
        <div className="workspace-grid">
          <div className="workspace-rail">
            <span className="section-note">Host connections</span>
            {MOCK_HOST_CONNECTIONS.map((host) => (
              <span
                key={host.id}
                className={`workspace-pill ${
                  host.status === "connected"
                    ? "workspace-pill--good"
                    : host.status === "connecting"
                      ? "workspace-pill--accent"
                      : "workspace-pill--warn"
                }`}
              >
                {host.name} · {host.host} · {host.platform}
              </span>
            ))}
          </div>

          <div className="workspace-rail">
            <span className="section-note">Highlighted project</span>
            <span className="workspace-pill workspace-pill--accent">
              {MOCK_PROJECTS[0]?.name} · {MOCK_PROJECTS[0]?.language}
            </span>
          </div>

          <div className="workspace-rail">
            <span className="section-note">Active session</span>
            <span className="workspace-pill workspace-pill--good">
              {MOCK_SESSIONS[0]?.title} · {MOCK_SESSIONS[0]?.commandPreview}
            </span>
          </div>

          <div className="workspace-rail">
            <span className="section-note">Queued workflow</span>
            <span className="workspace-pill workspace-pill--warn">
              {MOCK_WORKFLOWS[1]?.name} · {MOCK_WORKFLOWS[1]?.state}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
