import Link from "next/link";
import { notFound } from "next/navigation";

import { RunCard } from "@/components/runs/run-card";
import { MOCK_WORKFLOWS, MOCK_WORKFLOW_RUNS } from "@/lib/domain/mock-data";
import { ROUTES, workflowDetailRoute } from "@/lib/navigation/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return MOCK_WORKFLOWS.map((workflow) => ({ workflowId: workflow.id }));
}

export default async function WorkflowRunHistoryPage({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) {
  const { workflowId } = await params;
  const workflow = MOCK_WORKFLOWS.find((item) => item.id === workflowId);

  if (!workflow) {
    notFound();
  }

  const runs = MOCK_WORKFLOW_RUNS.filter((run) => run.workflowId === workflow.id);

  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Run history</span>
        <h1 className="surface-heading__title">{workflow.name}</h1>
        <p className="surface-heading__copy">
          Static workflow runs only. Open a run to inspect the timeline, log viewer, and
          disabled run controls.
        </p>
        <div className="workflow-builder__status">
          <Link className="settings-link" href={ROUTES.workflows}>
            Back to workflows
          </Link>
          <Link className="settings-link" href={workflowDetailRoute(workflow.id)}>
            Open workflow
          </Link>
        </div>
      </section>

      <section className="shell__section run-panel">
        <div className="session-panel__header">
          <span className="section-note">Runs</span>
          <span className="workspace-pill workspace-pill--accent">{runs.length} runs</span>
        </div>

        <div className="card-grid">
          {runs.map((run) => (
            <RunCard key={run.id} run={run} />
          ))}
        </div>
      </section>
    </main>
  );
}
