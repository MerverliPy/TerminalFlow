import type { IntegrationProviderCategory } from "@/lib/domain/types";

export function IntegrationCategoryCard({
  category,
  providerCount,
}: {
  category: IntegrationProviderCategory;
  providerCount: number;
}) {
  return (
    <article className="settings-card">
      <span className="settings-card__label">Integration category</span>
      <span className="settings-card__title">{category.title}</span>
      <p className="card-copy">{category.summary}</p>
      <div className="card-stack">
        <span className="workspace-pill workspace-pill--accent">{providerCount} providers</span>
        <span className="workspace-pill workspace-pill--warn">{category.note}</span>
      </div>
    </article>
  );
}
