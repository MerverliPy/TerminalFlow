import type { LocalReleaseMilestone } from "@/lib/domain/types";

const STATUS_LABELS: Record<LocalReleaseMilestone["status"], string> = {
  planned: "Planned",
  "in-progress": "In progress",
  complete: "Complete",
  deferred: "Deferred",
};

const STATUS_CLASSES: Record<LocalReleaseMilestone["status"], string> = {
  planned: "workspace-pill--accent",
  "in-progress": "workspace-pill--warn",
  complete: "workspace-pill--good",
  deferred: "workspace-pill--blocked",
};

export function MilestoneStatusCard({ milestone }: { milestone: LocalReleaseMilestone }) {
  return (
    <article className="meta-card milestone-status-card">
      <div className="card__top">
        <div className="card-kv">
          <span className="card-kv__label">{milestone.owner}</span>
          <span className="card-title">{milestone.title}</span>
        </div>
        <span className={`workspace-pill ${STATUS_CLASSES[milestone.status]}`}>
          {STATUS_LABELS[milestone.status]}
        </span>
      </div>

      <p className="card-copy">{milestone.summary}</p>

      <div className="milestone-status-card__meter" aria-hidden="true">
        <span style={{ width: `${milestone.progress}%` }} />
      </div>

      <div className="card__footer">
        <span className="card-meta">{milestone.progress}% complete</span>
        <span className="workspace-pill workspace-pill--accent">{milestone.dueAt}</span>
      </div>

      <p className="meta-card__copy">{milestone.note}</p>
    </article>
  );
}
