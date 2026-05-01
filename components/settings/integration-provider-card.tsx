import Link from "next/link";

import { settingsIntegrationDetailRoute } from "@/lib/navigation/routes";
import type { IntegrationConnection, IntegrationProvider } from "@/lib/domain/types";

const CONNECTION_TONE_CLASSES: Record<IntegrationConnection["status"], string> = {
  connected: "workspace-pill--good",
  reviewing: "workspace-pill--warn",
  syncing: "workspace-pill--accent",
  offline: "workspace-pill--warn",
  blocked: "workspace-pill--warn",
};

const RISK_TONE_CLASSES: Record<IntegrationProvider["riskLevel"], string> = {
  low: "workspace-pill--good",
  medium: "workspace-pill--warn",
  high: "workspace-pill--accent",
};

export function IntegrationProviderCard({
  provider,
  connection,
  categoryTitle,
  active,
}: {
  provider: IntegrationProvider;
  connection: IntegrationConnection;
  categoryTitle: string;
  active?: boolean;
}) {
  return (
    <Link
      className={`card card--link integration-provider-card ${active ? "integration-provider-card--active" : ""}`}
      href={settingsIntegrationDetailRoute(provider.id)}
    >
      <div className="card__top">
        <div className="card-kv">
          <span className="card-kv__label">{categoryTitle}</span>
          <span className="card-title">{provider.name}</span>
        </div>
        <span className={`workspace-pill ${CONNECTION_TONE_CLASSES[connection.status]}`}>
          {connection.status}
        </span>
      </div>

      <div className="card__body">
        <p className="card-copy">{provider.summary}</p>
        <div className="integration-provider-card__meta">
          <span className={`workspace-pill ${RISK_TONE_CLASSES[provider.riskLevel]}`}>
            {provider.riskLevel} risk
          </span>
          <span className="workspace-pill workspace-pill--accent">{provider.scopeIds.length} scopes</span>
          <span className="workspace-pill workspace-pill--warn">{connection.lastCheckedAt}</span>
        </div>
      </div>

      <div className="card__footer">
        <span className="card-kv__value">{provider.connectionSummary}</span>
        <span className="settings-link">Review</span>
      </div>
    </Link>
  );
}
