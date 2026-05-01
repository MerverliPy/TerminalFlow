import type { SimulatedCommandResult } from "@/lib/domain/types";

const RESULT_STATUS_LABELS: Record<SimulatedCommandResult["status"], string> = {
  completed: "Completed",
  warning: "Warning",
  blocked: "Blocked",
  failed: "Failed",
};

const RESULT_STATUS_CLASSES: Record<SimulatedCommandResult["status"], string> = {
  completed: "workspace-pill--good",
  warning: "workspace-pill--warn",
  blocked: "workspace-pill--warn",
  failed: "workspace-pill--accent",
};

export function SimulatedCommandResultCard({
  result,
}: {
  result: SimulatedCommandResult;
}) {
  return (
    <article className="sim-result" aria-live="polite">
      <div className="sim-result__top">
        <div className="card-kv">
          <span className="card-kv__label">
            {result.presetLabel ? result.presetLabel : "Manual mock command"}
          </span>
          <span className="card-kv__value">{result.command}</span>
        </div>
        <span className={`workspace-pill ${RESULT_STATUS_CLASSES[result.status]}`}>
          {RESULT_STATUS_LABELS[result.status]}
        </span>
      </div>

      <div className="sim-result__meta">
        <span className="sim-result__meta-chip">Mode {result.mode}</span>
        <span className="sim-result__meta-chip">
          Exit code {result.exitCode === null ? "—" : result.exitCode}
        </span>
        <span className="sim-result__meta-chip">Duration {result.duration}</span>
      </div>

      <p className="card-copy">{result.summary}</p>

      <aside className="session-safety-note sim-result__safety" role="note">
        <span className="session-safety-note__title">{result.safetyCheck.label}</span>
        <p className="session-safety-note__copy">{result.safetyCheck.detail}</p>
      </aside>

      {result.status === "blocked" ? (
        <p className="sim-result__blocked">
          {result.blockedReason ?? "The command is blocked by the local phase guard."}
        </p>
      ) : (
        <div className="sim-result__outputs">
          <section className="sim-output">
            <span className="sim-output__label">STDOUT</span>
            <pre className="sim-output__body">
              {result.output.stdout.length > 0
                ? result.output.stdout.join("\n")
                : "No stdout captured."}
            </pre>
          </section>
          <section className="sim-output">
            <span className="sim-output__label">STDERR</span>
            <pre className="sim-output__body">
              {result.output.stderr.length > 0
                ? result.output.stderr.join("\n")
                : "No stderr captured."}
            </pre>
          </section>
        </div>
      )}
    </article>
  );
}
