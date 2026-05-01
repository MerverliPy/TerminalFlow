import type { WorkspaceMember } from "@/lib/auth/auth-types";

const MEMBER_STATUS_CLASSES: Record<WorkspaceMember["status"], string> = {
  active: "workspace-pill--good",
  invited: "workspace-pill--warn",
  suspended: "workspace-pill--accent",
};

export function MemberAccessList({ members }: { members: WorkspaceMember[] }) {
  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Members</span>
        <span className="workspace-pill workspace-pill--accent">{members.length} local records</span>
      </div>

      <div className="member-list">
        {members.map((member) => (
          <article className="member-row" key={member.id}>
            <div className="member-row__identity">
              <div className="auth-avatar" aria-hidden="true">
                {member.displayName
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="card-kv">
                <span className="card-title">{member.displayName}</span>
                <span className="card-copy">{member.email}</span>
              </div>
            </div>

            <div className="member-row__meta">
              <span className={`workspace-pill ${MEMBER_STATUS_CLASSES[member.status]}`}>{member.status}</span>
              <span className="workspace-pill workspace-pill--accent">{member.role}</span>
            </div>

            <div className="member-row__footer">
              <span className="card-meta">Joined {member.joinedAt}</span>
              <span className="card-meta">Last seen {member.lastSeenAt}</span>
              <span className="card-meta">Groups: {member.permissionGroupIds.join(", ")}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
