import type { SimulatedRunScenario } from "@/lib/domain/types";

import { SimulatorStateBadge } from "@/components/execution-simulator/simulator-state-badge";

export function SimulatorScenarioCard({
  scenario,
  selected,
  onSelect,
}: {
  scenario: SimulatedRunScenario;
  selected: boolean;
  onSelect: (scenarioId: string) => void;
}) {
  return (
    <button
      type="button"
      className={`card card--link execution-simulator__scenario ${selected ? "execution-simulator__scenario--selected" : ""}`}
      onClick={() => onSelect(scenario.id)}
      aria-pressed={selected}
    >
      <div className="card__top">
        <div className="card-kv">
          <span className="card-kv__label">Scenario</span>
          <span className="card-title">{scenario.title}</span>
        </div>
        <SimulatorStateBadge status={scenario.lifecycleStatus} />
      </div>

      <div className="card__body">
        <p className="card-copy">{scenario.summary}</p>
        <div className="execution-simulator__scenario-meta">
          <span className="workspace-pill workspace-pill--accent">{scenario.steps.length} steps</span>
          <span className="workspace-pill workspace-pill--warn">{scenario.safetyState}</span>
          {scenario.blockedReason ? <span className="workspace-pill workspace-pill--blocked">Blocked</span> : null}
        </div>
      </div>

      <div className="card__footer">
        <span className="card-meta">{scenario.note}</span>
        <span className="settings-link">{selected ? "Selected" : "Load scenario"}</span>
      </div>
    </button>
  );
}
