export function ExecutionPlanSafetyNote() {
  return (
    <aside className="session-safety-note" role="note">
      <span className="session-safety-note__title">Execution plan safety note</span>
      <p className="session-safety-note__copy">
        Execution plans and dry-runs are mocked locally in this phase. No real approvals, command execution, workflow runs, backend orchestration, queues, workers, or host access are active.
      </p>
      <p className="session-safety-note__copy">
        Plan records, step ordering, mapping previews, risk summaries, findings, and action previews come from static local data only.
      </p>
    </aside>
  );
}
