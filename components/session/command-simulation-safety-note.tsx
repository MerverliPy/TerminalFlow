export function CommandSimulationSafetyNote() {
  return (
    <aside className="session-safety-note" role="note">
      <span className="session-safety-note__title">Command simulation note</span>
      <p className="session-safety-note__copy">
        Command simulation is local-only in this phase. No shell, host, workflow, or background job execution occurs.
      </p>
    </aside>
  );
}
