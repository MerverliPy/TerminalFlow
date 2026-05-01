import { WorkflowCard } from "@/components/cards/workflow-card";
import { MOCK_WORKFLOWS } from "@/lib/domain/mock-data";

export default function WorkflowsPage() {
  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Workflows</span>
        <h1 className="surface-heading__title">Workflow cards</h1>
        <p className="surface-heading__copy">
          Workflows are only represented as static product vocabulary here.
          They show how repeatable actions can be organized before any runner or
          automation layer exists.
        </p>
      </section>

      <section className="shell__section">
        <div className="card-grid">
          {MOCK_WORKFLOWS.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </section>
    </main>
  );
}
