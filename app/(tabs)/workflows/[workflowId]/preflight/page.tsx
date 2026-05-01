import Link from "next/link";
import { notFound } from "next/navigation";

import { ExecutionReadinessGate } from "@/components/preflight/execution-readiness-gate";
import {
  MOCK_EXECUTION_APPROVAL_PREVIEW,
  MOCK_EXECUTION_GATE_ACTION_PREVIEWS,
  MOCK_EXECUTION_PREFLIGHT_CHECKS,
  MOCK_EXECUTION_PREFLIGHT_CHECK_CATEGORIES,
  MOCK_EXECUTION_PREFLIGHT_FINDINGS,
  MOCK_EXECUTION_PREFLIGHT_GATES,
  MOCK_EXECUTION_READINESS_SNAPSHOT,
  MOCK_WORKFLOWS,
} from "@/lib/domain/mock-data";
import {
  ROUTES,
  workflowDetailRoute,
  workflowRunsRoute,
} from "@/lib/navigation/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return MOCK_WORKFLOWS.map((workflow) => ({ workflowId: workflow.id }));
}

export default async function WorkflowPreflightPage({
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
        <span className="surface-heading__eyebrow">Execution preflight</span>
        <h1 className="surface-heading__title">{workflow.name}</h1>
        <p className="surface-heading__copy">
          Review the local-only execution readiness gate before any workflow run is started. This surface is static, inspectable, and intentionally non-operational.
        </p>
        <div className="workflow-builder__status">
          <Link className="settings-link" href={ROUTES.workflows}>
            Back to workflows
          </Link>
          <Link className="settings-link" href={workflowDetailRoute(workflow.id)}>
            Open workflow
          </Link>
          <Link className="settings-link" href={workflowRunsRoute(workflow.id)}>
            View run history
          </Link>
        </div>
      </section>

      <ExecutionReadinessGate
        snapshot={MOCK_EXECUTION_READINESS_SNAPSHOT}
        gates={MOCK_EXECUTION_PREFLIGHT_GATES}
        categories={MOCK_EXECUTION_PREFLIGHT_CHECK_CATEGORIES}
        checks={MOCK_EXECUTION_PREFLIGHT_CHECKS}
        findings={MOCK_EXECUTION_PREFLIGHT_FINDINGS}
        approvalPreview={MOCK_EXECUTION_APPROVAL_PREVIEW}
        actions={MOCK_EXECUTION_GATE_ACTION_PREVIEWS}
      />
    </main>
  );
}
