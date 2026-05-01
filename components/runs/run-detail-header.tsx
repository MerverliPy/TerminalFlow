import Link from "next/link";

import type { WorkflowRun } from "@/lib/domain/types";
import { workflowRunsRoute, workflowDetailRoute } from "@/lib/navigation/routes";
import { RunStatusBadge } from "@/components/runs/run-status-badge";

const SAFETY_LABELS: Record<WorkflowRun["safetyState"], string> = {
  safe: "Safe",
  warning: "Warning",
  blocked: "Blocked",
};

const SAFETY_CLASSES: Record<WorkflowRun["safetyState"], string> = {
  safe: "workspace-pill--good",
  warning: "workspace-pill--warn",
  blocked: "workspace-pill--warn",
};

const RUN_LABELS: Record<WorkflowRun["status"], string> = {
  completed: "Completed",
  running: "Running",
  paused: "Paused",
  blocked: "Blocked",
  cancelled: "Cancelled",
  failed: "Failed",
};

export function RunDetailHeader({ run }: { run: WorkflowRun }) {
  return (
    <header className="run-detail-header">
      <div className="session-detail-header__top">
        <Link className="session-detail-header__back" href={workflowRunsRoute(run.workflowId)}>
          Back to run history
        </Link>
        <RunStatusBadge status={run.status} />
      </div>

      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Workflow run</span>
        <h1 className="surface-heading__title">{run.workflowName}</h1>
        <p className="surface-heading__copy">{run.summary}</p>
        <div className="workflow-builder__status">
          <Link className="settings-link" href={workflowDetailRoute(run.workflowId)}>
            Open workflow
          </Link>
          <span className={`workspace-pill ${SAFETY_CLASSES[run.safetyState]}`}>
            Safety {SAFETY_LABELS[run.safetyState]}
          </span>
        </div>
      </section>

      <div className="run-meta-grid">
        <article className="meta-card">
          <span className="meta-card__label">Workflow</span>
          <span className="meta-card__value">{run.workflowName}</span>
          <p className="meta-card__copy">{run.trigger}</p>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Target</span>
          <span className="meta-card__value">{run.target}</span>
          <p className="meta-card__copy">{run.targetDetail}</p>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Start time</span>
          <span className="meta-card__value">{run.startTime}</span>
          <p className="meta-card__copy">Workspace root: {run.workspaceRoot}</p>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Duration</span>
          <span className="meta-card__value">{run.duration}</span>
          <p className="meta-card__copy">Status: {RUN_LABELS[run.status]}</p>
        </article>
      </div>
    </header>
  );
}
