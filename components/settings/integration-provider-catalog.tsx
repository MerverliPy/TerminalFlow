import Link from "next/link";

import { IntegrationCategoryCard } from "@/components/settings/integration-category-card";
import { IntegrationProviderCard } from "@/components/settings/integration-provider-card";
import { IntegrationProviderDetail } from "@/components/settings/integration-provider-detail";
import { IntegrationSafetyNote } from "@/components/settings/integration-safety-note";
import { DisabledIntegrationActions } from "@/components/settings/disabled-integration-actions";
import {
  MOCK_INTEGRATION_ACTION_PREVIEWS,
  MOCK_INTEGRATION_ACTIVITY_EVENTS,
  MOCK_INTEGRATION_CONNECTIONS,
  MOCK_INTEGRATION_PERMISSION_SCOPES,
  MOCK_INTEGRATION_PROVIDER_CATEGORIES,
  MOCK_INTEGRATION_PROVIDERS,
  MOCK_INTEGRATION_REVIEW_FINDINGS,
  MOCK_INTEGRATION_STATUS_SUMMARY,
  MOCK_WORKSPACES,
} from "@/lib/domain/mock-data";
import { ROUTES, settingsIntegrationDetailRoute } from "@/lib/navigation/routes";

export function IntegrationProviderCatalog({ activeProviderId }: { activeProviderId?: string }) {
  const workspace = MOCK_WORKSPACES[0];
  const providers = MOCK_INTEGRATION_PROVIDERS;
  const provider =
    providers.find((item) => item.id === activeProviderId) ?? providers[0];
  const category =
    MOCK_INTEGRATION_PROVIDER_CATEGORIES.find((item) => item.id === provider.categoryId) ??
    MOCK_INTEGRATION_PROVIDER_CATEGORIES[0];
  const connection =
    MOCK_INTEGRATION_CONNECTIONS.find((item) => item.providerId === provider.id) ??
    MOCK_INTEGRATION_CONNECTIONS[0];
  const scopes = provider.scopeIds
    .map((scopeId) => MOCK_INTEGRATION_PERMISSION_SCOPES.find((scope) => scope.id === scopeId))
    .filter((scope): scope is (typeof MOCK_INTEGRATION_PERMISSION_SCOPES)[number] => Boolean(scope));
  const findings = connection.findingIds
    .map((findingId) => MOCK_INTEGRATION_REVIEW_FINDINGS.find((finding) => finding.id === findingId))
    .filter((finding): finding is (typeof MOCK_INTEGRATION_REVIEW_FINDINGS)[number] => Boolean(finding));
  const activityEvents = connection.activityEventIds
    .map((eventId) => MOCK_INTEGRATION_ACTIVITY_EVENTS.find((event) => event.id === eventId))
    .filter((event): event is (typeof MOCK_INTEGRATION_ACTIVITY_EVENTS)[number] => Boolean(event));
  const actionPreviews = connection.actionPreviewIds
    .map((actionId) => MOCK_INTEGRATION_ACTION_PREVIEWS.find((action) => action.id === actionId))
    .filter((action): action is (typeof MOCK_INTEGRATION_ACTION_PREVIEWS)[number] => Boolean(action));

  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Integrations</span>
        <h1 className="surface-heading__title">Mock provider catalog for {workspace.name}</h1>
        <p className="surface-heading__copy">
          Review local provider categories, connection states, permission scopes, and safety
          findings without any real OAuth or provider API activity.
        </p>
      </section>

      <IntegrationSafetyNote />

      <section className="shell__section auth-panel">
        <div className="session-panel__header">
          <span className="section-note">Catalog summary</span>
          <span className="workspace-pill workspace-pill--accent">
            {MOCK_INTEGRATION_STATUS_SUMMARY.totalProviders} providers
          </span>
        </div>
        <div className="settings-grid">
          <article className="settings-card">
            <span className="settings-card__label">Categories</span>
            <span className="settings-card__title">
              {MOCK_INTEGRATION_STATUS_SUMMARY.totalCategories} local groups
            </span>
            <p className="card-copy">Provider categories are static review labels only.</p>
          </article>
          <article className="settings-card">
            <span className="settings-card__label">Permission scopes</span>
            <span className="settings-card__title">
              {MOCK_INTEGRATION_STATUS_SUMMARY.totalScopes} preview scopes
            </span>
            <p className="card-copy">Scopes describe intended access and do not grant it.</p>
          </article>
          <article className="settings-card">
            <span className="settings-card__label">Connection records</span>
            <span className="settings-card__title">
              {MOCK_INTEGRATION_STATUS_SUMMARY.totalConnections} local records
            </span>
            <p className="card-copy">Connection state is read-only and mock-local.</p>
          </article>
        </div>
      </section>

      <DisabledIntegrationActions actions={MOCK_INTEGRATION_ACTION_PREVIEWS} />

      <section className="shell__section auth-panel">
        <div className="session-panel__header">
          <span className="section-note">Provider categories</span>
          <span className="workspace-pill workspace-pill--accent">
            {MOCK_INTEGRATION_PROVIDER_CATEGORIES.length} categories
          </span>
        </div>
        <div className="settings-grid">
          {MOCK_INTEGRATION_PROVIDER_CATEGORIES.map((item) => (
            <IntegrationCategoryCard
              key={item.id}
              category={item}
              providerCount={providers.filter((providerItem) => providerItem.categoryId === item.id).length}
            />
          ))}
        </div>
      </section>

      <section className="shell__section auth-panel">
        <div className="session-panel__header">
          <span className="section-note">Provider catalog</span>
          <span className="workspace-pill workspace-pill--accent">
            {providers.length} local providers
          </span>
        </div>
        <div className="settings-grid">
          {providers.map((item) => {
            const itemConnection =
              MOCK_INTEGRATION_CONNECTIONS.find((record) => record.providerId === item.id) ??
              MOCK_INTEGRATION_CONNECTIONS[0];
            const itemCategory =
              MOCK_INTEGRATION_PROVIDER_CATEGORIES.find((categoryItem) => categoryItem.id === item.categoryId) ??
              MOCK_INTEGRATION_PROVIDER_CATEGORIES[0];

            return (
              <IntegrationProviderCard
                active={item.id === provider.id}
                categoryTitle={itemCategory.title}
                connection={itemConnection}
                key={item.id}
                provider={item}
              />
            );
          })}
        </div>
        {activeProviderId ? (
          <Link className="settings-link" href={ROUTES.settingsIntegrations}>
            Back to catalog
          </Link>
        ) : (
          <Link className="settings-link" href={settingsIntegrationDetailRoute(provider.id)}>
            Open selected provider review
          </Link>
        )}
      </section>

      <IntegrationProviderDetail
        actionPreviews={actionPreviews}
        activityEvents={activityEvents}
        category={category}
        connection={connection}
        findings={findings}
        workspaceName={workspace.name}
        provider={provider}
        scopes={scopes}
      />
    </main>
  );
}
