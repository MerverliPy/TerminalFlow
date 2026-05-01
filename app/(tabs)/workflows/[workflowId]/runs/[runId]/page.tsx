import { notFound } from "next/navigation";

import { LocalExecutionSimulator } from "@/components/execution-simulator/local-execution-simulator";
import { RunDetailHeader } from "@/components/runs/run-detail-header";
import { RunDisabledActions } from "@/components/runs/run-disabled-actions";
import { RunLogViewer } from "@/components/runs/run-log-viewer";
import { RunSafetyNote } from "@/components/runs/run-safety-note";
import { RunStepPanel } from "@/components/runs/run-step-panel";
import { RunTimeline } from "@/components/runs/run-timeline";
import { MOCK_LOCAL_EXECUTION_SIMULATOR, MOCK_WORKFLOW_RUNS } from "@/lib/domain/mock-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return MOCK_WORKFLOW_RUNS.map((run) => ({
    workflowId: run.workflowId,
    runId: run.id,
  }));
}

export default async function WorkflowRunDetailPage({
  params,
}: {
  params: Promise<{ workflowId: string; runId: string }>;
}) {
  const { workflowId, runId } = await params;
  const run = MOCK_WORKFLOW_RUNS.find(
    (item) => item.workflowId === workflowId && item.id === runId,
  );

  if (!run) {
    notFound();
  }

  const simulatorScenarioId =
    run.status === "completed"
      ? "scenario-completed"
      : run.status === "blocked"
        ? "scenario-blocked"
        : run.status === "failed"
          ? "scenario-failed"
          : "scenario-warning";

  return (
    <main className="shell__panel run-shell">
      <RunDetailHeader run={run} />

      <section className="run-main-grid">
        <RunTimeline items={run.timeline} />
        <RunLogViewer entries={run.logs} />
      </section>

      <section className="shell__section run-panel">
        <div className="session-panel__header">
          <span className="section-note">Step panels</span>
          <span className="workspace-pill workspace-pill--accent">{run.steps.length} steps</span>
        </div>
        <div className="workflow-step-stack">
          {run.steps.map((step, index) => (
            <RunStepPanel key={step.id} step={step} index={index} />
          ))}
        </div>
      </section>

      <LocalExecutionSimulator
        simulator={MOCK_LOCAL_EXECUTION_SIMULATOR}
        initialScenarioId={simulatorScenarioId}
      />

      <RunDisabledActions />
      <RunSafetyNote />
    </main>
  );
}
