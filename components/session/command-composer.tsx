import type { TerminalSession } from "@/lib/domain/types";

export function CommandComposer({ session }: { session: TerminalSession }) {
  return (
    <section className="shell__section session-panel">
      <div className="session-panel__header">
        <span className="section-note">Command composer</span>
        <span className="workspace-pill workspace-pill--warn">
          Execution inactive
        </span>
      </div>

      <p className="surface-heading__copy">
        This composer is visual only in Phase 03. It can display a command, but
        it does not send anything to a host or terminal runtime.
      </p>

      <label className="composer" htmlFor={`composer-${session.id}`}>
        <span className="composer__label">Command</span>
        <textarea
          id={`composer-${session.id}`}
          className="composer__input"
          defaultValue={session.commandPreview}
          placeholder="Type a command to preview the composer layout."
          rows={4}
        />
      </label>

      <div className="composer__actions">
        <button className="composer__button composer__button--primary" disabled type="button">
          Run command
        </button>
        <button className="composer__button" disabled type="button">
          Queue simulation
        </button>
      </div>

      <p className="composer__hint">
        Command execution is not active yet. These controls are disabled or
        simulated only.
      </p>
    </section>
  );
}
