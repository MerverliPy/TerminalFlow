import type { SecretMetadata } from "@/lib/auth/auth-types";

const RISK_CLASSES: Record<SecretMetadata["riskLevel"], string> = {
  low: "workspace-pill--good",
  medium: "workspace-pill--warn",
  high: "workspace-pill--accent",
};

const ROTATION_CLASSES: Record<SecretMetadata["rotationState"], string> = {
  fresh: "workspace-pill--good",
  due: "workspace-pill--warn",
  stale: "workspace-pill--accent",
};

export function SecretMetadataCard({
  secret,
  categoryTitle,
}: {
  secret: SecretMetadata;
  categoryTitle: string;
}) {
  return (
    <article className="settings-card secret-card">
      <div className="session-panel__header">
        <span className="settings-card__label">{secret.provider}</span>
        <span className="workspace-pill workspace-pill--accent">{secret.scope}</span>
      </div>

      <span className="settings-card__title">{secret.label}</span>
      <div className="card-stack">
        <span className="secret-value">{secret.redactedValue}</span>
        <p className="card-copy">Owner: {secret.owner}</p>
      </div>

      <div className="secret-chip-row">
        <span className={`workspace-pill ${RISK_CLASSES[secret.riskLevel]}`}>{secret.riskLevel} risk</span>
        <span className={`workspace-pill ${ROTATION_CLASSES[secret.rotationState]}`}>{secret.rotationState}</span>
      </div>

      <div className="secret-meta-grid">
        <div className="card-kv">
          <span className="card-kv__label">Category</span>
          <span className="card-kv__value">{categoryTitle}</span>
        </div>
        <div className="card-kv">
          <span className="card-kv__label">Reviewed</span>
          <span className="card-kv__value">{secret.lastReviewedAt}</span>
        </div>
        <div className="card-kv">
          <span className="card-kv__label">Updated</span>
          <span className="card-kv__value">{secret.lastUpdatedAt}</span>
        </div>
      </div>
    </article>
  );
}
