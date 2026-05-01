export function LocalDataSafetyNote() {
  return (
    <aside className="session-safety-note" role="note">
      <span className="session-safety-note__title">Local storage note</span>
      <p className="session-safety-note__copy">
        Local storage is used only on this device in this phase. No cloud sync, backend database, secrets, or remote execution data is active.
      </p>
    </aside>
  );
}
