"use client";

import Link from "next/link";

import { MockAuthSafetyNote } from "@/components/auth/mock-auth-safety-note";
import { getMockUser, getMockWorkspace, signInMockUser, useMockAuthState } from "@/lib/auth/mock-auth";
import { MOCK_USERS, MOCK_WORKSPACES } from "@/lib/domain/mock-data";
import { ROUTES } from "@/lib/navigation/routes";

export function WorkspaceBoundaryPanel() {
  const authState = useMockAuthState();
  const user = getMockUser(authState.session?.userId ?? null);
  const workspace = getMockWorkspace(authState.session?.activeWorkspaceId ?? null);

  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Workspace boundary</span>
        <span className="workspace-pill workspace-pill--accent">
          {authState.selection?.workspaceName ?? "No workspace selected"}
        </span>
      </div>

      <p className="surface-heading__copy">
        Workspace membership is mocked locally. The boundary describes what the current local user can see in this phase.
      </p>

      <div className="settings-grid">
        <article className="settings-card">
          <span className="settings-card__label">Active workspace</span>
          <span className="settings-card__title">{workspace?.name ?? "Not selected"}</span>
          <p className="card-copy">{workspace?.boundaryNote ?? "Open the workspace selector to pick one."}</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Membership</span>
          <span className="settings-card__title">{authState.selection?.role ?? "Viewer"}</span>
          <p className="card-copy">
            {user
              ? `${user.profile.displayName} is represented as a local membership record only.`
              : "No signed-in user is active yet."}
          </p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Workspace root</span>
          <span className="settings-card__title">{workspace?.root ?? "Unset"}</span>
          <p className="card-copy">This is a static path used for workspace framing only.</p>
        </article>
      </div>

      <div className="auth-hero__actions">
        <Link className="composer__button composer__button--primary" href={ROUTES.workspace}>
          Open selector
        </Link>
        <button
          className="composer__button"
          type="button"
          onClick={() => signInMockUser(MOCK_USERS[0].id, MOCK_WORKSPACES[0].id)}
        >
          Reset to default workspace
        </button>
      </div>

      <MockAuthSafetyNote />
    </section>
  );
}
