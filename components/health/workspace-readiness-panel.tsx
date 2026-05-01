import type { HealthDashboardMetric, WorkspaceReadinessSnapshot } from "@/lib/domain/types";

const TONE_CLASSES: Record<HealthDashboardMetric["tone"], string> = {
  good: "workspace-pill--good",
  warn: "workspace-pill--warn",
  accent: "workspace-pill--accent",
};

export function WorkspaceReadinessPanel({
  snapshot,
  metrics,
}: {
  snapshot: WorkspaceReadinessSnapshot;
  metrics: HealthDashboardMetric[];
}) {
  return (
    <section className="shell__section">
      <div className="card-stack">
        <div className="card__top">
          <span className="section-note">{snapshot.title}</span>
          <span className={`workspace-pill ${snapshot.status === "ready" ? "workspace-pill--good" : "workspace-pill--warn"}`}>
            {snapshot.status}
          </span>
        </div>
        <p className="card-copy">{snapshot.summary}</p>

        <div className="health-metric-strip">
          {metrics.map((metric) => (
            <article className="meta-card" key={metric.id}>
              <span className="meta-card__label">{metric.label}</span>
              <span className={`workspace-pill ${TONE_CLASSES[metric.tone]}`}>{metric.value}</span>
              <p className="meta-card__copy">{metric.detail}</p>
            </article>
          ))}
        </div>

        <div className="health-snapshot-grid">
          <article className="meta-card">
            <span className="meta-card__label">Projects</span>
            <span className="meta-card__value">{snapshot.projectCount}</span>
            <p className="meta-card__copy">Project health is represented as static preview data.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Hosts</span>
            <span className="meta-card__value">{snapshot.hostCount}</span>
            <p className="meta-card__copy">Host readiness stays local and does not pair to any machine.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Workflows</span>
            <span className="meta-card__value">{snapshot.workflowCount}</span>
            <p className="meta-card__copy">No workflow runner or job queue is wired here.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Integrations</span>
            <span className="meta-card__value">{snapshot.integrationCount}</span>
            <p className="meta-card__copy">Provider links are local metadata only.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Secrets</span>
            <span className="meta-card__value">{snapshot.secretCount}</span>
            <p className="meta-card__copy">Secret metadata is redacted and never reveals values.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Notifications</span>
            <span className="meta-card__value">{snapshot.notificationCount}</span>
            <p className="meta-card__copy">Alert records are preview metadata with no delivery path.</p>
          </article>
        </div>

        <span className="section-note">{snapshot.note}</span>
      </div>
    </section>
  );
}
