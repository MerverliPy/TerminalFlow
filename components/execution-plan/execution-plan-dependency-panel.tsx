import type { LocalExecutionPlanDependency, LocalExecutionPlanStep } from "@/lib/domain/types";

export function ExecutionPlanDependencyPanel({
  dependencies,
  steps,
}: {
  dependencies: LocalExecutionPlanDependency[];
  steps: LocalExecutionPlanStep[];
}) {
  const stepById = new Map(steps.map((step) => [step.id, step]));

  return (
    <section className="shell__section">
      <div className="card-stack">
        <div className="card__top">
          <span className="section-note">Dependency ordering preview</span>
          <span className="workspace-pill workspace-pill--accent">{dependencies.length} links</span>
        </div>

        <div className="preflight-finding-grid">
          {dependencies.map((dependency) => {
            const fromStep = stepById.get(dependency.fromStepId);
            const toStep = stepById.get(dependency.toStepId);

            return (
              <article className="settings-card" key={dependency.id}>
                <div className="session-panel__header">
                  <span className="settings-card__label">
                    Order {dependency.order} · {dependency.kind}
                  </span>
                  <span className="workspace-pill workspace-pill--accent">
                    {fromStep?.order ?? "?"} → {toStep?.order ?? "?"}
                  </span>
                </div>
                <span className="settings-card__title">{dependency.label}</span>
                <p className="card-copy">{dependency.detail}</p>
                <div className="preflight-check-category__meta">
                  <span className="preflight-check-category__meta-item">
                    From: {fromStep?.title ?? dependency.fromStepId}
                  </span>
                  <span className="preflight-check-category__meta-item">
                    To: {toStep?.title ?? dependency.toStepId}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
