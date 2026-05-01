import type {
  ExecutionPreflightCheck,
  ExecutionPreflightCheckCategory,
} from "@/lib/domain/types";

import { PreflightCheckCard } from "@/components/preflight/preflight-check-card";
import { PreflightStatusBadge } from "@/components/preflight/preflight-status-badge";

export function PreflightChecklist({
  categories,
  checks,
}: {
  categories: ExecutionPreflightCheckCategory[];
  checks: ExecutionPreflightCheck[];
}) {
  return (
    <section className="shell__section">
      <div className="card-stack">
        <div className="card__top">
          <span className="section-note">Preflight checklist</span>
          <span className="workspace-pill workspace-pill--accent">{checks.length} checks</span>
        </div>

        <div className="preflight-checklist">
          {categories.map((category) => {
            const categoryChecks = checks.filter((check) => check.categoryId === category.id);

            return (
              <article className="card preflight-check-category" key={category.id}>
                <div className="card__top">
                  <div className="card__body">
                    <span className="card-kv__label">{category.kind} gate</span>
                    <span className="card-title">{category.title}</span>
                  </div>
                  <PreflightStatusBadge status={category.status} />
                </div>

                <p className="card-copy">{category.summary}</p>

                <div className="preflight-check-category__meta">
                  <span className="preflight-check-category__meta-item">
                    {category.checkIds.length} checks
                  </span>
                  <span className="preflight-check-category__meta-item">
                    {category.note}
                  </span>
                </div>

                <div className="preflight-checklist__checks">
                  {categoryChecks.map((check) => (
                    <PreflightCheckCard key={check.id} check={check} />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
