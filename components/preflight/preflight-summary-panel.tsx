import type {
  ExecutionApprovalPreview,
  ExecutionPreflightGate,
  ExecutionReadinessSnapshot,
} from "@/lib/domain/types";

import { PreflightStatusBadge } from "@/components/preflight/preflight-status-badge";

const SNAPSHOT_FIELDS = [
  "workflowLabel",
  "workspaceLabel",
  "hostLabel",
] as const;

const SNAPSHOT_LABELS: Record<(typeof SNAPSHOT_FIELDS)[number], string> = {
  workflowLabel: "Workflow scope",
  workspaceLabel: "Workspace boundary",
  hostLabel: "Host posture",
};

export function PreflightSummaryPanel({
  snapshot,
  gates,
  approvalPreview,
}: {
  snapshot: ExecutionReadinessSnapshot;
  gates: ExecutionPreflightGate[];
  approvalPreview: ExecutionApprovalPreview;
}) {
  const overallStatus =
    gates.some((gate) => gate.status === "blocked")
      ? "blocked"
      : gates.some((gate) => gate.status === "warning")
        ? "warning"
        : "ready";

  return (
    <section className="shell__section preflight-summary-panel">
      <div className="card-stack">
        <div className="card__top">
          <span className="section-note">Preflight summary</span>
          <PreflightStatusBadge status={overallStatus} label="Gate summary" />
        </div>

        <p className="card-copy">{snapshot.summary}</p>

        <div className="health-snapshot-grid preflight-summary-panel__grid">
          {SNAPSHOT_FIELDS.map((field) => (
            <article className="meta-card" key={field}>
              <span className="meta-card__label">{SNAPSHOT_LABELS[field]}</span>
              <span className="meta-card__value">{snapshot[field]}</span>
              <p className="meta-card__copy">{field === "workflowLabel" ? snapshot.note : "Local static metadata only."}</p>
            </article>
          ))}
          <article className="meta-card">
            <span className="meta-card__label">Approval preview</span>
            <span className="meta-card__value">{approvalPreview.title}</span>
            <p className="meta-card__copy">{approvalPreview.summary}</p>
          </article>
        </div>

        <div className="preflight-gate-grid">
          {gates.map((gate) => (
            <article className="settings-card preflight-gate-card" key={gate.id}>
              <div className="session-panel__header">
                <span className="settings-card__label">{gate.kind} gate</span>
                <PreflightStatusBadge status={gate.status} />
              </div>
              <span className="settings-card__title">{gate.title}</span>
              <p className="card-copy">{gate.summary}</p>
              <span className="preflight-gate-card__note">{gate.note}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
