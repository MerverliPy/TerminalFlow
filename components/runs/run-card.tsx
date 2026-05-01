import Link from "next/link";

import type { WorkflowRun } from "@/lib/domain/types";
import { workflowRunDetailRoute } from "@/lib/navigation/routes";
import { RunStatusBadge } from "@/components/runs/run-status-badge";

const SAFETY_LABELS: Record<WorkflowRun["safetyState"], string> = {
  safe: "Safe",
  warning: "Warning",
  blocked: "Blocked",
};

export function RunCard({ run }: { run: WorkflowRun }) {
  return (
    <Link
      href={workflowRunDetailRoute(run.workflowId, run.id)}
      className="card card--link run-card"
      aria-label={`Open run details for ${run.workflowName} at ${run.startTime}`}
    >
      <div className="card__top">
        <div className="card-kv">
          <span className="card-kv__label">{run.workflowName}</span>
          <span className="card-title">{run.id}</span>
        </div>
        <RunStatusBadge status={run.status} />
      </div>

      <div className="card__body">
        <p className="card-copy">{run.summary}</p>
        <div className="card-kv">
          <span className="card-kv__label">Trigger</span>
          <span className="card-kv__value">{run.trigger}</span>
        </div>
        <div className="card-kv">
          <span className="card-kv__label">Target</span>
          <span className="card-kv__value">{run.target}</span>
        </div>
      </div>

      <div className="card__footer">
        <span className="card-meta">
          {run.startTime} · {run.duration}
        </span>
        <span className="workspace-pill workspace-pill--accent">
          Safety {SAFETY_LABELS[run.safetyState]}
        </span>
      </div>
    </Link>
  );
}
