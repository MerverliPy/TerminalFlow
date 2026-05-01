import Link from "next/link";
import { notFound } from "next/navigation";

import { MOCK_WORKFLOWS, MOCK_WORKFLOW_RUNS } from "@/lib/domain/mock-data";
import {
  ROUTES,
  workflowRunsRoute,
} from "@/lib/navigation/routes";

const WORKFLOW_STATE_LABELS = {
  ready: "Ready",
  draft: "Draft",
  blocked: "Blocked",
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return MOCK_WORKFLOWS.map((workflow) => ({ workflowId: workflow.id }));
}

export default async function WorkflowDetailPage({
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
  const latestRun = runs[0];

  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Workflow</span>
        <h1 className="surface-heading__title">{workflow.name}</h1>
        <p className="surface-heading__copy">
          Static workflow summary for planning and preview only. Use the run history to inspect
          a mock execution timeline and log surface.
        </p>
        <div className="workflow-builder__status">
          <Link className="settings-link" href={ROUTES.workflows}>
            Back to workflows
          </Link>
          <Link className="settings-link" href={workflowRunsRoute(workflow.id)}>
            View run history
          </Link>
        </div>
      </section>

      <section className="shell__section workflow-panel">
        <div className="session-panel__header">
          <span className="section-note">Overview</span>
          <span className="workspace-pill workspace-pill--accent">
            {WORKFLOW_STATE_LABELS[workflow.state as keyof typeof WORKFLOW_STATE_LABELS]}
          </span>
        </div>

        <div className="workflow-field-grid">
          <article className="meta-card">
            <span className="meta-card__label">Trigger</span>
            <span className="meta-card__value">{workflow.trigger}</span>
            <p className="meta-card__copy">Static product vocabulary only.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Project</span>
            <span className="meta-card__value">{workflow.projectId}</span>
            <p className="meta-card__copy">Target mapping is represented in the run history.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Last run</span>
            <span className="meta-card__value">{workflow.lastRunAt}</span>
            <p className="meta-card__copy">Latest static run: {latestRun ? latestRun.id : "none"}</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Run count</span>
            <span className="meta-card__value">{runs.length}</span>
            <p className="meta-card__copy">All run data is local and static.</p>
          </article>
        </div>
      </section>

      <section className="shell__section run-panel">
        <div className="session-panel__header">
          <span className="section-note">Recent run</span>
          <Link className="workflow-card__link" href={workflowRunsRoute(workflow.id)}>
            Open history
          </Link>
        </div>

        {latestRun ? (
          <article className="meta-card">
            <span className="meta-card__label">{latestRun.startTime}</span>
            <span className="meta-card__value">{latestRun.summary}</span>
            <p className="meta-card__copy">
              Status {latestRun.status} · duration {latestRun.duration} · safety {latestRun.safetyState}
            </p>
          </article>
        ) : (
          <article className="meta-card">
            <span className="meta-card__label">No runs</span>
            <span className="meta-card__value">This workflow has no static runs yet.</span>
          </article>
        )}
      </section>
    </main>
  );
}
