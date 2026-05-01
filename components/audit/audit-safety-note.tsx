export function AuditSafetyNote() {
  return (
    <aside className="session-safety-note" role="note">
      <span className="session-safety-note__title">Local audit phase note</span>
      <p className="session-safety-note__copy">
        Audit trail and change history are mocked locally in this phase. No backend audit storage, telemetry, event ingestion, queues, workers, sockets, provider sync, or host access are active.
      </p>
    </aside>
  );
}
