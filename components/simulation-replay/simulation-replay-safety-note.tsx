export function SimulationReplaySafetyNote() {
  return (
    <aside className="session-safety-note" role="note">
      <span className="session-safety-note__title">Simulation replay note</span>
      <p className="session-safety-note__copy">
        Simulation replay and run history are local-only in this phase. No backend database, cloud sync, real execution logs, queues, workers, sockets, telemetry, or host access are active.
      </p>
    </aside>
  );
}
