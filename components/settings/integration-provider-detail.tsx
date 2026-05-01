import { DisabledIntegrationActions } from "@/components/settings/disabled-integration-actions";
import { IntegrationActivityList } from "@/components/settings/integration-activity-list";
import { IntegrationPermissionScopeList } from "@/components/settings/integration-permission-scope-list";
import { IntegrationSafetyNote } from "@/components/settings/integration-safety-note";
import type {
  IntegrationActionPreview,
  IntegrationActivityEvent,
  IntegrationConnection,
  IntegrationPermissionScope,
  IntegrationProvider,
  IntegrationProviderCategory,
  IntegrationReviewFinding,
} from "@/lib/domain/types";

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

const FINDING_TONE_CLASSES: Record<IntegrationReviewFinding["severity"], string> = {
  info: "workspace-pill--accent",
  warn: "workspace-pill--warn",
  blocked: "workspace-pill--good",
};

export function IntegrationProviderDetail({
  workspaceName,
  provider,
  category,
  connection,
  scopes,
  findings,
  activityEvents,
  actionPreviews,
}: {
  workspaceName: string;
  provider: IntegrationProvider;
  category: IntegrationProviderCategory;
  connection: IntegrationConnection;
  scopes: IntegrationPermissionScope[];
  findings: IntegrationReviewFinding[];
  activityEvents: IntegrationActivityEvent[];
  actionPreviews: IntegrationActionPreview[];
}) {
  return (
    <section className="shell__section auth-panel integration-detail">
      <div className="session-panel__header">
        <span className="section-note">Connection review</span>
        <span className={`workspace-pill ${CONNECTION_TONE_CLASSES[connection.status]}`}>
          {connection.status}
        </span>
      </div>

      <div className="surface-heading">
        <span className="surface-heading__eyebrow">{category.title}</span>
        <h2 className="surface-heading__title">{provider.name}</h2>
        <p className="surface-heading__copy">{provider.detail}</p>
      </div>

      <div className="settings-grid integration-detail__grid">
        <article className="settings-card">
          <span className="settings-card__label">Workspace</span>
          <span className="settings-card__title">{provider.workspaceNote}</span>
          <p className="card-copy">{workspaceName}</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Connection state</span>
          <span className="settings-card__title">{connection.lastCheckedAt}</span>
          <p className="card-copy">{connection.lastActivityAt}</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Risk</span>
          <span className={`workspace-pill ${RISK_TONE_CLASSES[provider.riskLevel]}`}>
            {provider.riskLevel} risk
          </span>
          <p className="card-copy">{connection.riskNote}</p>
        </article>
        <article className="settings-card">
          <span className="settings-card__label">Review summary</span>
          <span className="settings-card__title">{provider.reviewSummary}</span>
          <p className="card-copy">{provider.connectionSummary}</p>
        </article>
      </div>

      <DisabledIntegrationActions actions={actionPreviews} />

      <IntegrationPermissionScopeList scopes={scopes} />

      <section className="shell__section auth-panel">
        <div className="session-panel__header">
          <span className="section-note">Review findings</span>
          <span className="workspace-pill workspace-pill--accent">{findings.length} findings</span>
        </div>

        <div className="settings-grid">
          {findings.map((finding) => (
            <article className="settings-card" key={finding.id}>
              <span className="settings-card__label">Finding</span>
              <span className="settings-card__title">{finding.title}</span>
              <span className={`workspace-pill ${FINDING_TONE_CLASSES[finding.severity]}`}>
                {finding.severity}
              </span>
              <p className="card-copy">{finding.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <IntegrationActivityList events={activityEvents} />
      <IntegrationSafetyNote />
    </section>
  );
}
