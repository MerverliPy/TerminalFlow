import Link from "next/link";

import { AccountPanel } from "@/components/settings/account-panel";
import { LocalDataSafetyNote } from "@/components/settings/local-data-safety-note";
import { WorkspaceBoundaryPanel } from "@/components/settings/workspace-boundary-panel";
import { ResetDemoDataPanel } from "@/components/settings/reset-demo-data-panel";
import { StorageStatusPanel } from "@/components/settings/storage-status-panel";
import { ROUTES } from "@/lib/navigation/routes";

const SETTINGS_GROUPS = [
  {
    label: "Workspace",
    title: "Root path",
    value: "/home/calvin/projects",
    note: "Static placeholder for a future workspace selector.",
  },
  {
    label: "Appearance",
    title: "Terminal theme",
    value: "Midnight",
    note: "Represented as a local settings concept only.",
  },
  {
    label: "Input",
    title: "Mobile controls",
    value: "Thumb-friendly tabs",
    note: "This phase only defines the navigation shell.",
  },
  {
    label: "Hosts",
    title: "Setup surface",
    value: "Static profile cards",
    note: "Use the Hosts tab for connection boundaries and safety checks.",
  },
] as const;

export default function SettingsPage() {
  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Settings</span>
        <h1 className="surface-heading__title">Local storage, account, and workspace settings</h1>
        <p className="surface-heading__copy">
          Settings remain local and static. This surface explains the browser-only persistence model used by TerminalFlow in this phase and shows the mock account boundary.
        </p>
      </section>

      <AccountPanel />
      <WorkspaceBoundaryPanel />
      <StorageStatusPanel />
      <ResetDemoDataPanel />
      <LocalDataSafetyNote />

      <section className="shell__section">
        <div className="settings-grid">
          {SETTINGS_GROUPS.map((group) => (
            <article className="settings-card" key={group.label}>
              <span className="settings-card__label">{group.label}</span>
              <span className="settings-card__title">{group.title}</span>
              <div className="card-stack">
                <span className="workspace-pill workspace-pill--accent">{group.value}</span>
                <p className="card-copy">{group.note}</p>
              </div>
            </article>
          ))}
        </div>
        <Link className="settings-link" href={ROUTES.hosts}>
          Open Hosts
        </Link>
      </section>
    </main>
  );
}
