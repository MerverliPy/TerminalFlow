"use client";

import Link from "next/link";

import { ROUTES } from "@/lib/navigation/routes";
import { getMockUser, getMockWorkspace, signOutMockUser, useMockAuthState } from "@/lib/auth/mock-auth";

export function AuthWorkspaceBar() {
  const authState = useMockAuthState();
  const user = getMockUser(authState.session?.userId ?? null);
  const workspace = getMockWorkspace(authState.session?.activeWorkspaceId ?? null);

  if (authState.status === "signedOut" || !user || !workspace) {
    return (
      <div className="auth-chrome">
        <span className="workspace-pill workspace-pill--warn">Signed out</span>
        <Link className="auth-chrome__link" href={ROUTES.signIn}>
          Open mock sign-in
        </Link>
      </div>
    );
  }

  return (
    <div className="auth-chrome">
      <div className="auth-chrome__stack">
        <span className="workspace-pill workspace-pill--good">{user.profile.displayName}</span>
        <span className="workspace-pill workspace-pill--accent">{workspace.name}</span>
      </div>
      <div className="auth-chrome__actions">
        <Link className="auth-chrome__link" href={ROUTES.workspace}>
          Switch
        </Link>
        <button className="auth-chrome__link auth-chrome__button" type="button" onClick={() => signOutMockUser()}>
          Sign out
        </button>
      </div>
    </div>
  );
}
