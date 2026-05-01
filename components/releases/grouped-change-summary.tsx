import type { LocalGroupedChangeSummary } from "@/lib/domain/types";

export function GroupedChangeSummary({ summary }: { summary: LocalGroupedChangeSummary }) {
  return (
    <article className="settings-card release-group-card">
      <div className="card__top">
        <div className="card-kv">
          <span className="card-kv__label">Grouped changes</span>
          <span className="card-title">{summary.title}</span>
        </div>
        <span className="workspace-pill workspace-pill--accent">{summary.items.length} groups</span>
      </div>

      <p className="card-copy">{summary.summary}</p>

      <div className="release-group-grid">
        {summary.items.map((item) => (
          <article className="meta-card" key={item.id}>
            <span className="meta-card__label">
              {item.label} · {item.count}
            </span>
            <p className="meta-card__copy">{item.detail}</p>
          </article>
        ))}
      </div>

      <p className="meta-card__copy">{summary.note}</p>
    </article>
  );
}
