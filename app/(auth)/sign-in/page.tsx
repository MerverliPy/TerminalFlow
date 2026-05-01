import { MockAuthSafetyNote } from "@/components/auth/mock-auth-safety-note";
import { SignInPanel } from "@/components/auth/sign-in-panel";
import { SignedOutHero } from "@/components/auth/signed-out-hero";

export default function SignInPage() {
  return (
    <main className="shell__panel">
      <SignedOutHero />
      <SignInPanel />
      <MockAuthSafetyNote />
    </main>
  );
}
