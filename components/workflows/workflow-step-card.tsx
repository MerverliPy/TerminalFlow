import type { WorkflowStep } from "@/lib/domain/types";

const STEP_KIND_LABELS: Record<WorkflowStep["kind"], string> = {
  command: "Command",
  check: "Check",
  decision: "Decision",
  handoff: "Handoff",
  note: "Note",
};

const STEP_STATUS_LABELS: Record<WorkflowStep["status"], string> = {
  pending: "Pending",
  ready: "Ready",
  running: "Running",
  blocked: "Blocked",
  done: "Done",
};

const STEP_STATUS_CLASSES: Record<WorkflowStep["status"], string> = {
  pending: "workspace-pill--accent",
  ready: "workspace-pill--good",
  running: "workspace-pill--accent",
  blocked: "workspace-pill--warn",
  done: "workspace-pill--good",
};

export function WorkflowStepCard({ step, index }: { step: WorkflowStep; index: number }) {
  return (
    <article className="workflow-step-card">
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
        {step.commandPreview ? (
          <div className="card-kv">
            <span className="card-kv__label">Command preview</span>
            <span className="card-kv__value workflow-step-card__command">{step.commandPreview}</span>
          </div>
        ) : null}
      </div>
    </article>
  );
}
