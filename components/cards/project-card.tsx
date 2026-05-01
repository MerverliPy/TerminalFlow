import type { Project } from "@/lib/domain/types";

const HEALTH_LABELS: Record<Project["health"], string> = {
  ready: "Ready",
  attention: "Needs attention",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card">
      <div className="card__top">
        <div className="card-kv">
          <span className="card-kv__label">{project.language}</span>
          <span className="card-title">{project.name}</span>
        </div>
        <span className={`workspace-pill ${project.health === "ready" ? "workspace-pill--good" : "workspace-pill--warn"}`}>
          {HEALTH_LABELS[project.health]}
        </span>
      </div>

      <div className="card__body">
        <p className="card-copy">{project.summary}</p>
        <div className="card-kv">
          <span className="card-kv__label">Path</span>
          <span className="card-kv__value">{project.path}</span>
        </div>
      </div>

      <div className="card__footer">
        <span className="card-meta">Updated {project.updatedAt}</span>
        <span className="workspace-pill">Open files: {project.openFiles}</span>
      </div>
    </article>
  );
}
