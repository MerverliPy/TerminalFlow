import type { PersistedSimulationRunSnapshot } from "@/lib/storage/storage-types";

const SOURCE_LABELS: Record<PersistedSimulationRunSnapshot["source"], string> = {
  "workflow-run": "Workflow run",
  simulator: "Simulator",
  "manual-save": "Manual save",
  "settings-restore": "Settings restore",
};

const STATUS_CLASSES: Record<PersistedSimulationRunSnapshot["status"], string> = {
  idle: "workspace-pill--accent",
  running: "workspace-pill--good",
  paused: "workspace-pill--warn",
  warning: "workspace-pill--warn",
  blocked: "workspace-pill--blocked",
  failed: "workspace-pill--warn",
  cancelled: "workspace-pill--warn",
  completed: "workspace-pill--good",
};

export function SavedSimulationCard({
  snapshot,
  selected,
  onSelect,
}: {
  snapshot: PersistedSimulationRunSnapshot;
  selected: boolean;
  onSelect: (snapshotId: string) => void;
}) {
  return (
    <button
      type="button"
      className={`card card--link execution-simulator__scenario ${selected ? "execution-simulator__scenario--selected" : ""}`}
      onClick={() => onSelect(snapshot.id)}
      aria-pressed={selected}
    >
      <div className="card__top">
        <div className="card-kv">
          <span className="card-kv__label">{SOURCE_LABELS[snapshot.source]}</span>
          <span className="card-title">{snapshot.workflowName}</span>
        </div>
        <span className={`workspace-pill ${STATUS_CLASSES[snapshot.status]}`}>{snapshot.status}</span>
      </div>

      <div className="card__body">
        <p className="card-copy">{snapshot.summary}</p>
        <div className="execution-simulator__scenario-meta">
          <span className="workspace-pill workspace-pill--accent">{snapshot.steps.length} steps</span>
          <span className="workspace-pill workspace-pill--warn">{snapshot.logs.length} logs</span>
          <span className="workspace-pill workspace-pill--good">{snapshot.replayFrames.length} frames</span>
        </div>
      </div>

      <div className="card__footer">
        <span className="card-meta">{snapshot.capturedAt}</span>
        <span className="settings-link">{selected ? "Selected" : "Inspect snapshot"}</span>
      </div>
    </button>
  );
}
