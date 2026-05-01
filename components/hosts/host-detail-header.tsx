import Link from "next/link";

import type { HostConnection } from "@/lib/domain/types";
import { ROUTES } from "@/lib/navigation/routes";

const HOST_STATUS_LABELS: Record<HostConnection["status"], string> = {
  connected: "Connected",
  connecting: "Connecting",
  offline: "Offline",
};

export function HostDetailHeader({ host }: { host: HostConnection }) {
  return (
    <header className="host-detail-header">
      <div className="host-detail-header__top">
        <Link className="host-detail-header__back" href={ROUTES.hosts}>
          Back to Hosts
        </Link>
        <span
          className={`workspace-pill ${
            host.status === "connected"
              ? "workspace-pill--good"
              : host.status === "connecting"
                ? "workspace-pill--accent"
                : "workspace-pill--warn"
          }`}
        >
          {HOST_STATUS_LABELS[host.status]}
        </span>
      </div>

      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Host setup</span>
        <h1 className="surface-heading__title">{host.name}</h1>
        <p className="surface-heading__copy">
          {host.environment} environment, {host.operatingSystem}, connection via{" "}
          {host.connectionMethod}. Real host connection is not active yet.
        </p>
      </section>

      <div className="host-meta-grid">
        <article className="meta-card">
          <span className="meta-card__label">Operating system</span>
          <span className="meta-card__value">{host.operatingSystem}</span>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Environment</span>
          <span className="meta-card__value">{host.environment}</span>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Connection method</span>
          <span className="meta-card__value">{host.connectionMethod}</span>
        </article>
        <article className="meta-card">
          <span className="meta-card__label">Last checked</span>
          <span className="meta-card__value">{host.lastCheckedAt}</span>
        </article>
      </div>
    </header>
  );
}
