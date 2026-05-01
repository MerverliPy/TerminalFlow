import type { LocalAuditCategorySummary } from "@/lib/domain/types";

export function AuditCategoryCard({ category }: { category: LocalAuditCategorySummary }) {
  return (
    <article className="settings-card">
      <span className="settings-card__label">{category.category}</span>
      <span className="settings-card__title">{category.title}</span>
      <p className="card-copy">{category.summary}</p>
      <span className="workspace-pill workspace-pill--accent">{category.count} events</span>
    </article>
  );
}
