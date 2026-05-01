import type { Workflow } from "@/lib/domain/types";

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
          <span className="card-title">{workflow.name}</span>
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
        <span className="card-meta">Last run {workflow.lastRunAt}</span>
        <span className="workspace-pill">Project: {workflow.projectId}</span>
      </div>
    </article>
  );
}
