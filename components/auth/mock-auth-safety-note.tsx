export function MockAuthSafetyNote() {
  return (
    <aside className="session-safety-note" role="note">
      <span className="session-safety-note__title">Auth boundary note</span>
      <p className="session-safety-note__copy">
        Authentication and workspace membership are mocked locally in this phase. No OAuth, backend session, database user, token, or secret is active.
      </p>
    </aside>
  );
}
