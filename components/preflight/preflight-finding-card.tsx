import type { ExecutionPreflightFinding } from "@/lib/domain/types";

import { PreflightStatusBadge } from "@/components/preflight/preflight-status-badge";

export function PreflightFindingCard({ finding }: { finding: ExecutionPreflightFinding }) {
  return (
    <article className="settings-card preflight-finding-card">
      <div className="session-panel__header">
        <span className="settings-card__label">Finding</span>
        <PreflightStatusBadge status={finding.severity} />
      </div>
      <span className="settings-card__title">{finding.title}</span>
      <p className="card-copy">{finding.detail}</p>
      <span className="preflight-finding-card__note">{finding.recommendation}</span>
    </article>
  );
}
