import type { LocalExecutionPlanStep } from "@/lib/domain/types";

const STEP_KIND_LABELS: Record<LocalExecutionPlanStep["kind"], string> = {
  check: "Check",
  command: "Command",
  decision: "Decision",
  handoff: "Handoff",
  review: "Review",
};

const STEP_STATUS_CLASSES: Record<LocalExecutionPlanStep["status"], string> = {
  planned: "workspace-pill--accent",
  ready: "workspace-pill--good",
  blocked: "workspace-pill--warn",
};

const STEP_STATUS_LABELS: Record<LocalExecutionPlanStep["status"], string> = {
  planned: "Planned",
  ready: "Ready",
  blocked: "Blocked",
};

export function ExecutionPlanStepCard({ step }: { step: LocalExecutionPlanStep }) {
  return (
    <article className="settings-card">
      <div className="session-panel__header">
        <span className="settings-card__label">
          Step {step.order} · {STEP_KIND_LABELS[step.kind]}
        </span>
        <span className={`workspace-pill ${STEP_STATUS_CLASSES[step.status]}`}>
          {STEP_STATUS_LABELS[step.status]}
        </span>
      </div>

      <span className="settings-card__title">{step.title}</span>
      <p className="card-copy">{step.detail}</p>

      <div className="preflight-check-category__meta">
        <span className="preflight-check-category__meta-item">
          Estimated duration: {step.estimatedDuration}
        </span>
        <span className="preflight-check-category__meta-item">{step.preview}</span>
        <span className="preflight-check-category__meta-item">
          Dependencies: {step.dependencyIds.length}
        </span>
      </div>
    </article>
  );
}
