import { AlertSeverityBadge } from "@/components/notifications/alert-severity-badge";
import { DisabledNotificationActions } from "@/components/notifications/disabled-notification-actions";
import type {
  AlertActionPreview,
  AlertReviewItem,
  Notification,
  NotificationStatus,
} from "@/lib/domain/types";

const STATUS_CLASSES: Record<NotificationStatus, string> = {
  unread: "workspace-pill--warn",
  read: "workspace-pill--good",
  snoozed: "workspace-pill--accent",
  resolved: "workspace-pill--good",
  archived: "workspace-pill--accent",
};

const REVIEW_CLASSES: Record<AlertReviewItem["status"], string> = {
  open: "workspace-pill--warn",
  reviewing: "workspace-pill--accent",
  escalated: "workspace-pill--warn",
  resolved: "workspace-pill--good",
};

export function AlertReviewPanel({
  notification,
  reviewItems,
  actions,
}: {
  notification: Notification;
  reviewItems: AlertReviewItem[];
  actions: AlertActionPreview[];
}) {
  return (
    <section className="shell__section auth-panel notification-detail">
      <div className="session-panel__header">
        <span className="section-note">Alert review</span>
        <span className={`workspace-pill ${STATUS_CLASSES[notification.status]}`}>{notification.status}</span>
      </div>

      <div className="surface-heading">
        <span className="surface-heading__eyebrow">{notification.sourceLabel}</span>
        <h2 className="surface-heading__title">{notification.title}</h2>
        <p className="surface-heading__copy">{notification.detail}</p>
      </div>

      <div className="settings-grid notification-detail__grid">
        <article className="settings-card">
          <span className="settings-card__label">Severity</span>
          <AlertSeverityBadge severity={notification.severity} />
          <p className="card-copy">{notification.summary}</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Source</span>
          <span className="settings-card__title">{notification.source}</span>
          <p className="card-copy">
            {notification.linkedProviderLabel ?? notification.sourceLabel}
          </p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Created</span>
          <span className="settings-card__title">{notification.createdAt}</span>
          <p className="card-copy">Updated {notification.updatedAt}</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Linked metadata</span>
          <span className="settings-card__title">
            {notification.linkedConnectionLabel ?? "Local review only"}
          </span>
          <p className="card-copy">
            {notification.linkedProviderLabel ? `Provider: ${notification.linkedProviderLabel}` : "No provider link"}
          </p>
        </article>
      </div>

      <DisabledNotificationActions actions={actions} />

      <section className="shell__section auth-panel">
        <div className="session-panel__header">
          <span className="section-note">Alert review items</span>
          <span className="workspace-pill workspace-pill--accent">{reviewItems.length} items</span>
        </div>
        <div className="settings-grid">
          {reviewItems.map((item) => (
            <article className="settings-card" key={item.id}>
              <div className="session-panel__header">
                <span className={`workspace-pill ${REVIEW_CLASSES[item.status]}`}>{item.status}</span>
                <AlertSeverityBadge severity={item.severity} />
              </div>
              <span className="settings-card__title">{item.title}</span>
              <p className="card-copy">{item.summary}</p>
              <p className="card-copy">{item.detail}</p>
              <p className="card-copy">{item.recommendation}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
