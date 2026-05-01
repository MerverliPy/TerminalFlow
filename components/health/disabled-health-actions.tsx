import Link from "next/link";

import { ROUTES } from "@/lib/navigation/routes";

const ACTIONS = [
  { label: "Fix", detail: "Preview the fix flow without changing any state." },
  { label: "Run audit", detail: "Render an audit action with no real checks attached." },
  { label: "Refresh checks", detail: "Show a refresh control that stays local only." },
  { label: "Export report", detail: "Present an export preview with no file creation." },
  { label: "Open issue", detail: "Surface an issue preview without tracker integration." },
] as const;

export function DisabledHealthActions() {
  return (
    <section className="shell__section">
      <div className="card-stack">
        <div className="card__top">
          <span className="section-note">Action previews</span>
          <Link className="settings-link" href={ROUTES.settings}>
            Open Settings
          </Link>
        </div>
        <div className="health-action-grid">
          {ACTIONS.map((action, index) => (
            <article className="card" key={action.label}>
              <span className="card-title">{action.label}</span>
              <p className="card-copy">{action.detail}</p>
              <button
                className={`composer__button ${index === 0 ? "composer__button--primary" : ""}`}
                type="button"
                disabled
              >
                Disabled
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
