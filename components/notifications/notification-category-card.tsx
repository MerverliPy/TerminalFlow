import type { NotificationCategory } from "@/lib/domain/types";

export function NotificationCategoryCard({
  category,
  totalCount,
  unreadCount,
}: {
  category: NotificationCategory;
  totalCount: number;
  unreadCount: number;
}) {
  return (
    <article className="settings-card">
      <span className="settings-card__label">{category.source} source</span>
      <span className="settings-card__title">{category.title}</span>
      <p className="card-copy">{category.summary}</p>
      <div className="card-stack">
        <span className="workspace-pill workspace-pill--accent">{totalCount} items</span>
        <span className="workspace-pill workspace-pill--warn">{unreadCount} unread</span>
        <span className="card-copy">{category.note}</span>
      </div>
    </article>
  );
}
