"use client";

import { DisabledSecretActions } from "@/components/settings/disabled-secret-actions";
import { SecretAccessPolicyPanel } from "@/components/settings/secret-access-policy-panel";
import { SecretActivityList } from "@/components/settings/secret-activity-list";
import { SecretCategoryCard } from "@/components/settings/secret-category-card";
import { SecretMetadataCard } from "@/components/settings/secret-metadata-card";
import { SecretsSafetyNote } from "@/components/settings/secrets-safety-note";
import {
  MOCK_SECRET_ACCESS_POLICIES,
  MOCK_SECRET_ACTIVITY_EVENTS,
  MOCK_SECRET_CATEGORIES,
  MOCK_SECRET_METADATA,
  MOCK_WORKSPACES,
} from "@/lib/domain/mock-data";
import { getMockWorkspace, useMockAuthState } from "@/lib/auth/mock-auth";

export function SecretsVaultPanel() {
  const authState = useMockAuthState();
  const workspace =
    getMockWorkspace(authState.session?.activeWorkspaceId ?? null) ?? MOCK_WORKSPACES[0];

  const secrets = MOCK_SECRET_METADATA;
  const categories = MOCK_SECRET_CATEGORIES;
  const policy =
    MOCK_SECRET_ACCESS_POLICIES.find((item) => item.workspaceId === workspace.id) ??
    MOCK_SECRET_ACCESS_POLICIES[0];
  const categoryTitleById = Object.fromEntries(
    categories.map((category) => [category.id, category.title]),
  ) as Record<string, string>;

  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Secrets vault</span>
        <h1 className="surface-heading__title">Metadata-only vault review for {workspace.name}</h1>
        <p className="surface-heading__copy">
          Review local secret metadata, access policy previews, and audit-style activity without exposing any secret values.
        </p>
      </section>

      <DisabledSecretActions />

      <section className="shell__section auth-panel">
        <div className="session-panel__header">
          <span className="section-note">Secret records</span>
          <span className="workspace-pill workspace-pill--accent">{secrets.length} records</span>
        </div>
        <div className="settings-grid">
          {secrets.map((secret) => (
            <SecretMetadataCard
              key={secret.id}
              secret={secret}
              categoryTitle={categoryTitleById[secret.categoryId] ?? secret.categoryId}
            />
          ))}
        </div>
      </section>

      <section className="shell__section auth-panel">
        <div className="session-panel__header">
          <span className="section-note">Credential categories</span>
          <span className="workspace-pill workspace-pill--accent">{categories.length} categories</span>
        </div>
        <div className="settings-grid">
          {categories.map((category) => (
            <SecretCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <SecretAccessPolicyPanel policy={policy} />
      <SecretActivityList events={MOCK_SECRET_ACTIVITY_EVENTS} />
      <SecretsSafetyNote />
    </main>
  );
}
