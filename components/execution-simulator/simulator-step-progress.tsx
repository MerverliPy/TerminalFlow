import type { SimulatedRunStep } from "@/lib/domain/types";

const STEP_KIND_LABELS: Record<SimulatedRunStep["kind"], string> = {
  check: "Check",
  command: "Command",
  decision: "Decision",
  handoff: "Handoff",
};

const STEP_STATUS_LABELS: Record<SimulatedRunStep["status"], string> = {
  queued: "Queued",
  running: "Running",
  completed: "Completed",
  blocked: "Blocked",
  cancelled: "Cancelled",
};

const STEP_STATUS_CLASSES: Record<SimulatedRunStep["status"], string> = {
  queued: "workspace-pill--accent",
  running: "workspace-pill--good",
  completed: "workspace-pill--good",
  blocked: "workspace-pill--blocked",
  cancelled: "workspace-pill--warn",
};

export function SimulatorStepProgress({
  steps,
  progress,
}: {
  steps: SimulatedRunStep[];
  progress: number;
}) {
  return (
    <section className="shell__section execution-simulator__panel">
      <div className="session-panel__header">
        <span className="section-note">Step progress</span>
        <span className="workspace-pill workspace-pill--accent">{progress}% complete</span>
      </div>

      <div className="execution-simulator__step-stack">
        {steps.map((step, index) => (
          <article className="execution-simulator__step" key={step.id}>
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

            <div className="execution-simulator__progress-track" aria-hidden="true">
              <span className="execution-simulator__progress-fill" style={{ width: `${step.progress}%` }} />
            </div>

            <div className="card__body">
              <p className="card-copy">{step.detail}</p>
              <div className="execution-simulator__step-meta">
                <span className="card-meta">Started {step.startedAt}</span>
                <span className="card-meta">Finished {step.finishedAt}</span>
                <span className="card-meta">Duration {step.duration}</span>
                <span className="card-meta">Progress {step.progress}%</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
