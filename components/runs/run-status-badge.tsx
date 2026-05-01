import type { WorkflowRunStatus } from "@/lib/domain/types";

const RUN_STATUS_LABELS: Record<WorkflowRunStatus, string> = {
  completed: "Completed",
  running: "Running",
  paused: "Paused",
  blocked: "Blocked",
  cancelled: "Cancelled",
  failed: "Failed",
};

const RUN_STATUS_CLASSES: Record<WorkflowRunStatus, string> = {
  completed: "workspace-pill--good",
  running: "workspace-pill--accent",
  paused: "workspace-pill--warn",
  blocked: "workspace-pill--warn",
  cancelled: "workspace-pill--warn",
  failed: "workspace-pill--warn",
};

export function RunStatusBadge({ status }: { status: WorkflowRunStatus }) {
  return <span className={`workspace-pill ${RUN_STATUS_CLASSES[status]}`}>{RUN_STATUS_LABELS[status]}</span>;
}
