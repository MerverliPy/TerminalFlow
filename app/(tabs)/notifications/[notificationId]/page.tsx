import { notFound } from "next/navigation";

import { NotificationDetail } from "@/components/notifications/notification-detail";
import { MOCK_NOTIFICATIONS } from "@/lib/domain/mock-data";

export default async function NotificationDetailPage({
  params,
}: {
  params: Promise<{ notificationId: string }>;
}) {
  const { notificationId } = await params;

  const notificationExists = MOCK_NOTIFICATIONS.some(
    (notification) => notification.id === notificationId,
  );

  if (!notificationExists) {
    notFound();
  }

  return <NotificationDetail notificationId={notificationId} />;
}
