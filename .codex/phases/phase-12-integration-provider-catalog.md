# Phase 12 — Integration Provider Catalog and Connection Review UI

Status: pending

## Goal

Add a mock/local-only integration provider catalog and connection review UI so TerminalFlow can represent external providers, permission scopes, connection status, risk notes, and disabled connection actions without implementing real OAuth, API calls, token exchange, webhooks, sync jobs, backend integrations, or credential usage.

## Why this phase is next

Phase 11 defined the secrets vault and credential safety boundary. Phase 12 should define how TerminalFlow represents external integrations before any real OAuth, provider APIs, tokens, webhooks, sync workers, backend jobs, or provider-specific credentials are introduced.

## In scope

- add mock integration provider catalog UI
- add typed provider and connection metadata models
- add static/mock provider records
- add static/mock connection status records
- add provider category cards
- add integration detail/review surface
- add required permission scopes preview
- add risk and safety notes
- add mock integration activity events
- add disabled connect/disconnect/reconnect/sync actions
- add visible copy explaining integrations are mock/local-only
- preserve existing routes and behavior from prior phases

## Out of scope

- real OAuth
- GitHub OAuth
- provider API calls
- token exchange
- token storage
- refresh tokens
- webhook creation
- webhook receivers
- sync jobs
- background workers
- backend integrations
- provider SDKs
- secret usage
- credential storage
- API routes
- route handlers
- server actions
- middleware auth
- database persistence for connections
- cloud sync
- remote execution
- SSH
- PTY
- WebSockets
- streaming logs
- workflow runners
- queues
- deployment logic

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(tabs)/settings/page.tsx
- app/(tabs)/settings/integrations/page.tsx
- app/(tabs)/settings/integrations/[providerId]/page.tsx
- app/globals.css
- lib/domain/types.ts
- lib/domain/mock-data.ts
- lib/navigation/routes.ts
- components/settings/integration-provider-catalog.tsx
- components/settings/integration-provider-card.tsx
- components/settings/integration-provider-detail.tsx
- components/settings/integration-category-card.tsx
- components/settings/integration-permission-scope-list.tsx
- components/settings/integration-activity-list.tsx
- components/settings/disabled-integration-actions.tsx
- components/settings/integration-safety-note.tsx

## Product vocabulary

Extend or reuse the existing model to support:

- IntegrationProvider
- IntegrationProviderCategory
- IntegrationConnection
- IntegrationConnectionStatus
- IntegrationPermissionScope
- IntegrationRiskLevel
- IntegrationActivityEvent
- IntegrationReviewFinding
- IntegrationActionPreview

These are TypeScript types and local/static mock data only. Do not wire them to real OAuth, provider APIs, tokens, webhooks, background jobs, or backend services.

## Integration safety requirements

- Integrations must be mock/local-only.
- No real OAuth provider may be configured.
- No provider API calls may be added.
- No token exchange, token storage, refresh tokens, or credential usage may be added.
- No API routes, route handlers, server actions, middleware auth, backend calls, webhooks, sync jobs, or workers may be added.
- Connect, disconnect, reconnect, sync, authorize, and revoke actions must render but must not perform real actions.
- Permission scopes must be preview metadata only.
- Integration activity must come from local/static mock data only.
- The UI must clearly state that integrations are not active in this phase.

## UX requirements

- Settings exposes an integrations/provider catalog surface.
- Integration providers render from local/static mock data.
- Provider categories are visible.
- At least one integration detail/review page or panel exists.
- Permission scopes preview is visible.
- Connection status metadata is visible.
- Integration risk/safety notes are visible.
- Mock activity events are visible.
- Connect, disconnect, reconnect, sync, authorize, and revoke controls are disabled or simulated only.
- The UI remains usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Integrations are mocked locally in this phase. No OAuth, provider API calls, token exchange, webhooks, sync jobs, or backend connections are active.

## Tasks

1. Inspect the existing Phase 11 scaffold.
2. Extend integration provider, connection, permission scope, risk, and activity types.
3. Add static/mock integration providers, categories, connection status records, scopes, and activity events.
4. Add a Settings integrations/provider catalog surface.
5. Add integration provider cards.
6. Add provider category cards.
7. Add provider detail or review surface.
8. Add permission scopes preview UI.
9. Add integration risk/safety notes.
10. Add disabled connect/disconnect/reconnect/sync/authorize/revoke action UI.
11. Add visible mock-integrations safety copy.
12. Ensure no real OAuth, provider calls, tokens, webhooks, sync jobs, workers, API routes, route handlers, server actions, middleware auth, backend calls, credential usage, or secret usage are added.
13. Run validation.
14. Update this phase file with validation evidence.

## Acceptance criteria

- Settings exposes an integrations/provider catalog UI.
- At least one mock integration provider exists.
- At least one provider category exists.
- At least one provider detail or review surface exists.
- At least one permission scope preview exists.
- At least one connection status record exists.
- At least one mock integration activity event exists.
- Connect, disconnect, reconnect, sync, authorize, and revoke controls are disabled or simulated only.
- Required mock-integrations safety copy is visible in the UI.
- No real OAuth, GitHub OAuth, provider API call, token exchange, token storage, webhook, sync job, worker, provider SDK, credential storage, secret usage, API route, route handler, server action, middleware auth, database connection persistence, cloud sync, WebSocket, SSH, PTY, terminal runtime, queue, background job, runner, streaming, real log ingestion, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Pending.
