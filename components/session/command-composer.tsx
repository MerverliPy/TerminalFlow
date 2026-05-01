"use client";

import { useState } from "react";

import { CommandPresetList } from "@/components/session/command-preset-list";
import { CommandSimulationSafetyNote } from "@/components/session/command-simulation-safety-note";
import { SimulatedCommandResultCard } from "@/components/session/simulated-command-result";
import type { TerminalSession } from "@/lib/domain/types";
import {
  getCommandSimulationPresets,
  simulateCommand,
} from "@/lib/simulation/command-simulator";

const COMMAND_PRESETS = getCommandSimulationPresets();

function findMatchingPresetId(command: string) {
  const normalized = command.trim().toLowerCase();

  if (!normalized) {
    return null;
  }

  return COMMAND_PRESETS.find((preset) => preset.command.trim().toLowerCase() === normalized)?.id ?? null;
}

export function CommandComposer({ session }: { session: TerminalSession }) {
  const initialPreset = COMMAND_PRESETS.find((preset) => preset.command === session.commandPreview) ?? null;
  const [command, setCommand] = useState(session.commandPreview || COMMAND_PRESETS[0].command);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(initialPreset?.id ?? null);
  const [results, setResults] = useState<ReturnType<typeof simulateCommand>[]>([]);
  const [submissionCount, setSubmissionCount] = useState(0);

  const handlePresetSelect = (presetId: string) => {
    const preset = COMMAND_PRESETS.find((item) => item.id === presetId);

    if (!preset) {
      return;
    }

    setCommand(preset.command);
    setSelectedPresetId(preset.id);
  };

  const handleInputChange = (value: string) => {
    setCommand(value);
    setSelectedPresetId(findMatchingPresetId(value));
  };

  const handleSubmit = () => {
    const exactPresetId = findMatchingPresetId(command);
    const simulation = simulateCommand(command, {
      id: `sim-${session.id}-${submissionCount + 1}`,
      presetId: exactPresetId ?? selectedPresetId ?? undefined,
    });

    setResults((current) => [simulation, ...current]);
    setSubmissionCount((current) => current + 1);
  };

  const handleReset = () => {
    const resetPreset = COMMAND_PRESETS.find((preset) => preset.command === session.commandPreview) ?? null;
    setCommand(session.commandPreview || COMMAND_PRESETS[0].command);
    setSelectedPresetId(resetPreset?.id ?? null);
  };

  return (
    <section className="shell__section session-panel command-simulation-panel">
      <div className="session-panel__header">
        <span className="section-note">Command simulation</span>
        <span className="workspace-pill workspace-pill--warn">Browser only</span>
      </div>

      <p className="surface-heading__copy">
        Choose an allowlisted mock command or type another command to preview a local-only result.
      </p>

      <label className="composer" htmlFor={`composer-${session.id}`}>
        <span className="composer__label">Command</span>
        <textarea
          id={`composer-${session.id}`}
          className="composer__input"
          value={command}
          placeholder="Type a mock command to preview the simulator."
          rows={4}
          onChange={(event) => handleInputChange(event.target.value)}
        />
      </label>

      <CommandPresetList
        activePresetId={selectedPresetId}
        presets={COMMAND_PRESETS}
        onPresetSelect={(preset) => handlePresetSelect(preset.id)}
      />

      <div className="composer__actions">
        <button className="composer__button composer__button--primary" type="button" onClick={handleSubmit}>
          Simulate command
        </button>
        <button className="composer__button" type="button" onClick={handleReset}>
          Reset preview
        </button>
      </div>

      <CommandSimulationSafetyNote />

      <section className="shell__section command-result-panel">
        <div className="session-panel__header">
          <span className="section-note">Simulated results</span>
          <span className="workspace-pill workspace-pill--accent">{results.length} results</span>
        </div>

        {results.length > 0 ? (
          <div className="command-result-stack">
            {results.map((result) => (
              <SimulatedCommandResultCard key={result.id} result={result} />
            ))}
          </div>
        ) : (
          <article className="meta-card command-result-empty">
            <span className="meta-card__label">No simulation yet</span>
            <span className="meta-card__value">Simulate a preset or typed command to render a local result.</span>
            <p className="meta-card__copy">
              The result stays in browser memory only and never reaches a shell or host.
            </p>
          </article>
        )}
      </section>
    </section>
  );
}
