import type { NotificationActivityEvent } from "@/lib/domain/types";

const EVENT_CLASSES: Record<NotificationActivityEvent["kind"], string> = {
  received: "workspace-pill--accent",
  reviewed: "workspace-pill--good",
  "status-changed": "workspace-pill--warn",
  escalated: "workspace-pill--warn",
  archived: "workspace-pill--accent",
};

export function NotificationActivityTimeline({ events }: { events: NotificationActivityEvent[] }) {
  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Activity timeline</span>
        <span className="workspace-pill workspace-pill--accent">{events.length} local events</span>
      </div>

      <div className="secret-activity-list">
        {events.map((event) => (
          <article className="history-entry" key={event.id}>
            <div className="history-entry__top">
              <div className="card-kv">
                <span className="card-kv__label">{event.time}</span>
                <span className="card-title">{event.title}</span>
              </div>
              <span className={`workspace-pill ${EVENT_CLASSES[event.kind]}`}>{event.kind}</span>
            </div>
            <p className="card-copy">{event.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
