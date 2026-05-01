import { SessionCard } from "@/components/cards/session-card";
import { MOCK_SESSIONS } from "@/lib/domain/mock-data";

export default function SessionsPage() {
  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Sessions</span>
        <h1 className="surface-heading__title">Terminal session cards</h1>
        <p className="surface-heading__copy">
          Sessions stay static in this phase. The cards model a control surface
          for terminal activity without creating a terminal runtime or any
          WebSocket-backed execution path. Tap a card to open the detail
          surface.
        </p>
      </section>

      <section className="shell__section">
        <div className="card-grid">
          {MOCK_SESSIONS.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </section>
    </main>
  );
}
