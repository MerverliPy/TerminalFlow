import Link from "next/link";

import { MOCK_WORKFLOWS } from "@/lib/domain/mock-data";
import { workflowDetailRoute } from "@/lib/navigation/routes";

export default function NewWorkflowPage() {
  const template = MOCK_WORKFLOWS[0];

  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Workflows</span>
        <h1 className="surface-heading__title">Static workflow builder</h1>
        <p className="surface-heading__copy">
          This route remains available as a static builder surface from the prior phase.
          Workflow execution is not active here.
        </p>
      </section>

      <section className="shell__section workflow-panel">
        <div className="session-panel__header">
          <span className="section-note">Template</span>
          <span className="workspace-pill workspace-pill--accent">{template?.name}</span>
        </div>

        <div className="workflow-field-grid">
          <article className="meta-card">
            <span className="meta-card__label">Draft name</span>
            <span className="meta-card__value">Untitled workflow</span>
            <p className="meta-card__copy">Static-only planning surface.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Primary actions</span>
            <span className="meta-card__value">Run, save, schedule, deploy</span>
            <p className="meta-card__copy">All actions are disabled in this phase.</p>
          </article>
        </div>

        <div className="composer__actions run-actions">
          <button className="composer__button composer__button--primary" disabled type="button">
            Save draft
          </button>
          <button className="composer__button" disabled type="button">
            Schedule
          </button>
          <button className="composer__button" disabled type="button">
            Deploy
          </button>
        </div>

        <Link className="settings-link" href={workflowDetailRoute(template?.id ?? "workflow-check")}>
          Open template workflow
        </Link>
      </section>
    </main>
  );
}
