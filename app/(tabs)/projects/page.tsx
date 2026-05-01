import { ProjectCard } from "@/components/cards/project-card";
import { MOCK_HOST_CONNECTIONS, MOCK_PROJECTS } from "@/lib/domain/mock-data";

export default function ProjectsPage() {
  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Projects</span>
        <h1 className="surface-heading__title">Static project cards</h1>
        <p className="surface-heading__copy">
          Projects are listed from local mock data only. Each card shows the
          project path, host association, and a simple health signal so the
          navigation can be exercised without persistence.
        </p>
      </section>

      <section className="shell__section">
        <div className="card-stack">
          <span className="section-note">
            Workspace roots: {MOCK_HOST_CONNECTIONS.map((host) => host.workspaceRoot).join(" · ")}
          </span>
          <div className="card-grid">
            {MOCK_PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
