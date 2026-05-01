import type { WorkflowRunLogEntry } from "@/lib/domain/types";

const LOG_LEVEL_LABELS: Record<WorkflowRunLogEntry["level"], string> = {
  stdout: "STDOUT",
  stderr: "STDERR",
  info: "Info",
  warn: "Warn",
  error: "Error",
};

const LOG_LEVEL_CLASSES: Record<WorkflowRunLogEntry["level"], string> = {
  stdout: "workspace-pill--good",
  stderr: "workspace-pill--warn",
  info: "workspace-pill--accent",
  warn: "workspace-pill--warn",
  error: "workspace-pill--warn",
};

export function RunLogViewer({ entries }: { entries: WorkflowRunLogEntry[] }) {
  return (
    <section className="shell__section run-panel">
      <div className="session-panel__header">
        <span className="section-note">Execution log</span>
        <span className="workspace-pill workspace-pill--warn">{entries.length} entries</span>
      </div>

      <div className="run-log-viewer">
        {entries.map((entry) => (
          <article className="run-log-viewer__entry" key={entry.id}>
            <div className="run-log-viewer__top">
              <div className="card-kv">
                <span className="card-kv__label">{entry.time}</span>
                <span className="run-log-viewer__message">{entry.message}</span>
              </div>
              <span className={`workspace-pill ${LOG_LEVEL_CLASSES[entry.level]}`}>
                {LOG_LEVEL_LABELS[entry.level]}
              </span>
            </div>
            <div className="run-log-viewer__meta">
              <span className="run-log-viewer__stream">{entry.stream}</span>
              {entry.stepId ? <span className="run-log-viewer__stream">Step ref {entry.stepId}</span> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
