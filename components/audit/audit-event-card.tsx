import Link from "next/link";

import { AuditStatusBadge } from "@/components/audit/audit-status-badge";
import type { LocalAuditEvent } from "@/lib/domain/types";
import { settingsAuditEventDetailRoute } from "@/lib/navigation/routes";

export function AuditEventCard({ event }: { event: LocalAuditEvent }) {
  return (
    <article className="settings-card">
      <span className="settings-card__label">{event.occurredAt}</span>
      <span className="settings-card__title">{event.title}</span>
      <p className="card-copy">{event.summary}</p>
      <p className="card-copy">Actor: {event.actor.label} ({event.actor.source})</p>
      <p className="card-copy">Resource: {event.resource.label}</p>
      <AuditStatusBadge severity={event.severity} status={event.status} />
      <Link className="settings-link" href={settingsAuditEventDetailRoute(event.id)}>
        Open audit event detail
      </Link>
    </article>
  );
}
