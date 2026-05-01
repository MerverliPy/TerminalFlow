export function IntegrationSafetyNote() {
  return (
    <aside className="integration-note" role="note">
      <span className="session-safety-note__title">Integration boundary</span>
      <p className="session-safety-note__copy">
        Integrations are mocked locally in this phase. No OAuth, provider API calls, token
        exchange, webhooks, sync jobs, or backend connections are active.
      </p>
    </aside>
  );
}
