import type { WorkflowTrigger } from "@/lib/domain/types";

const KIND_LABELS: Record<WorkflowTrigger["kind"], string> = {
  manual: "Manual",
  schedule: "Schedule",
  event: "Event",
};

export function WorkflowTriggerPanel({ trigger }: { trigger: WorkflowTrigger }) {
  return (
    <section className="shell__section workflow-panel">
      <div className="session-panel__header">
        <span className="section-note">Trigger</span>
        <span className="workspace-pill workspace-pill--accent">{KIND_LABELS[trigger.kind]}</span>
      </div>

      <div className="meta-card">
        <span className="meta-card__label">Trigger label</span>
        <span className="meta-card__value">{trigger.label}</span>
        <p className="meta-card__copy">{trigger.detail}</p>
      </div>

      <div className="workflow-field-grid">
        <label className="workflow-field">
          <span className="workflow-field__label">Trigger kind</span>
          <input className="workflow-field__control" defaultValue={KIND_LABELS[trigger.kind]} readOnly />
        </label>
        <label className="workflow-field">
          <span className="workflow-field__label">Schedule</span>
          <input className="workflow-field__control" defaultValue={trigger.schedule ?? "Not scheduled"} readOnly />
        </label>
      </div>
    </section>
  );
}
