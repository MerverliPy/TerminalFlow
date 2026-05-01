export function PermissionsSafetyNote() {
  return (
    <aside className="session-safety-note" role="note">
      <span className="session-safety-note__title">Permissions note</span>
      <p className="session-safety-note__copy">
        Workspace permissions are mocked locally in this phase. No real authorization, invite, role change, or member removal is active.
      </p>
    </aside>
  );
}
