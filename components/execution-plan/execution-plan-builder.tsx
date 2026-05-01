import type {
  DryRunFinding,
  DryRunSummary,
  ExecutionPlanActionPreview,
  ExecutionPlanMapping,
  LocalExecutionPlan,
  LocalExecutionPlanDependency,
  LocalExecutionPlanStep,
} from "@/lib/domain/types";

import { ExecutionPlanStepCard } from "@/components/execution-plan/execution-plan-step-card";

const PLAN_STATUS_CLASSES: Record<LocalExecutionPlan["status"], string> = {
  draft: "workspace-pill--accent",
  ready: "workspace-pill--good",
  blocked: "workspace-pill--warn",
};

const PLAN_STATUS_LABELS: Record<LocalExecutionPlan["status"], string> = {
  draft: "Draft",
  ready: "Ready",
  blocked: "Blocked",
};

const RISK_CLASSES: Record<LocalExecutionPlan["riskLevel"], string> = {
  low: "workspace-pill--good",
  medium: "workspace-pill--warn",
  high: "workspace-pill--blocked",
};

export function ExecutionPlanBuilder({
  plan,
  summary,
  steps,
  mappings,
  dependencies,
  findings,
}: {
  plan: LocalExecutionPlan;
  summary: DryRunSummary;
  steps: LocalExecutionPlanStep[];
  mappings: ExecutionPlanMapping[];
  dependencies: LocalExecutionPlanDependency[];
  findings: DryRunFinding[];
}) {
  return (
    <section className="shell__section workflow-panel">
      <div className="card-stack">
        <div className="card__top">
          <span className="section-note">Execution plan builder</span>
          <div className="workflow-builder__status">
            <span className={`workspace-pill ${PLAN_STATUS_CLASSES[plan.status]}`}>
              {PLAN_STATUS_LABELS[plan.status]}
            </span>
            <span className={`workspace-pill ${RISK_CLASSES[plan.riskLevel]}`}>
              {plan.riskLevel} risk
            </span>
          </div>
        </div>

        <p className="card-copy">{plan.summary}</p>

        <div className="workflow-field-grid">
          <article className="meta-card">
            <span className="meta-card__label">Estimated duration</span>
            <span className="meta-card__value">{summary.estimatedDuration}</span>
            <p className="meta-card__copy">Sourced from the static dry-run summary.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Plan note</span>
            <span className="meta-card__value">{plan.title}</span>
            <p className="meta-card__copy">{plan.note}</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Step count</span>
            <span className="meta-card__value">{steps.length}</span>
            <p className="meta-card__copy">Every step is sourced from local static data.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Mapping count</span>
            <span className="meta-card__value">{mappings.length}</span>
            <p className="meta-card__copy">Workflow, host, session, and command records stay local.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Ordering links</span>
            <span className="meta-card__value">{dependencies.length}</span>
            <p className="meta-card__copy">The dependency graph is preview-only.</p>
          </article>
          <article className="meta-card">
            <span className="meta-card__label">Dry-run findings</span>
            <span className="meta-card__value">{findings.length}</span>
            <p className="meta-card__copy">Findings remain review-only and non-operational.</p>
          </article>
        </div>

        <div className="preflight-checklist__checks">
          {steps.map((step) => (
            <ExecutionPlanStepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
