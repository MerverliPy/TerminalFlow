import { MockAuthSafetyNote } from "@/components/auth/mock-auth-safety-note";
import { WorkspaceSelector } from "@/components/auth/workspace-selector";

export default function WorkspacePage() {
  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Workspace</span>
        <h1 className="surface-heading__title">Choose a local mock workspace</h1>
        <p className="surface-heading__copy">
          Workspace membership is represented by static local data in this phase. Switching only updates browser state on this device.
        </p>
      </section>

      <WorkspaceSelector />
      <MockAuthSafetyNote />
    </main>
  );
}
