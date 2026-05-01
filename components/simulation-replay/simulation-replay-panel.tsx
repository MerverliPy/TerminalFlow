import { useEffect, useState } from "react";

import type {
  PersistedSimulationRunSnapshot,
  SimulationReplaySession,
} from "@/lib/storage/storage-types";

const SESSION_STATUS_LABELS: Record<SimulationReplaySession["status"], string> = {
  idle: "Idle",
  ready: "Ready",
  playing: "Playing",
  paused: "Paused",
  completed: "Completed",
};

const SESSION_STATUS_CLASSES: Record<SimulationReplaySession["status"], string> = {
  idle: "workspace-pill--accent",
  ready: "workspace-pill--accent",
  playing: "workspace-pill--good",
  paused: "workspace-pill--warn",
  completed: "workspace-pill--good",
};

export function SimulationReplayPanel({
  snapshot,
  session,
  onSessionChange,
}: {
  snapshot: PersistedSimulationRunSnapshot;
  session: SimulationReplaySession;
  onSessionChange: (session: SimulationReplaySession) => void;
}) {
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(session.currentFrameIndex);

  const frame = snapshot.replayFrames[selectedFrameIndex] ?? snapshot.replayFrames[0];

  useEffect(() => {
    setSelectedFrameIndex(session.currentFrameIndex);
  }, [session.currentFrameIndex, session.snapshotId]);

  function updateSession(nextSession: SimulationReplaySession) {
    onSessionChange(nextSession);
    setSelectedFrameIndex(nextSession.currentFrameIndex);
  }

  function handleAdvanceFrame() {
    const nextIndex = Math.min(selectedFrameIndex + 1, snapshot.replayFrames.length - 1);
    updateSession({
      ...session,
      status: nextIndex === snapshot.replayFrames.length - 1 ? "completed" : "playing",
      currentFrameIndex: nextIndex,
      updatedAt: new Date().toISOString(),
      note: "Replay advanced through the browser-local frame list.",
    });
  }

  function handleReplayFromStart() {
    updateSession({
      ...session,
      status: "playing",
      currentFrameIndex: 0,
      updatedAt: new Date().toISOString(),
      note: "Replay restarted from the first local frame.",
    });
  }

  function handlePauseReplay() {
    updateSession({
      ...session,
      status: "paused",
      updatedAt: new Date().toISOString(),
      note: "Replay paused locally without any backend side effect.",
    });
  }

  return (
    <section className="shell__section simulation-replay-panel">
      <div className="session-panel__header">
        <span className="section-note">Replay</span>
        <span className={`workspace-pill ${SESSION_STATUS_CLASSES[session.status]}`}>
          {SESSION_STATUS_LABELS[session.status]}
        </span>
      </div>

      <p className="card-copy">
        Replay frames are ordered from local snapshot data. Advancing, pausing, or restarting only updates browser-local storage and UI state.
      </p>

      <div className="composer__actions simulation-replay-panel__actions">
        <button className="composer__button composer__button--primary" type="button" onClick={handleReplayFromStart}>
          Replay from start
        </button>
        <button className="composer__button" type="button" onClick={handleAdvanceFrame}>
          Advance frame
        </button>
        <button className="composer__button" type="button" onClick={handlePauseReplay}>
          Pause replay
        </button>
      </div>

      <div className="settings-grid">
        <article className="settings-card">
          <span className="settings-card__label">Current frame</span>
          <span className="settings-card__title">
            {frame ? `${frame.order}. ${frame.title}` : "No frames"}
          </span>
          <p className="card-copy">{frame?.detail ?? "No frame data is available for this snapshot."}</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Session note</span>
          <span className="settings-card__title">{session.note}</span>
          <p className="card-copy">Last updated {session.updatedAt}</p>
        </article>
      </div>

      <div className="settings-grid simulation-action-preview-grid">
        {session.actionPreviews.map((preview) => (
          <article className="settings-card" key={preview.id}>
            <span className="settings-card__label">{preview.kind}</span>
            <span className="settings-card__title">{preview.label}</span>
            <p className="card-copy">{preview.detail}</p>
            <span className="workspace-pill workspace-pill--accent">{preview.mode}</span>
          </article>
        ))}
      </div>

      <div className="simulation-replay-panel__frames">
        {snapshot.replayFrames.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`simulation-replay-panel__frame ${index === selectedFrameIndex ? "simulation-replay-panel__frame--active" : ""}`}
            onClick={() => {
              const nextSession = {
                ...session,
                currentFrameIndex: index,
                updatedAt: new Date().toISOString(),
                note: "Selected a local replay frame.",
              };
              updateSession(nextSession);
            }}
          >
            <div className="card__top">
              <div className="card-kv">
                <span className="card-kv__label">Frame {item.order}</span>
                <span className="card-title">{item.title}</span>
              </div>
              <span className="workspace-pill workspace-pill--accent">{item.progress}%</span>
            </div>
            <p className="card-copy">{item.detail}</p>
            <div className="run-log-viewer__meta">
              <span className="run-log-viewer__stream">{item.status}</span>
              {item.stepId ? <span className="run-log-viewer__stream">Step ref {item.stepId}</span> : null}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
