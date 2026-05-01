import type { LocalReleaseRisk } from "@/lib/domain/types";

const SEVERITY_CLASSES: Record<LocalReleaseRisk["severity"], string> = {
  info: "workspace-pill--accent",
  warn: "workspace-pill--warn",
  blocked: "workspace-pill--blocked",
};

export function ReleaseRiskPanel({ risks }: { risks: LocalReleaseRisk[] }) {
  return (
    <section className="shell__section session-panel">
      <div className="session-panel__header">
        <span className="section-note">Release risk notes</span>
        <span className="workspace-pill workspace-pill--accent">{risks.length} risks</span>
      </div>

      <div className="release-risk-grid">
        {risks.map((risk) => (
          <article className="settings-card" key={risk.id}>
            <div className="card__top">
              <div className="card-kv">
                <span className="card-kv__label">{risk.mitigation}</span>
                <span className="card-title">{risk.title}</span>
              </div>
              <span className={`workspace-pill ${SEVERITY_CLASSES[risk.severity]}`}>{risk.severity}</span>
            </div>
            <p className="card-copy">{risk.detail}</p>
            <p className="meta-card__copy">{risk.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
