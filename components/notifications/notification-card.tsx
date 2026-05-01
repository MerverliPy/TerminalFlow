import Link from "next/link";

import { AlertSeverityBadge } from "@/components/notifications/alert-severity-badge";
import { notificationDetailRoute } from "@/lib/navigation/routes";
import type { Notification, NotificationStatus } from "@/lib/domain/types";

const STATUS_CLASSES: Record<NotificationStatus, string> = {
  unread: "workspace-pill--warn",
  read: "workspace-pill--good",
  snoozed: "workspace-pill--accent",
  resolved: "workspace-pill--good",
  archived: "workspace-pill--accent",
};

export function NotificationCard({
  notification,
  categoryTitle,
  active,
}: {
  notification: Notification;
  categoryTitle: string;
  active?: boolean;
}) {
  return (
    <Link
      className={`card card--link notification-card ${notification.status === "unread" ? "notification-card--unread" : ""} ${active ? "notification-card--active" : ""}`}
      href={notificationDetailRoute(notification.id)}
    >
      <div className="card__top">
        <div className="card-kv">
          <span className="card-kv__label">{categoryTitle}</span>
          <span className="card-title">{notification.title}</span>
        </div>
        <AlertSeverityBadge severity={notification.severity} />
      </div>

      <div className="card__body">
        <p className="card-copy">{notification.summary}</p>
        <div className="notification-card__meta">
          <span className={`workspace-pill ${STATUS_CLASSES[notification.status]}`}>
            {notification.status}
          </span>
          <span className="workspace-pill workspace-pill--accent">{notification.sourceLabel}</span>
          {notification.linkedProviderLabel ? (
            <span className="workspace-pill workspace-pill--warn">{notification.linkedProviderLabel}</span>
          ) : null}
        </div>
      </div>

      <div className="card__footer">
        <span className="card-kv__value">{notification.detail}</span>
        <span className="settings-link">Review</span>
      </div>
    </Link>
  );
}
