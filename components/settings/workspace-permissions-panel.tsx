"use client";

import { AccessReviewPanel } from "@/components/settings/access-review-panel";
import { DisabledAccessActions } from "@/components/settings/disabled-access-actions";
import { MemberAccessList } from "@/components/settings/member-access-list";
import { PermissionGroupCard } from "@/components/settings/permission-group-card";
import { PermissionsSafetyNote } from "@/components/settings/permissions-safety-note";
import {
  MOCK_WORKSPACE_ACCESS_REVIEWS,
  MOCK_WORKSPACE_MEMBERS,
  MOCK_WORKSPACE_PERMISSION_GROUPS,
  MOCK_WORKSPACES,
} from "@/lib/domain/mock-data";
import { getMockWorkspace, useMockAuthState } from "@/lib/auth/mock-auth";

export function WorkspacePermissionsPanel() {
  const authState = useMockAuthState();
  const workspace =
    getMockWorkspace(authState.session?.activeWorkspaceId ?? null) ?? MOCK_WORKSPACES[0];

  const members = MOCK_WORKSPACE_MEMBERS.filter((member) => member.workspaceId === workspace.id);
  const groups = MOCK_WORKSPACE_PERMISSION_GROUPS.filter((group) => group.workspaceId === workspace.id);
  const review =
    MOCK_WORKSPACE_ACCESS_REVIEWS.find((item) => item.workspaceId === workspace.id) ??
    MOCK_WORKSPACE_ACCESS_REVIEWS[0];

  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Workspace permissions</span>
        <h1 className="surface-heading__title">Mock access review for {workspace.name}</h1>
        <p className="surface-heading__copy">
          Review local members, role groups, and access findings. Nothing here enforces authorization; it only describes the current mock workspace boundary.
        </p>
      </section>

      <DisabledAccessActions />

      <section className="shell__section auth-panel">
        <div className="session-panel__header">
          <span className="section-note">Permission groups</span>
          <span className="workspace-pill workspace-pill--accent">{groups.length} groups</span>
        </div>
        <div className="settings-grid">
          {groups.map((group) => (
            <PermissionGroupCard key={group.id} group={group} />
          ))}
        </div>
      </section>

      <MemberAccessList members={members} />
      <AccessReviewPanel review={review} />
      <PermissionsSafetyNote />
    </main>
  );
}
