import type { ExecutionPlanMapping } from "@/lib/domain/types";

const MAPPING_TONES: Record<ExecutionPlanMapping["kind"], string> = {
  workflow: "workspace-pill--accent",
  host: "workspace-pill--warn",
  session: "workspace-pill--good",
  command: "workspace-pill--blocked",
};

export function ExecutionPlanMappingPanel({
  mappings,
}: {
  mappings: ExecutionPlanMapping[];
}) {
  return (
    <section className="shell__section">
      <div className="card-stack">
        <div className="card__top">
          <span className="section-note">Workflow, host, session, and command mapping</span>
          <span className="workspace-pill workspace-pill--accent">{mappings.length} mappings</span>
        </div>

        <div className="settings-grid">
          {mappings.map((mapping) => (
            <article className="settings-card" key={mapping.id}>
              <div className="session-panel__header">
                <span className="settings-card__label">{mapping.kind} mapping</span>
                <span className={`workspace-pill ${MAPPING_TONES[mapping.kind]}`}>{mapping.kind}</span>
              </div>
              <span className="settings-card__title">{mapping.label}</span>
              <p className="card-copy">{mapping.detail}</p>
              <div className="preflight-check-category__meta">
                <span className="preflight-check-category__meta-item">Source: {mapping.source}</span>
                <span className="preflight-check-category__meta-item">Target: {mapping.target}</span>
                <span className="preflight-check-category__meta-item">{mapping.preview}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
