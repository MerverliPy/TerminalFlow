export function SessionSafetyNote() {
  return (
    <aside className="session-safety-note" role="note">
      <span className="session-safety-note__title">Safety note</span>
      <p className="session-safety-note__copy">
        The session detail surface is static. No command is executed, streamed,
        or persisted from this phase.
      </p>
    </aside>
  );
}
