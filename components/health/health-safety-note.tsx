export function HealthSafetyNote() {
  return (
    <section className="health-safety-note" aria-label="Readiness safety note">
      <span className="session-safety-note__title">Readiness safety note</span>
      <p className="session-safety-note__copy">
        Project health and readiness data are mocked locally in this phase. No real audits, telemetry, provider sync, backend checks, or execution systems are active.
      </p>
      <p className="session-safety-note__copy">
        Fix, run audit, refresh checks, export report, and open issue controls are rendered for review only and do not perform any action.
      </p>
    </section>
  );
}
