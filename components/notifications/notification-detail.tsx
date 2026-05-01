import Link from "next/link";

import { AlertReviewPanel } from "@/components/notifications/alert-review-panel";
import { NotificationActivityTimeline } from "@/components/notifications/notification-activity-timeline";
import { NotificationSafetyNote } from "@/components/notifications/notification-safety-note";
import {
  MOCK_ALERT_ACTION_PREVIEWS,
  MOCK_ALERT_REVIEW_ITEMS,
  MOCK_NOTIFICATION_ACTIVITY_EVENTS,
  MOCK_NOTIFICATION_CATEGORIES,
  MOCK_NOTIFICATIONS,
} from "@/lib/domain/mock-data";
import { ROUTES } from "@/lib/navigation/routes";

export function NotificationDetail({ notificationId }: { notificationId: string }) {
  const notification =
    MOCK_NOTIFICATIONS.find((item) => item.id === notificationId) ?? MOCK_NOTIFICATIONS[0];
  const category =
    MOCK_NOTIFICATION_CATEGORIES.find((item) => item.id === notification.categoryId) ??
    MOCK_NOTIFICATION_CATEGORIES[0];
  const reviewItems = MOCK_ALERT_REVIEW_ITEMS.filter(
    (item) => item.notificationId === notification.id,
  );
  const activityEvents = notification.activityEventIds
    .map((eventId) => MOCK_NOTIFICATION_ACTIVITY_EVENTS.find((event) => event.id === eventId))
    .filter((event): event is (typeof MOCK_NOTIFICATION_ACTIVITY_EVENTS)[number] => Boolean(event));

  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Notifications</span>
        <h1 className="surface-heading__title">{notification.title}</h1>
        <p className="surface-heading__copy">
          {category.note} Review the alert metadata and disabled actions below.
        </p>
      </section>

      <Link className="settings-link" href={ROUTES.notifications}>
        Back to notifications
      </Link>

      <AlertReviewPanel
        actions={MOCK_ALERT_ACTION_PREVIEWS}
        notification={notification}
        reviewItems={reviewItems}
      />

      <NotificationActivityTimeline events={activityEvents} />
      <NotificationSafetyNote />
    </main>
  );
}
