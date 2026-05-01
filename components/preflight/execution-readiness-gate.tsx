import type {
  ExecutionApprovalPreview,
  ExecutionGateActionPreview,
  ExecutionPreflightCheck,
  ExecutionPreflightCheckCategory,
  ExecutionPreflightFinding,
  ExecutionPreflightGate,
  ExecutionReadinessSnapshot,
} from "@/lib/domain/types";

import { DisabledPreflightActions } from "@/components/preflight/disabled-preflight-actions";
import { PreflightChecklist } from "@/components/preflight/preflight-checklist";
import { PreflightFindingCard } from "@/components/preflight/preflight-finding-card";
import { PreflightSafetyNote } from "@/components/preflight/preflight-safety-note";
import { PreflightSummaryPanel } from "@/components/preflight/preflight-summary-panel";

export function ExecutionReadinessGate({
  snapshot,
  gates,
  categories,
  checks,
  findings,
  approvalPreview,
  actions,
}: {
  snapshot: ExecutionReadinessSnapshot;
  gates: ExecutionPreflightGate[];
  categories: ExecutionPreflightCheckCategory[];
  checks: ExecutionPreflightCheck[];
  findings: ExecutionPreflightFinding[];
  approvalPreview: ExecutionApprovalPreview;
  actions: ExecutionGateActionPreview[];
}) {
  return (
    <>
      <PreflightSummaryPanel
        snapshot={snapshot}
        gates={gates}
        approvalPreview={approvalPreview}
      />

      <PreflightChecklist categories={categories} checks={checks} />

      <section className="shell__section">
        <div className="card-stack">
          <div className="card__top">
            <span className="section-note">Preflight findings</span>
            <span className="workspace-pill workspace-pill--accent">{findings.length} findings</span>
          </div>
          <div className="preflight-finding-grid">
            {findings.map((finding) => (
              <PreflightFindingCard key={finding.id} finding={finding} />
            ))}
          </div>
        </div>
      </section>

      <DisabledPreflightActions actions={actions} />
      <PreflightSafetyNote />
    </>
  );
}
