export function RunSafetyNote() {
  return (
    <aside className="session-safety-note" role="note">
      <span className="session-safety-note__title">Run safety note</span>
      <p className="session-safety-note__copy">
        Run logs and execution state are static in this phase. No workflow execution, streaming, or background job is active yet.
      </p>
    </aside>
  );
}
