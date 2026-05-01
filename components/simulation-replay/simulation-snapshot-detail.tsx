import type { PersistedSimulationRunSnapshot } from "@/lib/storage/storage-types";

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

export function SimulationSnapshotDetail({ snapshot }: { snapshot: PersistedSimulationRunSnapshot }) {
  return (
    <section className="shell__section simulation-detail-panel">
      <div className="session-panel__header">
        <span className="section-note">Saved snapshot</span>
        <span className={`workspace-pill ${STATUS_CLASSES[snapshot.status]}`}>{snapshot.status}</span>
      </div>

      <div className="card-stack">
        <div className="card__top">
          <div className="card-kv">
            <span className="card-kv__label">{snapshot.source}</span>
            <span className="card-title">{snapshot.workflowName}</span>
          </div>
          <span className="workspace-pill workspace-pill--accent">{snapshot.capturedAt}</span>
        </div>

        <p className="card-copy">{snapshot.note}</p>

        <div className="settings-grid">
          <article className="settings-card">
            <span className="settings-card__label">Trigger</span>
            <span className="settings-card__title">{snapshot.trigger}</span>
            <p className="card-copy">{snapshot.target}</p>
          </article>
          <article className="settings-card">
            <span className="settings-card__label">Workspace root</span>
            <span className="settings-card__title">{snapshot.workspaceRoot}</span>
            <p className="card-copy">{snapshot.targetDetail}</p>
          </article>
          <article className="settings-card">
            <span className="settings-card__label">Duration</span>
            <span className="settings-card__title">{snapshot.duration}</span>
            <p className="card-copy">Stored as local-only snapshot metadata.</p>
          </article>
          <article className="settings-card">
            <span className="settings-card__label">Replay frames</span>
            <span className="settings-card__title">{snapshot.replayFrames.length}</span>
            <p className="card-copy">Ordered frames are rendered from browser-local data.</p>
          </article>
        </div>
      </div>

      <div className="simulation-detail-grid">
        <article className="simulation-detail-block">
          <div className="session-panel__header">
            <span className="section-note">Steps</span>
            <span className="workspace-pill workspace-pill--accent">{snapshot.steps.length}</span>
          </div>
          <div className="simulation-detail-list">
            {snapshot.steps.map((step, index) => (
              <article className="run-log-viewer__entry" key={step.id}>
                <div className="run-log-viewer__top">
                  <div className="card-kv">
                    <span className="card-kv__label">
                      Step {index + 1} · {step.kind}
                    </span>
                    <span className="run-log-viewer__message">{step.title}</span>
                  </div>
                  <span className="workspace-pill workspace-pill--accent">{step.status}</span>
                </div>
                <div className="run-log-viewer__meta">
                  <span className="run-log-viewer__stream">Started {step.startedAt}</span>
                  <span className="run-log-viewer__stream">Finished {step.finishedAt}</span>
                  <span className="run-log-viewer__stream">Progress {step.progress}%</span>
                </div>
                <p className="card-copy">{step.detail}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="simulation-detail-block">
          <div className="session-panel__header">
            <span className="section-note">Logs</span>
            <span className="workspace-pill workspace-pill--warn">{snapshot.logs.length}</span>
          </div>
          <div className="simulation-detail-list">
            {snapshot.logs.map((log) => (
              <article className="run-log-viewer__entry" key={log.id}>
                <div className="run-log-viewer__top">
                  <div className="card-kv">
                    <span className="card-kv__label">{log.time}</span>
                    <span className="run-log-viewer__message">{log.message}</span>
                  </div>
                  <span className="workspace-pill workspace-pill--accent">{log.level}</span>
                </div>
                <div className="run-log-viewer__meta">
                  <span className="run-log-viewer__stream">{log.stream}</span>
                  {log.stepId ? <span className="run-log-viewer__stream">Step ref {log.stepId}</span> : null}
                </div>
              </article>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
