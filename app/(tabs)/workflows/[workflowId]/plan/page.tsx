import Link from "next/link";
import { notFound } from "next/navigation";

import { DryRunSummaryPanel } from "@/components/execution-plan/dry-run-summary";
import { DisabledExecutionPlanActions } from "@/components/execution-plan/disabled-execution-plan-actions";
import { ExecutionPlanBuilder } from "@/components/execution-plan/execution-plan-builder";
import { ExecutionPlanDependencyPanel } from "@/components/execution-plan/execution-plan-dependency-panel";
import { ExecutionPlanMappingPanel } from "@/components/execution-plan/execution-plan-mapping-panel";
import { ExecutionPlanRiskPanel } from "@/components/execution-plan/execution-plan-risk-panel";
import { ExecutionPlanSafetyNote } from "@/components/execution-plan/execution-plan-safety-note";
import {
  MOCK_DRY_RUN_FINDINGS,
  MOCK_DRY_RUN_SUMMARIES,
  MOCK_EXECUTION_PLAN_ACTION_PREVIEWS,
  MOCK_EXECUTION_PLAN_MAPPINGS,
  MOCK_LOCAL_EXECUTION_PLAN_STEPS,
  MOCK_LOCAL_EXECUTION_PLAN_DEPENDENCIES,
  MOCK_LOCAL_EXECUTION_PLANS,
  MOCK_WORKFLOW_RUNS,
  MOCK_WORKFLOWS,
} from "@/lib/domain/mock-data";
import {
  ROUTES,
  workflowDetailRoute,
  workflowPreflightRoute,
  workflowRunDetailRoute,
  workflowRunsRoute,
} from "@/lib/navigation/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return MOCK_WORKFLOWS.map((workflow) => ({ workflowId: workflow.id }));
}

export default async function WorkflowPlanPage({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) {
  const { workflowId } = await params;
  const workflow = MOCK_WORKFLOWS.find((item) => item.id === workflowId);
  const plan = MOCK_LOCAL_EXECUTION_PLANS.find((item) => item.workflowId === workflowId);
  const run = MOCK_WORKFLOW_RUNS.find((item) => item.workflowId === workflowId);

  if (!workflow || !plan) {
    notFound();
  }

  const summary = MOCK_DRY_RUN_SUMMARIES.find((item) => item.id === plan.dryRunSummaryId);

  if (!summary) {
    notFound();
  }

  const steps = MOCK_LOCAL_EXECUTION_PLAN_STEPS.filter((step) => step.planId === plan.id);
  const mappings = MOCK_EXECUTION_PLAN_MAPPINGS.filter((mapping) => mapping.planId === plan.id);
  const dependencies = MOCK_LOCAL_EXECUTION_PLAN_DEPENDENCIES.filter(
    (dependency) => dependency.planId === plan.id,
  );
  const findings = MOCK_DRY_RUN_FINDINGS.filter((finding) => finding.planId === plan.id);
  const actions = MOCK_EXECUTION_PLAN_ACTION_PREVIEWS.filter((action) =>
    summary.actionPreviewIds.includes(action.id),
  );

  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Execution plan</span>
        <h1 className="surface-heading__title">{plan.title}</h1>
        <p className="surface-heading__copy">
          Local execution-plan builder and dry-run summary for {workflow.name}. The route is inspectable only and never reaches a real execution system.
        </p>
        <div className="workflow-builder__status">
          <Link className="settings-link" href={ROUTES.workflows}>
            Back to workflows
          </Link>
          <Link className="settings-link" href={workflowDetailRoute(workflow.id)}>
            Open workflow
          </Link>
          <Link className="settings-link" href={workflowPreflightRoute(workflow.id)}>
            Open preflight
          </Link>
          <Link className="settings-link" href={workflowRunsRoute(workflow.id)}>
            View run history
          </Link>
          {run ? (
            <Link className="settings-link" href={workflowRunDetailRoute(workflow.id, run.id)}>
              Open simulator
            </Link>
          ) : null}
        </div>
      </section>

      <ExecutionPlanBuilder
        plan={plan}
        summary={summary}
        steps={steps}
        mappings={mappings}
        dependencies={dependencies}
        findings={findings}
      />

      <DryRunSummaryPanel summary={summary} />
      <ExecutionPlanMappingPanel mappings={mappings} />
      <ExecutionPlanRiskPanel findings={findings} summary={summary} />
      <ExecutionPlanDependencyPanel dependencies={dependencies} steps={steps} />
      <DisabledExecutionPlanActions actions={actions} />
      <ExecutionPlanSafetyNote />
    </main>
  );
}
