export function WorkflowSafetyNote() {
  return (
    <aside className="session-safety-note" role="note">
      <span className="session-safety-note__title">Workflow safety note</span>
      <p className="session-safety-note__copy">
        Workflow execution is not active in this phase. This is a static planning and preview interface only.
      </p>
    </aside>
  );
}
