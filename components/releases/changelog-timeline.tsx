import type { LocalReleaseChangelogEntry } from "@/lib/domain/types";

const KIND_CLASSES: Record<LocalReleaseChangelogEntry["kind"], string> = {
  added: "workspace-pill--good",
  updated: "workspace-pill--accent",
  fixed: "workspace-pill--warn",
  reviewed: "workspace-pill--accent",
};

export function ChangelogTimeline({ entries }: { entries: LocalReleaseChangelogEntry[] }) {
  const orderedEntries = [...entries].sort((left, right) => left.order - right.order);

  return (
    <section className="shell__section session-panel">
      <div className="session-panel__header">
        <span className="section-note">Changelog timeline</span>
        <span className="workspace-pill workspace-pill--accent">{orderedEntries.length} entries</span>
      </div>

      <div className="release-timeline">
        {orderedEntries.map((entry) => (
          <article className="release-timeline__item" key={entry.id}>
            <div className="card__top">
              <div className="card-kv">
                <span className="card-kv__label">
                  #{entry.order} · {entry.time}
                </span>
                <span className="card-title">{entry.title}</span>
              </div>
              <span className={`workspace-pill ${KIND_CLASSES[entry.kind]}`}>{entry.kind}</span>
            </div>
            <p className="card-copy">{entry.detail}</p>
            <p className="meta-card__copy">{entry.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
