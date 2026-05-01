import type {
  SimulatedRunControl,
  SimulatedRunLifecycleStatus,
  SimulatedRunTransition,
} from "@/lib/domain/types";

import { SimulatorStateBadge } from "@/components/execution-simulator/simulator-state-badge";

const CONTROL_HELPERS: Record<SimulatedRunControl["kind"], string> = {
  start: "Start the seeded local run state.",
  pause: "Freeze the current browser-local progress.",
  resume: "Continue from the paused state.",
  cancel: "Stop the mock run locally.",
  retry: "Reload the seeded scenario and try again.",
  "advance-step": "Complete the active step and move forward.",
  reset: "Restore the seeded scenario snapshot.",
};

function isControlEnabled(
  status: SimulatedRunLifecycleStatus,
  control: SimulatedRunControl["kind"],
) {
  switch (control) {
    case "start":
      return status === "idle" || status === "warning";
    case "pause":
      return status === "running" || status === "warning";
    case "resume":
      return status === "paused";
    case "cancel":
      return status === "running" || status === "paused" || status === "warning";
    case "retry":
      return status === "blocked" || status === "failed" || status === "cancelled" || status === "completed";
    case "advance-step":
      return status === "running" || status === "warning";
    case "reset":
      return true;
    default:
      return false;
  }
}

export function SimulatorControlPanel({
  status,
  controls,
  transitions,
  history,
  onControl,
}: {
  status: SimulatedRunLifecycleStatus;
  controls: SimulatedRunControl[];
  transitions: SimulatedRunTransition[];
  history: SimulatedRunTransition[];
  onControl: (control: SimulatedRunControl["kind"]) => void;
}) {
  return (
    <section className="shell__section execution-simulator__panel">
      <div className="session-panel__header">
        <span className="section-note">Simulation controls</span>
        <SimulatorStateBadge status={status} />
      </div>

      <p className="card-copy">
        These controls only mutate browser-local mock state. They do not touch a workflow runner,
        host session, queue, worker, socket, or backend job.
      </p>

      <div className="execution-simulator__control-grid">
        {controls.map((control) => {
          const enabled = isControlEnabled(status, control.kind);

          return (
            <button
              key={control.id}
              type="button"
              className="composer__button composer__button--primary execution-simulator__control-button"
              disabled={!enabled}
              onClick={() => onControl(control.kind)}
            >
              <span className="execution-simulator__control-label">{control.label}</span>
              <span className="execution-simulator__control-detail">{CONTROL_HELPERS[control.kind]}</span>
            </button>
          );
        })}
      </div>

      <div className="execution-simulator__transition-grid">
        <article className="meta-card">
          <span className="meta-card__label">Static transitions</span>
          <span className="meta-card__value">{transitions.length}</span>
          <p className="meta-card__copy">These are seeded from local data and only describe mock lifecycle moves.</p>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Local history</span>
          <span className="meta-card__value">{history.length}</span>
          <p className="meta-card__copy">History grows only when you click a simulator control.</p>
        </article>
      </div>

      <div className="execution-simulator__transition-list">
        {transitions.map((transition) => (
          <article className="execution-simulator__transition" key={transition.id}>
            <div className="card__top">
              <div className="card-kv">
                <span className="card-kv__label">
                  {transition.from} to {transition.to}
                </span>
                <span className="card-title">{transition.label}</span>
              </div>
              <span className="workspace-pill workspace-pill--accent">{transition.kind}</span>
            </div>
            <p className="card-copy">{transition.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
