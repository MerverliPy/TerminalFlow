import type { ExecutionPreflightCheck } from "@/lib/domain/types";

import { PreflightStatusBadge } from "@/components/preflight/preflight-status-badge";

export function PreflightCheckCard({ check }: { check: ExecutionPreflightCheck }) {
  return (
    <article className="preflight-check-card">
      <div className="card__top">
        <div className="card__body">
          <span className="card-kv__label">Check</span>
          <span className="card-title">{check.label}</span>
        </div>
        <PreflightStatusBadge status={check.status} />
      </div>
      <p className="card-copy">{check.detail}</p>
      <div className="preflight-check-card__meta">
        <span className="preflight-check-card__meta-item">{check.evidence}</span>
        <span className="preflight-check-card__meta-item">{check.preview}</span>
      </div>
    </article>
  );
}
