export function SimulatorSafetyNote() {
  return (
    <aside className="execution-simulator__safety-note" role="note">
      <span className="session-safety-note__title">Simulator safety note</span>
      <p className="session-safety-note__copy">
        Execution simulation is local-only in this phase. No real commands, workflow runs, backend jobs, queues,
        workers, sockets, or host access are active.
      </p>
    </aside>
  );
}
