import { SignedOutHero } from "@/components/auth/signed-out-hero";
import { SignInPanel } from "@/components/auth/sign-in-panel";
import { MockAuthSafetyNote } from "@/components/auth/mock-auth-safety-note";
import { MOCK_WORKSPACES } from "@/lib/domain/mock-data";

export default function HomePage() {
  return (
    <main className="landing-shell">
      <section className="landing-shell__hero">
        <SignedOutHero />
      </section>

      <section className="landing-shell__grid">
        <SignInPanel />

        <article className="landing-shell__workspace-preview">
          <div className="session-panel__header">
            <span className="section-note">Mock workspaces</span>
            <span className="workspace-pill workspace-pill--accent">{MOCK_WORKSPACES.length} local</span>
          </div>
          <div className="auth-workspace-stack">
            {MOCK_WORKSPACES.map((workspace) => (
              <article className="auth-workspace-card" key={workspace.id}>
                <div className="card-kv">
                  <span className="card-kv__label">{workspace.slug}</span>
                  <span className="card-title">{workspace.name}</span>
                </div>
                <p className="card-copy">{workspace.summary}</p>
                <span className="workspace-pill workspace-pill--accent">{workspace.root}</span>
              </article>
            ))}
          </div>
        </article>
      </section>

      <MockAuthSafetyNote />
    </main>
  );
}
