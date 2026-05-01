export function DisabledSecretActions() {
  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Vault actions</span>
        <span className="workspace-pill workspace-pill--warn">Simulated only</span>
      </div>

      <p className="surface-heading__copy">
        Add, edit, delete, reveal, copy, and rotate controls are shown for review but remain disabled in this phase.
      </p>

      <div className="composer__actions secret-actions-grid">
        <button className="composer__button composer__button--primary" type="button" disabled>
          Add secret
        </button>
        <button className="composer__button" type="button" disabled>
          Edit secret
        </button>
        <button className="composer__button" type="button" disabled>
          Delete secret
        </button>
        <button className="composer__button" type="button" disabled>
          Reveal value
        </button>
        <button className="composer__button" type="button" disabled>
          Copy value
        </button>
        <button className="composer__button" type="button" disabled>
          Rotate secret
        </button>
      </div>
    </section>
  );
}
