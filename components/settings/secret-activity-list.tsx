import type { SecretActivityEvent } from "@/lib/auth/auth-types";

const EVENT_CLASSES: Record<SecretActivityEvent["kind"], string> = {
  review: "workspace-pill--accent",
  policy: "workspace-pill--good",
  redaction: "workspace-pill--warn",
  rotation: "workspace-pill--accent",
};

export function SecretActivityList({ events }: { events: SecretActivityEvent[] }) {
  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Vault activity</span>
        <span className="workspace-pill workspace-pill--accent">{events.length} events</span>
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
