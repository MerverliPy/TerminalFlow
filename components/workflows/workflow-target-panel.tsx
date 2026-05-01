import type { WorkflowTarget } from "@/lib/domain/types";

const MODE_LABELS: Record<WorkflowTarget["mode"], string> = {
  project: "Project",
  host: "Host",
  workspace: "Workspace",
};

export function WorkflowTargetPanel({ target }: { target: WorkflowTarget }) {
  return (
    <section className="shell__section workflow-panel">
      <div className="session-panel__header">
        <span className="section-note">Target</span>
        <span className="workspace-pill workspace-pill--warn">{MODE_LABELS[target.mode]}</span>
      </div>

      <div className="meta-card">
        <span className="meta-card__label">Target scope</span>
        <span className="meta-card__value">
          {target.projectName} on {target.hostName}
        </span>
        <p className="meta-card__copy">{target.detail}</p>
      </div>

      <div className="workflow-field-grid">
        <label className="workflow-field">
          <span className="workflow-field__label">Project</span>
          <input className="workflow-field__control" defaultValue={target.projectName} readOnly />
        </label>
        <label className="workflow-field">
          <span className="workflow-field__label">Host</span>
          <input className="workflow-field__control" defaultValue={target.hostName} readOnly />
        </label>
        <label className="workflow-field">
          <span className="workflow-field__label">Workspace root</span>
          <input className="workflow-field__control" defaultValue={target.workspaceRoot} readOnly />
        </label>
        <label className="workflow-field">
          <span className="workflow-field__label">Mode</span>
          <input className="workflow-field__control" defaultValue={MODE_LABELS[target.mode]} readOnly />
        </label>
      </div>
    </section>
  );
}
