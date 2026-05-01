"use client";

import Link from "next/link";

import { MockAuthSafetyNote } from "@/components/auth/mock-auth-safety-note";
import { WorkspaceCard } from "@/components/auth/workspace-card";
import { MOCK_USERS, MOCK_WORKSPACES } from "@/lib/domain/mock-data";
import { ROUTES } from "@/lib/navigation/routes";
import {
  getMockUser,
  getMockWorkspace,
  signInMockUser,
  useMockAuthState,
} from "@/lib/auth/mock-auth";

export function SignInPanel() {
  const authState = useMockAuthState();
  const selectedUser = getMockUser(authState.session?.userId ?? MOCK_USERS[0]?.id ?? null) ?? MOCK_USERS[0];
  const selectedWorkspace =
    getMockWorkspace(authState.session?.activeWorkspaceId ?? MOCK_WORKSPACES[0]?.id ?? null) ??
    MOCK_WORKSPACES[0];
  const accountSummary =
    authState.status === "signedIn" && authState.session
      ? `Signed in locally as ${selectedUser.profile.displayName}.`
      : "Choose the mock sign-in button below to seed local auth state on this device.";

  return (
    <section className="shell__section session-panel auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Local sign-in</span>
        <span className={`workspace-pill ${authState.status === "signedIn" ? "workspace-pill--good" : "workspace-pill--warn"}`}>
          {authState.status === "signedIn" ? "Signed in" : "Signed out"}
        </span>
      </div>

      <p className="surface-heading__copy">{accountSummary}</p>

      <div className="auth-profile-card">
        <div className="auth-avatar" aria-hidden="true">
          {selectedUser.profile.avatarLabel}
        </div>
        <div className="card-kv">
          <span className="card-kv__label">Mock user</span>
          <span className="card-title">{selectedUser.profile.displayName}</span>
          <span className="card-copy">{selectedUser.profile.email}</span>
        </div>
        <span className="workspace-pill workspace-pill--accent">{selectedUser.profile.title}</span>
      </div>

      <div className="auth-hero__actions">
        <button
          className="composer__button composer__button--primary"
          type="button"
          onClick={() => signInMockUser(selectedUser.id, selectedWorkspace.id)}
        >
          Mock sign in
        </button>
        <Link className="composer__button" href={ROUTES.workspace}>
          Workspace selector
        </Link>
      </div>

      <div className="auth-workspace-stack">
        {MOCK_WORKSPACES.map((workspace) => (
          <WorkspaceCard
            key={workspace.id}
            workspace={workspace}
            action={
              <button
                className="composer__button composer__button--primary"
                type="button"
                onClick={() => signInMockUser(selectedUser.id, workspace.id)}
              >
                Use this workspace
              </button>
            }
          />
        ))}
      </div>

      <MockAuthSafetyNote />
    </section>
  );
}
