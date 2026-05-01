import type { HostSafetyCheck, HostSafetyCheckState } from "@/lib/domain/types";

const CHECK_LABELS: Record<HostSafetyCheckState, string> = {
  pass: "Pass",
  warn: "Review",
  blocked: "Blocked",
};

const CHECK_CLASSES: Record<HostSafetyCheckState, string> = {
  pass: "workspace-pill--good",
  warn: "workspace-pill--warn",
  blocked: "workspace-pill--accent",
};

export function HostSafetyChecklist({
  checks,
}: {
  checks: HostSafetyCheck[];
}) {
  return (
    <section className="shell__section host-panel">
      <div className="session-panel__header">
        <span className="section-note">Safety checklist</span>
        <span className="workspace-pill workspace-pill--warn">
          Real connection inactive
        </span>
      </div>

      <div className="host-checklist">
        {checks.map((check) => (
          <article className="host-check" key={check.id}>
            <div className="card__top">
              <div className="card-kv">
                <span className="card-kv__label">{check.label}</span>
              </div>
              <span className={`workspace-pill ${CHECK_CLASSES[check.state]}`}>
                {CHECK_LABELS[check.state]}
              </span>
            </div>
            <p className="card-copy">{check.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
