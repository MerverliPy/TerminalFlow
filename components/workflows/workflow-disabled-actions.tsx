export function WorkflowDisabledActions() {
  return (
    <section className="shell__section workflow-panel">
      <div className="session-panel__header">
        <span className="section-note">Actions</span>
        <span className="workspace-pill workspace-pill--warn">Simulated only</span>
      </div>

      <p className="surface-heading__copy">
        Run, save, schedule, and deploy controls render for planning only. They
        are disabled and do not trigger any workflow behavior.
      </p>

      <div className="composer__actions workflow-actions">
        <button className="composer__button composer__button--primary" disabled type="button">
          Run workflow
        </button>
        <button className="composer__button" disabled type="button">
          Save draft
        </button>
        <button className="composer__button" disabled type="button">
          Schedule run
        </button>
        <button className="composer__button" disabled type="button">
          Deploy workflow
        </button>
      </div>

      <p className="composer__hint">
        Workflow execution is not active in this phase. No run, save, schedule,
        deploy, or queue action is performed.
      </p>
    </section>
  );
}
