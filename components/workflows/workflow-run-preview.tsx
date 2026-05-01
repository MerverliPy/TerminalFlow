import type { WorkflowRunPreview as WorkflowRunPreviewModel, WorkflowStep } from "@/lib/domain/types";

const PREVIEW_STATUS_LABELS: Record<WorkflowRunPreviewModel["status"], string> = {
  ready: "Ready",
  blocked: "Blocked",
  preview: "Preview",
  inactive: "Inactive",
};

const STEP_STATUS_LABELS: Record<WorkflowStep["status"], string> = {
  pending: "Pending",
  ready: "Ready",
  running: "Running",
  blocked: "Blocked",
  done: "Done",
};

const STEP_KIND_LABELS: Record<WorkflowStep["kind"], string> = {
  command: "Command",
  check: "Check",
  decision: "Decision",
  handoff: "Handoff",
  note: "Note",
};

const PREVIEW_STATUS_CLASSES: Record<WorkflowRunPreviewModel["status"], string> = {
  ready: "workspace-pill--good",
  blocked: "workspace-pill--warn",
  preview: "workspace-pill--accent",
  inactive: "workspace-pill--warn",
};

const PREVIEW_STEP_STATUS_CLASSES: Record<WorkflowStep["status"], string> = {
  pending: "workspace-pill--accent",
  ready: "workspace-pill--good",
  running: "workspace-pill--accent",
  blocked: "workspace-pill--warn",
  done: "workspace-pill--good",
};

const CHECK_STATE_LABELS = {
  pass: "Pass",
  warn: "Review",
  blocked: "Blocked",
} as const;

export function WorkflowRunPreview({
  preview,
  activeSteps,
}: {
  preview: WorkflowRunPreviewModel;
  activeSteps: WorkflowStep[];
}) {
  return (
    <section className="shell__section workflow-panel workflow-run-preview">
      <div className="session-panel__header">
        <span className="section-note">Run preview</span>
        <span className={`workspace-pill ${PREVIEW_STATUS_CLASSES[preview.status]}`}>
          {PREVIEW_STATUS_LABELS[preview.status]}
        </span>
      </div>

      <div className="meta-card">
        <span className="meta-card__label">Summary</span>
        <span className="meta-card__value">{preview.summary}</span>
        <p className="meta-card__copy">{preview.expectedOutcome}</p>
      </div>

      <div className="workflow-run-preview__grid">
        <article className="workflow-run-preview__box">
          <span className="workflow-run-preview__label">Next run</span>
          <span className="workflow-run-preview__value">{preview.nextRun}</span>
          <p className="workflow-run-preview__copy">
            Run, save, schedule, and deploy actions are rendered but inactive.
          </p>
        </article>
        <article className="workflow-run-preview__box">
          <span className="workflow-run-preview__label">Execution status</span>
          <span className="workflow-run-preview__value">Workflow execution is not active in this phase.</span>
          <p className="workflow-run-preview__copy">
            This surface previews the sequence only. No workflow runner is connected.
          </p>
        </article>
      </div>

      <div className="workflow-run-preview__steps">
        {activeSteps.map((step, index) => (
          <article className="workflow-run-preview__step" key={step.id}>
            <div className="card__top">
              <div className="card-kv">
                <span className="card-kv__label">
                  Step {index + 1} · {STEP_KIND_LABELS[step.kind]}
                </span>
                <span className="card-title">{step.title}</span>
              </div>
              <span className={`workspace-pill ${PREVIEW_STEP_STATUS_CLASSES[step.status]}`}>
                {STEP_STATUS_LABELS[step.status]}
              </span>
            </div>
            <div className="card__body">
              <p className="card-copy">{step.detail}</p>
              {step.commandPreview ? (
                <span className="workflow-step-card__command">{step.commandPreview}</span>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className="workflow-run-preview__checks">
        {preview.checks.map((check) => (
          <article className="meta-card" key={check.id}>
            <span className="meta-card__label">{check.label}</span>
            <span className="meta-card__value">{CHECK_STATE_LABELS[check.state]}</span>
            <p className="meta-card__copy">{check.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
