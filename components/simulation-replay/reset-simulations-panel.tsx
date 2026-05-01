export function ResetSimulationsPanel({
  onClear,
  onRestore,
  lastAction,
}: {
  onClear: () => void;
  onRestore: () => void;
  lastAction: string;
}) {
  return (
    <section className="shell__section simulation-reset-panel">
      <div className="session-panel__header">
        <span className="section-note">Saved simulations</span>
        <span className="workspace-pill workspace-pill--warn">Local only</span>
      </div>

      <p className="card-copy">
        Clear and restore actions only change browser-local simulation storage. They do not affect any backend database, queue, or runtime.
      </p>

      <div className="composer__actions simulation-replay-panel__actions">
        <button className="composer__button composer__button--primary" type="button" onClick={onRestore}>
          Restore seeded simulations
        </button>
        <button className="composer__button" type="button" onClick={onClear}>
          Clear saved simulations
        </button>
      </div>

      <p className="composer__hint">{lastAction}</p>
    </section>
  );
}
