import type { LocalPhaseCompletionSummary } from "@/lib/domain/types";

const STATUS_CLASSES: Record<LocalPhaseCompletionSummary["status"], string> = {
  complete: "workspace-pill--good",
  watch: "workspace-pill--warn",
  blocked: "workspace-pill--blocked",
};

export function PhaseCompletionSummary({
  summaries,
}: {
  summaries: LocalPhaseCompletionSummary[];
}) {
  return (
    <section className="shell__section">
      <div className="card-stack">
        <div className="session-panel__header">
          <span className="section-note">Phase completion summaries</span>
          <span className="workspace-pill workspace-pill--accent">{summaries.length} phases</span>
        </div>

        <div className="release-phase-grid">
          {summaries.map((summary) => (
            <article className="settings-card" key={summary.id}>
              <div className="card__top">
                <div className="card-kv">
                  <span className="card-kv__label">{summary.phaseLabel}</span>
                  <span className="card-title">{summary.title}</span>
                </div>
                <span className={`workspace-pill ${STATUS_CLASSES[summary.status]}`}>{summary.status}</span>
              </div>
              <p className="card-copy">{summary.summary}</p>
              <p className="card-copy">{summary.evidence}</p>
              <div className="release-hero__meta">
                <span className="workspace-pill workspace-pill--accent">{summary.completedAt}</span>
              </div>
              <p className="meta-card__copy">{summary.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
