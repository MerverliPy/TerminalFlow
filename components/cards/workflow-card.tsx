import Link from "next/link";

import type { Workflow } from "@/lib/domain/types";
import { workflowDetailRoute, workflowPreviewRoute } from "@/lib/navigation/routes";

const WORKFLOW_LABELS: Record<Workflow["state"], string> = {
  ready: "Ready",
  draft: "Draft",
  blocked: "Blocked",
};

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
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
        <p className="card-copy">{workflow.description}</p>
        <div className="card-kv">
          <span className="card-kv__label">Trigger</span>
          <span className="card-kv__value">{workflow.trigger.label}</span>
        </div>
        <div className="card-kv">
          <span className="card-kv__label">Target</span>
          <span className="card-kv__value">
            {workflow.target.projectName} on {workflow.target.hostName}
          </span>
        </div>
        <div className="card-kv">
          <span className="card-kv__label">Steps</span>
          <span className="card-kv__value">{workflow.steps.length} step plan</span>
        </div>
      </div>

      <div className="card__footer">
        <span className="card-meta">Last run {workflow.lastRunAt}</span>
        <div className="workflow-card__links">
          <Link className="workflow-card__link" href={workflowDetailRoute(workflow.id)}>
            Open builder
          </Link>
          <Link className="workflow-card__link" href={workflowPreviewRoute(workflow.id)}>
            Preview run
          </Link>
        </div>
      </div>
    </article>
  );
}
