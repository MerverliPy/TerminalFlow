import type { SecretCategory } from "@/lib/auth/auth-types";

export function SecretCategoryCard({ category }: { category: SecretCategory }) {
  return (
    <article className="settings-card">
      <span className="settings-card__label">Credential category</span>
      <span className="settings-card__title">{category.title}</span>
      <p className="card-copy">{category.summary}</p>
      <div className="card-stack">
        <span className="workspace-pill workspace-pill--accent">{category.provider}</span>
        <span className="workspace-pill workspace-pill--warn">{category.scope}</span>
      </div>
    </article>
  );
}
