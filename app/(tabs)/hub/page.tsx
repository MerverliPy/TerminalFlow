const SURFACE_ITEMS = [
  {
    label: "Workspace",
    value: "One host workspace surface for the first release.",
  },
  {
    label: "Terminal",
    value: "Placeholder navigation point for the mobile command console.",
  },
  {
    label: "Files",
    value: "Shell-ready entry point for browsing project files.",
  },
] as const;

export default function HubPage() {
  return (
    <main className="shell__panel">
      <section className="hero">
        <h1>Hub</h1>
        <p>
          TerminalFlow opens here first. This phase only establishes the
          runnable shell and the route map that future terminal, file, and
          settings surfaces will sit inside.
        </p>
      </section>

      <section className="tiles" aria-label="Foundation surfaces">
        {SURFACE_ITEMS.map((item) => (
          <article className="tile" key={item.label}>
            <span className="tile__label">{item.label}</span>
            <span className="tile__value">{item.value}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
