import type { NotificationSeverity } from "@/lib/domain/types";

const SEVERITY_CLASSES: Record<NotificationSeverity, string> = {
  low: "workspace-pill--good",
  medium: "workspace-pill--warn",
  high: "workspace-pill--accent",
  critical: "workspace-pill--warn",
};

export function AlertSeverityBadge({ severity }: { severity: NotificationSeverity }) {
  return <span className={`workspace-pill ${SEVERITY_CLASSES[severity]}`}>{severity}</span>;
}
