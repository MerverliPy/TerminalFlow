import type { SecretAccessPolicy } from "@/lib/auth/auth-types";

const POLICY_CLASSES: Record<SecretAccessPolicy["findings"][number]["severity"], string> = {
  info: "workspace-pill--accent",
  warn: "workspace-pill--warn",
  blocked: "workspace-pill--good",
};

export function SecretAccessPolicyPanel({ policy }: { policy: SecretAccessPolicy }) {
  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Access policy</span>
        <span className="workspace-pill workspace-pill--accent">{policy.allowedRoles.join(", ")}</span>
      </div>

      <span className="settings-card__title">{policy.title}</span>
      <p className="surface-heading__copy">{policy.summary}</p>

      <div className="settings-grid">
        {policy.findings.map((finding) => (
          <article className="settings-card" key={finding.id}>
            <span className={`workspace-pill ${POLICY_CLASSES[finding.severity]}`}>{finding.severity}</span>
            <span className="settings-card__title">{finding.title}</span>
            <p className="card-copy">{finding.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
