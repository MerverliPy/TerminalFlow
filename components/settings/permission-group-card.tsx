import type { WorkspacePermissionGroup } from "@/lib/auth/auth-types";

const PERMISSION_STATE_CLASSES: Record<WorkspacePermissionGroup["permissions"][number]["state"], string> = {
  allowed: "workspace-pill--good",
  review: "workspace-pill--warn",
  blocked: "workspace-pill--accent",
};

export function PermissionGroupCard({ group }: { group: WorkspacePermissionGroup }) {
  return (
    <article className="settings-card permission-group-card">
      <div className="session-panel__header">
        <span className="settings-card__label">{group.role} access</span>
        <span className="workspace-pill workspace-pill--accent">{group.permissions.length} permissions</span>
      </div>

      <span className="settings-card__title">{group.title}</span>
      <p className="card-copy">{group.summary}</p>

      <div className="permission-group-list">
        {group.permissions.map((permission) => (
          <div className="permission-chip" key={permission.id}>
            <div className="card-kv">
              <span className="card-kv__label">{permission.key}</span>
              <span className="card-kv__value">{permission.label}</span>
            </div>
            <span className={`workspace-pill ${PERMISSION_STATE_CLASSES[permission.state]}`}>
              {permission.state}
            </span>
            <p className="card-copy">{permission.summary}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
