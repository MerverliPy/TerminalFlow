"use client";

import { useState } from "react";

import type {
  LocalExecutionSimulator as LocalExecutionSimulatorModel,
  SimulatedRunControlKind,
} from "@/lib/domain/types";
import {
  applySimulatorControl,
  createSimulatorState,
  getSimulatorProgress,
  getSimulatorScenario,
  resetSimulatorState,
} from "@/lib/simulation/execution-simulator";

import { SimulatorControlPanel } from "@/components/execution-simulator/simulator-control-panel";
import { SimulatorLogStream } from "@/components/execution-simulator/simulator-log-stream";
import { SimulatorSafetyNote } from "@/components/execution-simulator/simulator-safety-note";
import { SimulatorScenarioCard } from "@/components/execution-simulator/simulator-scenario-card";
import { SimulatorStateBadge } from "@/components/execution-simulator/simulator-state-badge";
import { SimulatorStepProgress } from "@/components/execution-simulator/simulator-step-progress";

const SAFETY_CLASSES = {
  info: "workspace-pill--accent",
  warn: "workspace-pill--warn",
  blocked: "workspace-pill--blocked",
} as const;

export function LocalExecutionSimulator({
  simulator,
  initialScenarioId,
}: {
  simulator: LocalExecutionSimulatorModel;
  initialScenarioId?: string;
}) {
  const initialScenario = getSimulatorScenario(
    simulator,
    initialScenarioId ?? simulator.scenarios[0]?.id ?? "",
  );
  const [selectedScenarioId, setSelectedScenarioId] = useState(initialScenario.id);
  const [state, setState] = useState(() => createSimulatorState(initialScenario));

  const selectedScenario = getSimulatorScenario(simulator, selectedScenarioId);
  const progress = getSimulatorProgress(state.steps);

  function selectScenario(scenarioId: string) {
    const scenario = getSimulatorScenario(simulator, scenarioId);
    setSelectedScenarioId(scenario.id);
    setState(resetSimulatorState(simulator, scenario.id));
  }

  function handleControl(control: SimulatedRunControlKind) {
    setState((current) => applySimulatorControl(simulator, current, control));
  }

  return (
    <section id="local-execution-simulator" className="shell__section execution-simulator">
      <div className="card-stack">
        <div className="card__top">
          <div className="card-kv">
            <span className="section-note">{simulator.title}</span>
            <span className="card-title">Controlled local run state UI</span>
          </div>
          <SimulatorStateBadge status={state.lifecycleStatus} />
        </div>

        <p className="card-copy">{simulator.summary}</p>
        <p className="card-copy">{simulator.note}</p>

        <div className="execution-simulator__summary-grid">
          <article className="meta-card">
            <span className="meta-card__label">Scenario</span>
            <span className="meta-card__value">{selectedScenario.title}</span>
            <p className="meta-card__copy">{selectedScenario.summary}</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Lifecycle</span>
            <span className="meta-card__value">{state.lifecycleStatus}</span>
            <p className="meta-card__copy">Local state only. No external execution path is attached.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Step progress</span>
            <span className="meta-card__value">{progress}%</span>
            <p className="meta-card__copy">Progress is computed from browser-local step state.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Logs</span>
            <span className="meta-card__value">{state.logs.length}</span>
            <p className="meta-card__copy">Log append behavior stays local to this page.</p>
          </article>
        </div>
      </div>

      <div className="execution-simulator__scenario-grid">
        {simulator.scenarios.map((scenario) => (
          <SimulatorScenarioCard
            key={scenario.id}
            scenario={scenario}
            selected={scenario.id === selectedScenarioId}
            onSelect={selectScenario}
          />
        ))}
      </div>

      <div className="execution-simulator__layout">
        <SimulatorControlPanel
          status={state.lifecycleStatus}
          controls={simulator.controls}
          transitions={selectedScenario.transitions}
          history={state.transitionHistory}
          onControl={handleControl}
        />

        <SimulatorStepProgress steps={state.steps} progress={progress} />
      </div>

      <SimulatorLogStream entries={state.logs} />

      <section className="shell__section execution-simulator__panel">
        <div className="session-panel__header">
          <span className="section-note">Safety findings</span>
          <span className="workspace-pill workspace-pill--accent">{selectedScenario.safetyFindings.length} findings</span>
        </div>
        <div className="preflight-finding-grid">
          {selectedScenario.safetyFindings.map((finding) => (
            <article className="preflight-finding-card" key={finding.id}>
              <div className="card__top">
                <span className="card-title">{finding.title}</span>
                <span className={`workspace-pill ${SAFETY_CLASSES[finding.severity]}`}>{finding.severity}</span>
              </div>
              <p className="card-copy">{finding.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <SimulatorSafetyNote />
    </section>
  );
}
