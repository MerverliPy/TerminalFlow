import Link from "next/link";
import { notFound } from "next/navigation";

import { WorkflowDisabledActions } from "@/components/workflows/workflow-disabled-actions";
import { WorkflowRunPreview } from "@/components/workflows/workflow-run-preview";
import { WorkflowSafetyNote } from "@/components/workflows/workflow-safety-note";
import { MOCK_WORKFLOWS } from "@/lib/domain/mock-data";
import { ROUTES } from "@/lib/navigation/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return MOCK_WORKFLOWS.map((workflow) => ({ workflowId: workflow.id }));
}

export default function WorkflowPreviewPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const workflow = MOCK_WORKFLOWS.find(({ id }) => id === params.workflowId);

  if (!workflow) {
    notFound();
  }

  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Workflow preview</span>
        <h1 className="surface-heading__title">{workflow.name}</h1>
        <p className="surface-heading__copy">{workflow.description}</p>
        <div className="workflow-builder__status">
          <Link className="settings-link" href={`${ROUTES.workflows}/${workflow.id}`}>
            Back to builder
          </Link>
        </div>
      </section>

      <WorkflowRunPreview preview={workflow.runPreview} activeSteps={workflow.runPreview.steps} />
      <WorkflowDisabledActions />
      <WorkflowSafetyNote />
    </main>
  );
}
