import type { LocalReleaseReadinessCheck } from "@/lib/domain/types";

const STATUS_CLASSES: Record<LocalReleaseReadinessCheck["status"], string> = {
  ready: "workspace-pill--good",
  watch: "workspace-pill--warn",
  blocked: "workspace-pill--blocked",
};

export function ReleaseReadinessChecklist({
  checks,
}: {
  checks: LocalReleaseReadinessCheck[];
}) {
  return (
    <section className="shell__section">
      <div className="card-stack">
        <div className="session-panel__header">
          <span className="section-note">Release readiness checklist</span>
          <span className="workspace-pill workspace-pill--accent">{checks.length} checks</span>
        </div>

        <div className="release-readiness-grid">
          {checks.map((check) => (
            <article className="meta-card" key={check.id}>
              <div className="card__top">
                <div className="card-kv">
                  <span className="card-kv__label">{check.evidence}</span>
                  <span className="card-title">{check.label}</span>
                </div>
                <span className={`workspace-pill ${STATUS_CLASSES[check.status]}`}>{check.status}</span>
              </div>
              <p className="card-copy">{check.detail}</p>
              <p className="meta-card__copy">{check.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
