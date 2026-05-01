"use client";

import type { SimulatedCommandPreset } from "@/lib/domain/types";

const PRESET_STATUS_LABELS: Record<SimulatedCommandPreset["status"], string> = {
  completed: "Allowed",
  warning: "Preview warning",
  blocked: "Blocked",
  failed: "Failed",
};

const PRESET_STATUS_CLASSES: Record<SimulatedCommandPreset["status"], string> = {
  completed: "workspace-pill--good",
  warning: "workspace-pill--warn",
  blocked: "workspace-pill--warn",
  failed: "workspace-pill--accent",
};

export function CommandPresetList({
  presets,
  activePresetId,
  onPresetSelect,
}: {
  presets: SimulatedCommandPreset[];
  activePresetId: string | null;
  onPresetSelect: (preset: SimulatedCommandPreset) => void;
}) {
  return (
    <section className="shell__section session-panel command-preset-panel">
      <div className="session-panel__header">
        <span className="section-note">Allowlisted presets</span>
        <span className="workspace-pill workspace-pill--accent">{presets.length} presets</span>
      </div>

      <div className="command-preset-list">
        {presets.map((preset) => {
          const isActive = activePresetId === preset.id;

          return (
            <button
              aria-pressed={isActive}
              className={`command-preset ${isActive ? "command-preset--active" : ""}`}
              key={preset.id}
              type="button"
              onClick={() => onPresetSelect(preset)}
            >
              <div className="command-preset__top">
                <div className="card-kv">
                  <span className="card-kv__label">{preset.label}</span>
                  <span className="card-kv__value">{preset.command}</span>
                </div>
                <span className={`workspace-pill ${PRESET_STATUS_CLASSES[preset.status]}`}>
                  {PRESET_STATUS_LABELS[preset.status]}
                </span>
              </div>

              <p className="card-copy">{preset.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
