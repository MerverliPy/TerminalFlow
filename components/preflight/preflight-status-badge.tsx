import type {
  ExecutionPreflightFindingSeverity,
  ExecutionPreflightStatus,
} from "@/lib/domain/types";

const STATUS_CLASSES: Record<
  ExecutionPreflightStatus | ExecutionPreflightFindingSeverity,
  string
> = {
  ready: "workspace-pill--good",
  warn: "workspace-pill--warn",
  warning: "workspace-pill--warn",
  blocked: "workspace-pill--blocked",
  info: "workspace-pill--accent",
};

export function PreflightStatusBadge({
  status,
  label,
}: {
  status: ExecutionPreflightStatus | ExecutionPreflightFindingSeverity;
  label?: string;
}) {
  return <span className={`workspace-pill ${STATUS_CLASSES[status]}`}>{label ?? status}</span>;
}
