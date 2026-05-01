import type { IntegrationActivityEvent } from "@/lib/domain/types";

const EVENT_TONE_CLASSES: Record<IntegrationActivityEvent["kind"], string> = {
  review: "workspace-pill--accent",
  scope: "workspace-pill--warn",
  status: "workspace-pill--good",
  sync: "workspace-pill--accent",
  policy: "workspace-pill--warn",
};

export function IntegrationActivityList({ events }: { events: IntegrationActivityEvent[] }) {
  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Integration activity</span>
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
              <span className={`workspace-pill ${EVENT_TONE_CLASSES[event.kind]}`}>{event.kind}</span>
            </div>
            <p className="card-copy">{event.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
