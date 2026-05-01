import Link from "next/link";

import { ROUTES } from "@/lib/navigation/routes";

export function SignedOutHero() {
  return (
    <section className="surface-heading auth-hero">
      <span className="surface-heading__eyebrow">Authentication</span>
      <h1 className="surface-heading__title">A local workspace boundary before real auth exists</h1>
      <p className="surface-heading__copy">
        This phase keeps user identity, workspace membership, and session state in local mock data so the product can model a signed-out and signed-in shell without backend auth.
      </p>

      <div className="auth-hero__actions">
        <Link className="composer__button composer__button--primary" href={ROUTES.signIn}>
          Open sign-in
        </Link>
        <Link className="composer__button" href={ROUTES.workspace}>
          Choose workspace
        </Link>
      </div>
    </section>
  );
}
