import Link from "next/link";

import type { Workflow } from "@/lib/domain/types";
import { MOCK_WORKFLOW_RUNS } from "@/lib/domain/mock-data";
import { workflowDetailRoute, workflowRunsRoute } from "@/lib/navigation/routes";

const WORKFLOW_LABELS: Record<Workflow["state"], string> = {
  ready: "Ready",
  draft: "Draft",
  blocked: "Blocked",
};

const RUN_LABELS = {
  completed: "Completed",
  running: "Running",
  paused: "Paused",
  blocked: "Blocked",
  cancelled: "Cancelled",
  failed: "Failed",
} as const;

const SAFETY_LABELS = {
  safe: "Safe",
  warning: "Warning",
  blocked: "Blocked",
} as const;

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const latestRun = MOCK_WORKFLOW_RUNS.find(
    (run) => run.workflowId === workflow.id,
  );

  return (
    <article className="card">
      <div className="card__top">
        <div className="card-kv">
          <span className="card-kv__label">Workflow</span>
          <Link className="card-title workflow-card__title" href={workflowDetailRoute(workflow.id)}>
            {workflow.name}
          </Link>
        </div>
        <span
          className={`workspace-pill ${
            workflow.state === "ready"
              ? "workspace-pill--good"
              : workflow.state === "blocked"
                ? "workspace-pill--warn"
                : "workspace-pill--accent"
          }`}
        >
          {WORKFLOW_LABELS[workflow.state]}
        </span>
      </div>

      <div className="card__body">
        <div className="card-kv">
          <span className="card-kv__label">Trigger</span>
          <span className="card-kv__value">{workflow.trigger}</span>
        </div>
        <div className="card-kv">
          <span className="card-kv__label">Steps</span>
          <ul className="card-list">
            {workflow.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card__footer">
        <span className="card-meta">
          Last run {latestRun ? `${latestRun.startTime} · ${RUN_LABELS[latestRun.status]}` : workflow.lastRunAt}
        </span>
        <div className="workflow-card__links">
          <Link className="workflow-card__link" href={workflowDetailRoute(workflow.id)}>
            Open workflow
          </Link>
          <Link className="workflow-card__link" href={workflowRunsRoute(workflow.id)}>
            Run history
          </Link>
        </div>
        <span className="workspace-pill workspace-pill--accent">
          Safety {latestRun ? SAFETY_LABELS[latestRun.safetyState] : "Unknown"}
        </span>
      </div>
    </article>
  );
}
