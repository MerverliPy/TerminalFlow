export function DisabledAccessActions() {
  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Access actions</span>
        <span className="workspace-pill workspace-pill--warn">Simulated only</span>
      </div>

      <p className="surface-heading__copy">
        Invite, remove, and change-role controls render for review but remain disabled in this phase.
      </p>

      <div className="composer__actions">
        <button className="composer__button composer__button--primary" type="button" disabled>
          Invite member
        </button>
        <button className="composer__button" type="button" disabled>
          Change role
        </button>
        <button className="composer__button" type="button" disabled>
          Remove member
        </button>
      </div>
    </section>
  );
}
