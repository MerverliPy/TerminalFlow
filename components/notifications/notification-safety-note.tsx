export function NotificationSafetyNote() {
  return (
    <aside className="integration-note" role="note">
      <span className="session-safety-note__title">Notification boundary</span>
      <p className="session-safety-note__copy">
        Notifications and alerts are mocked locally in this phase. No webhooks, push delivery,
        email, provider sync, background jobs, or backend event ingestion are active.
      </p>
    </aside>
  );
}
