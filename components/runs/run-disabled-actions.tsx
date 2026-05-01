export function RunDisabledActions() {
  return (
    <section className="shell__section run-panel">
      <div className="session-panel__header">
        <span className="section-note">Actions</span>
        <span className="workspace-pill workspace-pill--warn">Simulated only</span>
      </div>

      <p className="surface-heading__copy">
        Retry, cancel, rerun, resume, and download log controls render for review only.
        They do not touch execution state.
      </p>

      <div className="composer__actions run-actions">
        <button className="composer__button composer__button--primary" disabled type="button">
          Retry
        </button>
        <button className="composer__button" disabled type="button">
          Cancel
        </button>
        <button className="composer__button" disabled type="button">
          Rerun
        </button>
        <button className="composer__button" disabled type="button">
          Resume
        </button>
        <button className="composer__button" disabled type="button">
          Download log
        </button>
      </div>
    </section>
  );
}
