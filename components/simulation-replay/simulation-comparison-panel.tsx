import type {
  PersistedSimulationRunSnapshot,
  SimulationComparison,
  SimulationComparisonFinding,
} from "@/lib/storage/storage-types";

const FINDING_CLASSES: Record<SimulationComparisonFinding["severity"], string> = {
  info: "workspace-pill--accent",
  warn: "workspace-pill--warn",
  blocked: "workspace-pill--blocked",
};

const COMPARISON_CLASSES: Record<SimulationComparison["status"], string> = {
  matched: "workspace-pill--good",
  diverged: "workspace-pill--warn",
  reviewing: "workspace-pill--accent",
};

export function SimulationComparisonPanel({
  comparison,
  leftSnapshot,
  rightSnapshot,
  findings,
  onExport,
  onCompare,
}: {
  comparison: SimulationComparison | null;
  leftSnapshot: PersistedSimulationRunSnapshot;
  rightSnapshot: PersistedSimulationRunSnapshot | null;
  findings: SimulationComparisonFinding[];
  onExport: () => void;
  onCompare: () => void;
}) {
  return (
    <section className="shell__section simulation-comparison-panel">
      <div className="session-panel__header">
        <span className="section-note">Comparison</span>
        <span className={`workspace-pill ${comparison ? COMPARISON_CLASSES[comparison.status] : "workspace-pill--accent"}`}>
          {comparison ? comparison.status : "Preview"}
        </span>
      </div>

      <p className="card-copy">
        Comparison findings are rendered from browser-local snapshots only. The controls below never touch a backend service or host runtime.
      </p>

      <div className="composer__actions simulation-replay-panel__actions">
        <button className="composer__button composer__button--primary" type="button" onClick={onCompare}>
          Compare snapshots
        </button>
        <button className="composer__button" type="button" onClick={onExport}>
          Export comparison
        </button>
      </div>

      <div className="settings-grid">
        <article className="settings-card">
          <span className="settings-card__label">Left snapshot</span>
          <span className="settings-card__title">{leftSnapshot.workflowName}</span>
          <p className="card-copy">{leftSnapshot.summary}</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Right snapshot</span>
          <span className="settings-card__title">
            {rightSnapshot ? rightSnapshot.workflowName : "No comparison target"}
          </span>
          <p className="card-copy">{rightSnapshot?.summary ?? "Select another snapshot to compare."}</p>
        </article>
      </div>

      <div className="simulation-detail-list">
        {comparison ? (
          <>
            <article className="simulation-detail-block">
              <div className="card__top">
                <div className="card-kv">
                  <span className="card-kv__label">Comparison record</span>
                  <span className="card-title">{comparison.title}</span>
                </div>
                <span className={`workspace-pill ${COMPARISON_CLASSES[comparison.status]}`}>{comparison.status}</span>
              </div>
              <p className="card-copy">{comparison.summary}</p>
            </article>
            {findings.map((finding) => (
              <article className="run-log-viewer__entry" key={finding.id}>
                <div className="run-log-viewer__top">
                  <div className="card-kv">
                    <span className="card-kv__label">Finding</span>
                    <span className="run-log-viewer__message">{finding.title}</span>
                  </div>
                  <span className={`workspace-pill ${FINDING_CLASSES[finding.severity]}`}>{finding.severity}</span>
                </div>
                <p className="card-copy">{finding.detail}</p>
              </article>
            ))}
          </>
        ) : (
          <article className="simulation-detail-block">
            <p className="card-copy">No comparison record is loaded yet. Use the compare control to write a local comparison and view findings.</p>
          </article>
        )}
      </div>
    </section>
  );
}
