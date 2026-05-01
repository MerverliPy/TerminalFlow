export function PreflightSafetyNote() {
  return (
    <section className="preflight-safety-note" aria-label="Execution preflight safety note">
      <span className="session-safety-note__title">Execution preflight safety note</span>
      <p className="session-safety-note__copy">
        Execution preflight gates are mocked locally in this phase. No real approvals, backend checks, command execution, workflow runs, queues, workers, or host access are active.
      </p>
      <p className="session-safety-note__copy">
        All gate states, findings, summaries, and action previews come from static local records only.
      </p>
    </section>
  );
}
