import type { ReactNode } from "react";

import type { Workspace } from "@/lib/auth/auth-types";

export function WorkspaceCard({
  workspace,
  action,
}: {
  workspace: Workspace;
  action?: ReactNode;
}) {
  return (
    <article className="auth-workspace-card">
      <div className="card-kv">
        <span className="card-kv__label">{workspace.slug}</span>
        <span className="card-title">{workspace.name}</span>
      </div>
      <p className="card-copy">{workspace.summary}</p>
      <div className="card-stack">
        <span className="workspace-pill workspace-pill--accent">{workspace.root}</span>
        <span className="card-copy">{workspace.boundaryNote}</span>
        {action ? <div className="auth-workspace-card__action">{action}</div> : null}
      </div>
    </article>
  );
}
