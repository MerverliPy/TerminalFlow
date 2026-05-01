import type { DryRunSummary } from "@/lib/domain/types";

const RISK_CLASSES: Record<DryRunSummary["riskLevel"], string> = {
  low: "workspace-pill--good",
  medium: "workspace-pill--warn",
  high: "workspace-pill--blocked",
};

export function DryRunSummaryPanel({ summary }: { summary: DryRunSummary }) {
  return (
    <section className="shell__section">
      <div className="card-stack">
        <div className="card__top">
          <span className="section-note">Dry-run summary</span>
          <span className={`workspace-pill ${RISK_CLASSES[summary.riskLevel]}`}>
            {summary.riskLevel} risk
          </span>
        </div>

        <p className="card-copy">{summary.summary}</p>

        <div className="health-snapshot-grid">
          <article className="meta-card">
            <span className="meta-card__label">Estimated duration</span>
            <span className="meta-card__value">{summary.estimatedDuration}</span>
            <p className="meta-card__copy">{summary.title}</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Risk summary</span>
            <span className="meta-card__value">{summary.riskSummary}</span>
            <p className="meta-card__copy">Risk stays local to the mock plan model.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Dependency summary</span>
            <span className="meta-card__value">{summary.dependencySummary}</span>
            <p className="meta-card__copy">Ordering is previewed from static records only.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Action preview count</span>
            <span className="meta-card__value">{summary.actionPreviewIds.length}</span>
            <p className="meta-card__copy">Confirm, start, export, share, refresh, and approve are all represented locally.</p>
          </article>
        </div>

        <span className="section-note">{summary.note}</span>
      </div>
    </section>
  );
}
