import type { LocalChangeHistoryEntry } from "@/lib/domain/types";

export function ChangeHistoryPanel({ entries }: { entries: LocalChangeHistoryEntry[] }) {
  return (
    <section className="shell__section session-panel">
      <div className="session-panel__header">
        <span className="section-note">Change history</span>
      </div>
      <div className="card-stack">
        {entries.map((entry) => (
          <article className="settings-card" key={entry.id}>
            <span className="settings-card__label">{entry.changedAt}</span>
            <span className="settings-card__title">{entry.title}</span>
            <p className="card-copy">{entry.summary}</p>
            <div className="card-stack">
              {entry.changeSet.map((change) => (
                <p className="card-copy" key={change.id}>
                  <strong>{change.field}</strong>: {change.before} → {change.after}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
