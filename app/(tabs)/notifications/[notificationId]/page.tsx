import { notFound } from "next/navigation";

import { NotificationDetail } from "@/components/notifications/notification-detail";
import { MOCK_NOTIFICATIONS } from "@/lib/domain/mock-data";

export default function NotificationDetailPage({
  params,
}: {
  params: { notificationId: string };
}) {
  const notificationExists = MOCK_NOTIFICATIONS.some(
    (notification) => notification.id === params.notificationId,
  );

  if (!notificationExists) {
    notFound();
  }

  return <NotificationDetail notificationId={params.notificationId} />;
}
