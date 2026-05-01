import type { DryRunFinding, DryRunSummary } from "@/lib/domain/types";

const FINDING_CLASSES: Record<DryRunFinding["severity"], string> = {
  info: "workspace-pill--accent",
  warn: "workspace-pill--warn",
  blocked: "workspace-pill--blocked",
};

export function ExecutionPlanRiskPanel({
  summary,
  findings,
}: {
  summary: DryRunSummary;
  findings: DryRunFinding[];
}) {
  return (
    <section className="shell__section">
      <div className="card-stack">
        <div className="card__top">
          <span className="section-note">Risk and findings</span>
          <span className="workspace-pill workspace-pill--warn">{findings.length} findings</span>
        </div>

        <p className="card-copy">{summary.riskSummary}</p>

        <div className="preflight-finding-grid">
          {findings.map((finding) => (
            <article className="settings-card" key={finding.id}>
              <div className="session-panel__header">
                <span className="settings-card__label">Dry-run finding</span>
                <span className={`workspace-pill ${FINDING_CLASSES[finding.severity]}`}>
                  {finding.severity}
                </span>
              </div>
              <span className="settings-card__title">{finding.title}</span>
              <p className="card-copy">{finding.detail}</p>
              <span className="preflight-finding-card__note">{finding.recommendation}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
