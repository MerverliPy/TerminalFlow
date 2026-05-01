import Link from "next/link";

import type { LocalAuditStorageStatus } from "@/lib/domain/types";
import { ROUTES } from "@/lib/navigation/routes";

export function AuditSummaryPanel({ status }: { status: LocalAuditStorageStatus }) {
  return (
    <section className="shell__section session-panel">
      <div className="session-panel__header">
        <span className="section-note">Audit summary</span>
        <span className="workspace-pill workspace-pill--accent">{status.state}</span>
      </div>
      <p className="surface-heading__copy">{status.note}</p>
      <div className="settings-grid">
        <article className="settings-card">
          <span className="settings-card__label">Events</span>
          <span className="settings-card__title">{status.eventCount}</span>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Change history</span>
          <span className="settings-card__title">{status.changeHistoryCount}</span>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Timeline</span>
          <span className="settings-card__title">{status.timelineCount}</span>
        </article>
      </div>
      <Link className="settings-link" href={ROUTES.settingsAudit}>
        Open Audit Trail
      </Link>
    </section>
  );
}
