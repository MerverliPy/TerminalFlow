import Link from "next/link";

import { WorkflowCard } from "@/components/cards/workflow-card";
import { MOCK_WORKFLOWS } from "@/lib/domain/mock-data";
import { workflowNewRoute } from "@/lib/navigation/routes";

export default function WorkflowsPage() {
  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Workflows</span>
        <h1 className="surface-heading__title">Workflow builder and preview</h1>
        <p className="surface-heading__copy">
          Workflows are static planning surfaces only. This phase lets you
          inspect triggers, targets, steps, and previews without wiring a real
          runner or execution backend.
        </p>
        <Link className="settings-link" href={workflowNewRoute()}>
          Create workflow
        </Link>
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
