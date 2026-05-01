import type { WorkflowRunTimelineItem } from "@/lib/domain/types";

const TIMELINE_KIND_LABELS: Record<WorkflowRunTimelineItem["kind"], string> = {
  started: "Started",
  "step-started": "Step started",
  "step-finished": "Step finished",
  log: "Log",
  interrupted: "Interrupted",
  cancelled: "Cancelled",
  completed: "Completed",
};

const TIMELINE_KIND_CLASSES: Record<WorkflowRunTimelineItem["kind"], string> = {
  started: "workspace-pill--accent",
  "step-started": "workspace-pill--good",
  "step-finished": "workspace-pill--good",
  log: "workspace-pill--accent",
  interrupted: "workspace-pill--warn",
  cancelled: "workspace-pill--warn",
  completed: "workspace-pill--good",
};

export function RunTimeline({ items }: { items: WorkflowRunTimelineItem[] }) {
  return (
    <section className="shell__section run-panel">
      <div className="session-panel__header">
        <span className="section-note">Timeline</span>
        <span className="workspace-pill workspace-pill--accent">{items.length} events</span>
      </div>

      <div className="run-timeline">
        {items.map((item) => (
          <article className="run-timeline__item" key={item.id}>
            <div className="run-timeline__top">
              <div className="card-kv">
                <span className="card-kv__label">
                  #{item.index} · {item.time}
                </span>
                <span className="card-title">{item.title}</span>
              </div>
              <span className={`workspace-pill ${TIMELINE_KIND_CLASSES[item.kind]}`}>
                {TIMELINE_KIND_LABELS[item.kind]}
              </span>
            </div>
            <p className="card-copy">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
