import type { ReactNode } from "react";

const STATUS_LABELS: Record<string, string> = {
  ready: "Ready",
  draft: "Draft",
  blocked: "Blocked",
};

export function WorkflowBuilderShell({
  title,
  copy,
  status,
  children,
  preview,
}: {
  title: string;
  copy: string;
  status: string;
  children: ReactNode;
  preview?: ReactNode;
}) {
  return (
    <main className="shell__panel workflow-builder">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Workflows</span>
        <h1 className="surface-heading__title">{title}</h1>
        <p className="surface-heading__copy">{copy}</p>
        <div className="workflow-builder__status">
          <span className="workspace-pill workspace-pill--warn">
            Workflow execution is not active in this phase
          </span>
          <span className="workspace-pill workspace-pill--accent">
            {STATUS_LABELS[status] ?? status}
          </span>
        </div>
      </section>

      <div className="workflow-builder__layout">
        <div className="workflow-builder__editor">{children}</div>
        {preview ? <div className="workflow-builder__preview">{preview}</div> : null}
      </div>
    </main>
  );
}
