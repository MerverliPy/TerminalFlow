import type { TerminalSession } from "@/lib/domain/types";

const SESSION_LABELS: Record<TerminalSession["state"], string> = {
  running: "Running",
  idle: "Idle",
  paused: "Paused",
};

export function SessionCard({ session }: { session: TerminalSession }) {
  return (
    <article className="card">
      <div className="card__top">
        <div className="card-kv">
          <span className="card-kv__label">Session</span>
          <span className="card-title">{session.title}</span>
        </div>
        <span
          className={`workspace-pill ${
            session.state === "running"
              ? "workspace-pill--good"
              : session.state === "paused"
                ? "workspace-pill--warn"
                : "workspace-pill--accent"
          }`}
        >
          {SESSION_LABELS[session.state]}
        </span>
      </div>

      <div className="card__body">
        <div className="card-kv">
          <span className="card-kv__label">Command</span>
          <span className="card-kv__value">{session.commandPreview}</span>
        </div>
        <div className="card-kv">
          <span className="card-kv__label">Working directory</span>
          <span className="card-kv__value">{session.cwd}</span>
        </div>
        <p className="card-copy">{session.outputPreview}</p>
      </div>

      <div className="card__footer">
        <span className="card-meta">Started {session.startedAt}</span>
        <span className="workspace-pill">Host: {session.hostId}</span>
      </div>
    </article>
  );
}
