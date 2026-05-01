"use client";

import { MockAuthSafetyNote } from "@/components/auth/mock-auth-safety-note";
import { getMockUser, signOutMockUser, useMockAuthState } from "@/lib/auth/mock-auth";

export function AccountPanel() {
  const authState = useMockAuthState();
  const user = getMockUser(authState.session?.userId ?? null);

  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Account</span>
        <span className={`workspace-pill ${authState.status === "signedIn" ? "workspace-pill--good" : "workspace-pill--warn"}`}>
          {authState.status === "signedIn" ? "Mock signed in" : "Signed out"}
        </span>
      </div>

      <div className="auth-profile-card">
        <div className="auth-avatar" aria-hidden="true">
          {user?.profile.avatarLabel ?? "--"}
        </div>
        <div className="card-kv">
          <span className="card-kv__label">Profile</span>
          <span className="card-title">{user?.profile.displayName ?? "No local user selected"}</span>
          <span className="card-copy">{user?.profile.email ?? "Sign in with the local mock controls to populate this panel."}</span>
        </div>
        <span className="workspace-pill workspace-pill--accent">{user?.profile.title ?? "Local mock state"}</span>
      </div>

      <div className="settings-grid">
        <article className="settings-card">
          <span className="settings-card__label">Signed in at</span>
          <span className="settings-card__title">{authState.session?.signedInAt ?? "Not stored"}</span>
          <p className="card-copy">No cookie or backend session is used in this phase.</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Storage</span>
          <span className="settings-card__title">Browser local only</span>
          <p className="card-copy">Auth state is written to localStorage on this device.</p>
        </article>
      </div>

      <div className="auth-hero__actions">
        <button className="composer__button composer__button--primary" type="button" onClick={() => signOutMockUser()}>
          Sign out locally
        </button>
      </div>

      <MockAuthSafetyNote />
    </section>
  );
}
