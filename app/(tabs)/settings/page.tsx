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
] as const;

export default function SettingsPage() {
  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Settings</span>
        <h1 className="surface-heading__title">Placeholder settings groups</h1>
        <p className="surface-heading__copy">
          Settings remain local and static. The layout exists so later phases
          can expand it without changing the basic route structure.
        </p>
      </section>

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
      </section>
    </main>
  );
}
