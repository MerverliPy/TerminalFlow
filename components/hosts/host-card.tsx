import Link from "next/link";

import type { HostConnection } from "@/lib/domain/types";
import { hostDetailRoute } from "@/lib/navigation/routes";

const HOST_STATUS_LABELS: Record<HostConnection["status"], string> = {
  connected: "Connected",
  connecting: "Connecting",
  offline: "Offline",
};

const HOST_STATUS_CLASSES: Record<HostConnection["status"], string> = {
  connected: "workspace-pill--good",
  connecting: "workspace-pill--accent",
  offline: "workspace-pill--warn",
};

export function HostCard({ host }: { host: HostConnection }) {
  return (
    <Link
      href={hostDetailRoute(host.id)}
      className="card card--link"
      aria-label={`Open host setup for ${host.name}`}
    >
      <div className="card__top">
        <div className="card-kv">
          <span className="card-kv__label">{host.environment}</span>
          <span className="card-title">{host.name}</span>
        </div>
        <span className={`workspace-pill ${HOST_STATUS_CLASSES[host.status]}`}>
          {HOST_STATUS_LABELS[host.status]}
        </span>
      </div>

      <div className="card__body">
        <div className="card-kv">
          <span className="card-kv__label">Host</span>
          <span className="card-kv__value">{host.host}</span>
        </div>
        <div className="card-kv">
          <span className="card-kv__label">Operating system</span>
          <span className="card-kv__value">{host.operatingSystem}</span>
        </div>
        <div className="card-kv">
          <span className="card-kv__label">Connection</span>
          <span className="card-kv__value">{host.connectionMethod}</span>
        </div>
      </div>

      <div className="card__footer">
        <span className="card-meta">Last checked {host.lastCheckedAt}</span>
        <span className="workspace-pill">Root: {host.workspaceRoot}</span>
      </div>
    </Link>
  );
}
