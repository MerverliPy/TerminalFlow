import type { CommandEntry, CommandStatus } from "@/lib/domain/types";

const COMMAND_STATUS_LABELS: Record<CommandStatus, string> = {
  completed: "Completed",
  queued: "Queued",
  draft: "Draft",
  blocked: "Blocked",
};

export function SessionCommandHistory({
  entries,
}: {
  entries: CommandEntry[];
}) {
  return (
    <section className="shell__section session-panel">
      <div className="session-panel__header">
        <span className="section-note">Command history</span>
        <span className="workspace-pill workspace-pill--accent">
          {entries.length} entries
        </span>
      </div>

      <div className="session-history">
        {entries.map((entry) => (
          <article className="history-entry" key={entry.id}>
            <div className="history-entry__top">
              <div className="card-kv">
                <span className="card-kv__label">{entry.timestamp}</span>
                <span className="card-kv__value">{entry.command}</span>
              </div>
              <span
                className={`workspace-pill ${
                  entry.status === "completed"
                    ? "workspace-pill--good"
                    : entry.status === "blocked"
                      ? "workspace-pill--warn"
                      : "workspace-pill--accent"
                }`}
              >
                {COMMAND_STATUS_LABELS[entry.status]}
              </span>
            </div>

            <div className="card-stack">
              <span className="history-entry__cwd">{entry.cwd}</span>
              <p className="card-copy">{entry.output}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
