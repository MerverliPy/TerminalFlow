import type { WorkflowRunStep } from "@/lib/domain/types";

const STEP_KIND_LABELS: Record<WorkflowRunStep["kind"], string> = {
  check: "Check",
  command: "Command",
  decision: "Decision",
  handoff: "Handoff",
};

const STEP_STATUS_LABELS: Record<WorkflowRunStep["status"], string> = {
  queued: "Queued",
  running: "Running",
  completed: "Completed",
  blocked: "Blocked",
  skipped: "Skipped",
  cancelled: "Cancelled",
};

const STEP_STATUS_CLASSES: Record<WorkflowRunStep["status"], string> = {
  queued: "workspace-pill--accent",
  running: "workspace-pill--accent",
  completed: "workspace-pill--good",
  blocked: "workspace-pill--warn",
  skipped: "workspace-pill--warn",
  cancelled: "workspace-pill--warn",
};

export function RunStepPanel({ step, index }: { step: WorkflowRunStep; index: number }) {
  return (
    <article className="run-step-panel">
      <div className="card__top">
        <div className="card-kv">
          <span className="card-kv__label">
            Step {index + 1} · {STEP_KIND_LABELS[step.kind]}
          </span>
          <span className="card-title">{step.title}</span>
        </div>
        <span className={`workspace-pill ${STEP_STATUS_CLASSES[step.status]}`}>
          {STEP_STATUS_LABELS[step.status]}
        </span>
      </div>

      <div className="card__body">
        <p className="card-copy">{step.detail}</p>
        <div className="run-step-panel__grid">
          <article className="meta-card">
            <span className="meta-card__label">Started</span>
            <span className="meta-card__value">{step.startedAt}</span>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Finished</span>
            <span className="meta-card__value">{step.finishedAt}</span>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Duration</span>
            <span className="meta-card__value">{step.duration}</span>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Status</span>
            <span className="meta-card__value">{STEP_STATUS_LABELS[step.status]}</span>
          </article>
        </div>
      </div>
    </article>
  );
}
