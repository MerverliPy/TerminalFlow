import type { LocalAuditEventSeverity, LocalAuditEventStatus } from "@/lib/domain/types";

const STATUS_CLASS: Record<LocalAuditEventStatus, string> = {
  new: "workspace-pill--warn",
  acknowledged: "workspace-pill--accent",
  resolved: "workspace-pill--good",
  restored: "workspace-pill--good",
};

const SEVERITY_CLASS: Record<LocalAuditEventSeverity, string> = {
  info: "workspace-pill--accent",
  warn: "workspace-pill--warn",
  high: "workspace-pill--warn",
  critical: "workspace-pill--warn",
};

export function AuditStatusBadge({ status, severity }: { status: LocalAuditEventStatus; severity: LocalAuditEventSeverity }) {
  return (
    <div className="card-stack" style={{ flexDirection: "row", gap: "0.5rem" }}>
      <span className={`workspace-pill ${STATUS_CLASS[status]}`}>{status}</span>
      <span className={`workspace-pill ${SEVERITY_CLASS[severity]}`}>{severity}</span>
    </div>
  );
}
