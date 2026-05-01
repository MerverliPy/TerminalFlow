import Link from "next/link";
import { notFound } from "next/navigation";

import { MOCK_WORKFLOWS } from "@/lib/domain/mock-data";
import { workflowDetailRoute, workflowRunsRoute } from "@/lib/navigation/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return MOCK_WORKFLOWS.map((workflow) => ({ workflowId: workflow.id }));
}

export default async function WorkflowPreviewPage({
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
        <span className="surface-heading__eyebrow">Workflow preview</span>
        <h1 className="surface-heading__title">{workflow.name}</h1>
        <p className="surface-heading__copy">
          Static preview from the prior phase. The preview is informational only and does
          not start execution.
        </p>
        <div className="workflow-builder__status">
          <Link className="settings-link" href={workflowDetailRoute(workflow.id)}>
            Open workflow
          </Link>
          <Link className="settings-link" href={workflowRunsRoute(workflow.id)}>
            View run history
          </Link>
        </div>
      </section>

      <section className="shell__section workflow-panel">
        <div className="meta-card">
          <span className="meta-card__label">Preview note</span>
          <span className="meta-card__value">Workflow execution is not active in this phase.</span>
          <p className="meta-card__copy">
            This surface preserves the prior route while the run timeline and execution log
            live on the new phase 06 routes.
          </p>
        </div>
      </section>
    </main>
  );
}
