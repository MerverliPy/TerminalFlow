import { WorkflowBuilderShell } from "@/components/workflows/workflow-builder-shell";
import { WorkflowDisabledActions } from "@/components/workflows/workflow-disabled-actions";
import { WorkflowRunPreview } from "@/components/workflows/workflow-run-preview";
import { WorkflowSafetyNote } from "@/components/workflows/workflow-safety-note";
import { WorkflowStepCard } from "@/components/workflows/workflow-step-card";
import { WorkflowTargetPanel } from "@/components/workflows/workflow-target-panel";
import { WorkflowTriggerPanel } from "@/components/workflows/workflow-trigger-panel";
import { MOCK_WORKFLOWS } from "@/lib/domain/mock-data";

const DRAFT_WORKFLOW = {
  ...MOCK_WORKFLOWS[0]!,
  id: "workflow-draft",
  name: "Untitled workflow",
  description: "Start from a preflight template and tailor the plan for a new workspace flow.",
  state: "draft" as const,
  lastRunAt: "Not run yet",
  trigger: {
    ...MOCK_WORKFLOWS[0]!.trigger,
    label: "Manual trigger",
    detail: "Choose when the workflow should be reviewed. Execution stays inactive.",
  },
  runPreview: {
    ...MOCK_WORKFLOWS[0]!.runPreview,
    status: "inactive" as const,
    summary: "Draft workflow scaffold with editable-looking fields and disabled controls.",
    expectedOutcome: "No execution occurs. The layout simply previews a planned workflow.",
    nextRun: "Not scheduled",
  },
};

export default function NewWorkflowPage() {
  return (
    <WorkflowBuilderShell
      title="New workflow"
      copy="Build a local draft, inspect the target, and preview the run layout before any execution system exists."
      status="Draft template"
      preview={
        <WorkflowRunPreview preview={DRAFT_WORKFLOW.runPreview} activeSteps={DRAFT_WORKFLOW.steps} />
      }
    >
      <section className="workflow-panel">
        <div className="session-panel__header">
          <span className="section-note">Builder</span>
          <span className="workspace-pill workspace-pill--accent">Static draft</span>
        </div>

        <div className="workflow-field-grid">
          <label className="workflow-field workflow-field--wide">
            <span className="workflow-field__label">Workflow name</span>
            <input className="workflow-field__control" defaultValue={DRAFT_WORKFLOW.name} readOnly />
          </label>
          <label className="workflow-field workflow-field--wide">
            <span className="workflow-field__label">Description</span>
            <textarea
              className="workflow-field__control workflow-field__control--textarea"
              defaultValue={DRAFT_WORKFLOW.description}
              readOnly
              rows={4}
            />
          </label>
        </div>
      </section>

      <WorkflowTriggerPanel trigger={DRAFT_WORKFLOW.trigger} />
      <WorkflowTargetPanel target={DRAFT_WORKFLOW.target} />

      <section className="shell__section workflow-panel">
        <div className="session-panel__header">
          <span className="section-note">Steps</span>
          <span className="workspace-pill workspace-pill--warn">Preview only</span>
        </div>
        <div className="workflow-step-stack">
          {DRAFT_WORKFLOW.steps.map((step, index) => (
            <WorkflowStepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </section>

      <WorkflowDisabledActions />
      <WorkflowSafetyNote />
    </WorkflowBuilderShell>
  );
}
