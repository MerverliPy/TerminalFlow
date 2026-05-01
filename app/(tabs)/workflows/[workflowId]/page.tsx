import Link from "next/link";
import { notFound } from "next/navigation";

import { WorkflowBuilderShell } from "@/components/workflows/workflow-builder-shell";
import { WorkflowDisabledActions } from "@/components/workflows/workflow-disabled-actions";
import { WorkflowRunPreview } from "@/components/workflows/workflow-run-preview";
import { WorkflowSafetyNote } from "@/components/workflows/workflow-safety-note";
import { WorkflowStepCard } from "@/components/workflows/workflow-step-card";
import { WorkflowTargetPanel } from "@/components/workflows/workflow-target-panel";
import { WorkflowTriggerPanel } from "@/components/workflows/workflow-trigger-panel";
import { MOCK_WORKFLOWS } from "@/lib/domain/mock-data";
import { ROUTES, workflowPreviewRoute } from "@/lib/navigation/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return MOCK_WORKFLOWS.map((workflow) => ({ workflowId: workflow.id }));
}

export default function WorkflowDetailPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const workflow = MOCK_WORKFLOWS.find(({ id }) => id === params.workflowId);

  if (!workflow) {
    notFound();
  }

  return (
    <WorkflowBuilderShell
      title={workflow.name}
      copy={workflow.description}
      status={workflow.state}
      preview={
        <WorkflowRunPreview preview={workflow.runPreview} activeSteps={workflow.runPreview.steps} />
      }
    >
      <section className="workflow-panel">
        <div className="session-panel__header">
          <Link className="session-detail-header__back" href={ROUTES.workflows}>
            Back to Workflows
          </Link>
          <Link className="workflow-card__link" href={workflowPreviewRoute(workflow.id)}>
            Open run preview
          </Link>
        </div>

        <div className="workflow-field-grid">
          <article className="meta-card">
            <span className="meta-card__label">Project</span>
            <span className="meta-card__value">{workflow.target.projectName}</span>
            <p className="meta-card__copy">{workflow.target.detail}</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Last run</span>
            <span className="meta-card__value">{workflow.lastRunAt}</span>
            <p className="meta-card__copy">Run state is a static preview only.</p>
          </article>
        </div>
      </section>

      <WorkflowTriggerPanel trigger={workflow.trigger} />
      <WorkflowTargetPanel target={workflow.target} />

      <section className="shell__section workflow-panel">
        <div className="session-panel__header">
          <span className="section-note">Steps</span>
          <span className="workspace-pill workspace-pill--accent">{workflow.steps.length} step plan</span>
        </div>
        <div className="workflow-step-stack">
          {workflow.steps.map((step, index) => (
            <WorkflowStepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </section>

      <section className="shell__section workflow-panel">
        <div className="session-panel__header">
          <span className="section-note">Safety checks</span>
          <span className="workspace-pill workspace-pill--warn">Execution inactive</span>
        </div>
        <div className="workflow-run-preview__checks">
          {workflow.safetyChecks.map((check) => (
            <article className="meta-card" key={check.id}>
              <span className="meta-card__label">{check.label}</span>
              <span className="meta-card__value">{check.state}</span>
              <p className="meta-card__copy">{check.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <WorkflowDisabledActions />
      <WorkflowSafetyNote />
    </WorkflowBuilderShell>
  );
}
