export function HostDisabledActions() {
  return (
    <section className="shell__section host-panel">
      <div className="session-panel__header">
        <span className="section-note">Actions</span>
        <span className="workspace-pill workspace-pill--warn">Simulated only</span>
      </div>

      <p className="surface-heading__copy">
        Connect, test connection, and save credential actions render as UI only.
        They do not perform any real host operation in this phase.
      </p>

      <div className="composer__actions">
        <button className="composer__button composer__button--primary" disabled type="button">
          Connect host
        </button>
        <button className="composer__button" disabled type="button">
          Test connection
        </button>
        <button className="composer__button" disabled type="button">
          Save credentials
        </button>
      </div>

      <p className="composer__hint">
        Real host pairing is not active yet. No credentials are stored, sent, or
        persisted.
      </p>
    </section>
  );
}
