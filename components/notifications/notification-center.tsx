import Link from "next/link";

import { AlertReviewPanel } from "@/components/notifications/alert-review-panel";
import { NotificationActivityTimeline } from "@/components/notifications/notification-activity-timeline";
import { NotificationCard } from "@/components/notifications/notification-card";
import { NotificationCategoryCard } from "@/components/notifications/notification-category-card";
import { NotificationSafetyNote } from "@/components/notifications/notification-safety-note";
import {
  MOCK_ALERT_ACTION_PREVIEWS,
  MOCK_ALERT_REVIEW_ITEMS,
  MOCK_NOTIFICATION_ACTIVITY_EVENTS,
  MOCK_NOTIFICATION_CATEGORIES,
  MOCK_NOTIFICATION_PREFERENCE_PREVIEWS,
  MOCK_NOTIFICATIONS,
  MOCK_WORKSPACES,
} from "@/lib/domain/mock-data";
import { notificationDetailRoute } from "@/lib/navigation/routes";

export function NotificationCenter() {
  const workspace = MOCK_WORKSPACES[0];
  const notifications = MOCK_NOTIFICATIONS;
  const activeNotification =
    notifications.find((item) => item.status === "unread") ?? notifications[0];
  const categoryCountById = Object.fromEntries(
    MOCK_NOTIFICATION_CATEGORIES.map((category) => [
      category.id,
      notifications.filter((notification) => notification.categoryId === category.id).length,
    ]),
  ) as Record<string, number>;
  const unreadCountById = Object.fromEntries(
    MOCK_NOTIFICATION_CATEGORIES.map((category) => [
      category.id,
      notifications.filter(
        (notification) =>
          notification.categoryId === category.id && notification.status === "unread",
      ).length,
    ]),
  ) as Record<string, number>;
  const reviewItems = MOCK_ALERT_REVIEW_ITEMS.filter(
    (item) => item.notificationId === activeNotification.id,
  );
  const activityEvents = activeNotification.activityEventIds
    .map((eventId) => MOCK_NOTIFICATION_ACTIVITY_EVENTS.find((event) => event.id === eventId))
    .filter((event): event is (typeof MOCK_NOTIFICATION_ACTIVITY_EVENTS)[number] => Boolean(event));

  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Notifications</span>
        <h1 className="surface-heading__title">Local notification center for {workspace.name}</h1>
        <p className="surface-heading__copy">
          Review local alerts, severity markers, unread states, and integration-linked metadata
          without any real delivery or backend ingestion.
        </p>
      </section>

      <NotificationSafetyNote />

      <section className="shell__section auth-panel">
        <div className="session-panel__header">
          <span className="section-note">Summary</span>
          <span className="workspace-pill workspace-pill--accent">{notifications.length} local items</span>
        </div>
        <div className="settings-grid">
          <article className="settings-card">
            <span className="settings-card__label">Unread</span>
            <span className="settings-card__title">
              {notifications.filter((notification) => notification.status === "unread").length}
            </span>
            <p className="card-copy">Unread state is visual-only metadata.</p>
          </article>
          <article className="settings-card">
            <span className="settings-card__label">Review items</span>
            <span className="settings-card__title">{MOCK_ALERT_REVIEW_ITEMS.length}</span>
            <p className="card-copy">Alert review items are local records only.</p>
          </article>
          <article className="settings-card">
            <span className="settings-card__label">Preferences</span>
            <span className="settings-card__title">{MOCK_NOTIFICATION_PREFERENCE_PREVIEWS.length}</span>
            <p className="card-copy">Preference previews stay in the UI as metadata.</p>
          </article>
        </div>
      </section>

      <section className="shell__section auth-panel">
        <div className="session-panel__header">
          <span className="section-note">Notification categories</span>
          <span className="workspace-pill workspace-pill--accent">
            {MOCK_NOTIFICATION_CATEGORIES.length} categories
          </span>
        </div>
        <div className="settings-grid">
          {MOCK_NOTIFICATION_CATEGORIES.map((category) => (
            <NotificationCategoryCard
              key={category.id}
              category={category}
              totalCount={categoryCountById[category.id] ?? 0}
              unreadCount={unreadCountById[category.id] ?? 0}
            />
          ))}
        </div>
      </section>

      <section className="shell__section auth-panel">
        <div className="session-panel__header">
          <span className="section-note">Notification center</span>
          <span className="workspace-pill workspace-pill--accent">{notifications.length} cards</span>
        </div>
        <div className="settings-grid">
          {notifications.map((notification) => (
            <NotificationCard
              active={notification.id === activeNotification.id}
              categoryTitle={
                MOCK_NOTIFICATION_CATEGORIES.find((category) => category.id === notification.categoryId)
                  ?.title ?? notification.categoryId
              }
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
        <Link className="settings-link" href={notificationDetailRoute(activeNotification.id)}>
          Review active notification surface
        </Link>
      </section>

      <AlertReviewPanel
        actions={MOCK_ALERT_ACTION_PREVIEWS}
        notification={activeNotification}
        reviewItems={reviewItems}
      />

      <NotificationActivityTimeline events={activityEvents} />
      <NotificationSafetyNote />
    </main>
  );
}
