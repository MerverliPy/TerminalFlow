"use client";

import Link from "next/link";

import { WorkspaceCard } from "@/components/auth/workspace-card";
import { MOCK_USERS, MOCK_WORKSPACES } from "@/lib/domain/mock-data";
import { ROUTES } from "@/lib/navigation/routes";
import {
  getMockUser,
  getMockWorkspace,
  selectMockWorkspace,
  signInMockUser,
  useMockAuthState,
} from "@/lib/auth/mock-auth";

export function WorkspaceSelector() {
  const authState = useMockAuthState();
  const currentUser = getMockUser(authState.session?.userId ?? MOCK_USERS[0]?.id ?? null) ?? MOCK_USERS[0];
  const activeWorkspace =
    getMockWorkspace(authState.session?.activeWorkspaceId ?? MOCK_WORKSPACES[0]?.id ?? null) ??
    MOCK_WORKSPACES[0];

  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Workspace selection</span>
        <span className="workspace-pill workspace-pill--accent">
          {authState.status === "signedIn" ? activeWorkspace.name : "Not signed in"}
        </span>
      </div>

      <p className="surface-heading__copy">
        Select a workspace locally to change the active boundary. The membership and session state are static mock data only.
      </p>

      <div className="auth-workspace-stack">
        {MOCK_WORKSPACES.map((workspace) => {
          const isActive = workspace.id === authState.session?.activeWorkspaceId;

          return (
            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
              action={
                <div className="auth-workspace-card__actions">
                  <button
                    className={`composer__button ${isActive ? "composer__button--primary" : ""}`}
                    type="button"
                    onClick={() => {
                      if (authState.status === "signedOut") {
                        signInMockUser(currentUser.id, workspace.id);
                        return;
                      }

                      selectMockWorkspace(workspace.id);
                    }}
                  >
                    {isActive ? "Current workspace" : "Set active workspace"}
                  </button>
                  <Link className="composer__button" href={ROUTES.settings}>
                    Review settings
                  </Link>
                </div>
              }
            />
          );
        })}
      </div>
    </section>
  );
}
