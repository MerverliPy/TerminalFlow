import Link from "next/link";

import type { TerminalSession } from "@/lib/domain/types";
import { sessionDetailRoute } from "@/lib/navigation/routes";

const SESSION_LABELS: Record<TerminalSession["state"], string> = {
  running: "Running",
  idle: "Idle",
  paused: "Paused",
};

export function SessionCard({ session }: { session: TerminalSession }) {
  return (
    <Link
      href={sessionDetailRoute(session.id)}
      className="card card--link"
      aria-label={`Open session details for ${session.title}`}
    >
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
    </Link>
  );
}
