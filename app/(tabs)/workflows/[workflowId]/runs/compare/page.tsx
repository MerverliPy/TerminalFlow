import { notFound } from "next/navigation";
import Link from "next/link";

import { SavedSimulationHistory } from "@/components/simulation-replay/saved-simulation-history";
import { MOCK_WORKFLOWS } from "@/lib/domain/mock-data";
import { ROUTES, workflowRunsRoute } from "@/lib/navigation/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return MOCK_WORKFLOWS.map((workflow) => ({ workflowId: workflow.id }));
}

export default async function WorkflowRunComparePage({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) {
  const { workflowId } = await params;
  const workflow = MOCK_WORKFLOWS.find((item) => item.id === workflowId);

  if (!workflow) {
    notFound();
  }

  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Comparison view</span>
        <h1 className="surface-heading__title">{workflow.name}</h1>
        <p className="surface-heading__copy">
          Compare browser-local snapshots and review findings derived from saved simulated runs only.
        </p>
        <div className="workflow-builder__status">
          <Link className="settings-link" href={workflowRunsRoute(workflow.id)}>
            Back to runs
          </Link>
          <Link className="settings-link" href={ROUTES.settings}>
            Open settings
          </Link>
        </div>
      </section>

      <SavedSimulationHistory workflowId={workflow.id} />
    </main>
  );
}
