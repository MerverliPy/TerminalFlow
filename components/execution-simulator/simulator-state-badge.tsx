import type { SimulatedRunLifecycleStatus } from "@/lib/domain/types";

const STATUS_LABELS: Record<SimulatedRunLifecycleStatus, string> = {
  idle: "Idle",
  running: "Running",
  paused: "Paused",
  warning: "Warning",
  blocked: "Blocked",
  failed: "Failed",
  cancelled: "Cancelled",
  completed: "Completed",
};

const STATUS_CLASSES: Record<SimulatedRunLifecycleStatus, string> = {
  idle: "workspace-pill--accent",
  running: "workspace-pill--good",
  paused: "workspace-pill--warn",
  warning: "workspace-pill--warn",
  blocked: "workspace-pill--blocked",
  failed: "workspace-pill--blocked",
  cancelled: "workspace-pill--warn",
  completed: "workspace-pill--good",
};

export function SimulatorStateBadge({ status }: { status: SimulatedRunLifecycleStatus }) {
  return <span className={`workspace-pill ${STATUS_CLASSES[status]}`}>{STATUS_LABELS[status]}</span>;
}
