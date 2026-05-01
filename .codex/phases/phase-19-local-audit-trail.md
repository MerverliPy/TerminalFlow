# Phase 19 — Local Audit Trail and Change History UI

Status: pending

## Goal

Add a mock/local-only audit trail and change history UI so TerminalFlow can show important user actions, simulated system events, workspace changes, run simulation events, storage resets, permission reviews, vault metadata changes, integration reviews, notification changes, and readiness/preflight events without backend audit storage, telemetry collection, event ingestion, API routes, server actions, queues, workers, WebSockets, real execution, or host access.

## Why this phase is next

Phase 18 added local run persistence and simulation replay UI. Phase 19 should make local-only history visible across the product so TerminalFlow can review what changed and when before introducing real audit storage, backend events, telemetry, synchronization, execution systems, or provider integrations.

## In scope

- add local/mock audit trail UI
- add local/mock change history UI
- add typed audit event and change history models
- add static/mock audit event records
- add local audit event categories
- add actor/source metadata
- add affected resource metadata
- add severity/status metadata
- add audit timeline UI
- add change history detail UI
- add local-only filters/search-looking controls
- add disabled export/clear/restore/acknowledge actions
- add visible copy explaining audit data is local/static
- preserve existing routes and behavior from prior phases

## Out of scope

- backend audit storage
- telemetry collection
- analytics ingestion
- event ingestion
- real audit logging
- remote audit sync
- provider sync
- webhook ingestion
- API routes
- route handlers
- server actions
- middleware auth
- database persistence for audit events
- cloud sync
- background jobs
- queues
- workers
- WebSockets
- streaming logs
- real command execution
- shell execution
- terminal runtime
- real workflow execution
- host execution
- host access
- SSH
- PTY
- deployment logic
- real workflow runners
- secret usage
- credential usage

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(tabs)/settings/page.tsx
- app/(tabs)/settings/audit/page.tsx
- app/(tabs)/settings/audit/[eventId]/page.tsx
- app/(tabs)/health/page.tsx
- app/globals.css
- lib/domain/types.ts
- lib/domain/mock-data.ts
- lib/navigation/routes.ts
- lib/storage/schema.ts
- lib/storage/storage-types.ts
- lib/storage/local-store.ts
- lib/storage/seed.ts
- lib/storage/migrations.ts
- components/audit/audit-trail.tsx
- components/audit/audit-event-card.tsx
- components/audit/audit-event-detail.tsx
- components/audit/audit-category-card.tsx
- components/audit/audit-timeline.tsx
- components/audit/change-history-panel.tsx
- components/audit/audit-filter-panel.tsx
- components/audit/audit-status-badge.tsx
- components/audit/disabled-audit-actions.tsx
- components/audit/audit-safety-note.tsx
- components/settings/audit-summary-panel.tsx

## Product vocabulary

Extend or reuse the existing model to support:

- LocalAuditEvent
- LocalAuditEventCategory
- LocalAuditEventSeverity
- LocalAuditEventStatus
- LocalAuditActor
- LocalAuditResource
- LocalChangeHistoryEntry
- LocalChangeSet
- LocalAuditTimelineItem
- LocalAuditActionPreview
- LocalAuditFilterPreview
- LocalAuditStorageStatus

These are TypeScript types and browser-local/static mock data only. Do not wire them to backend audit storage, telemetry, queues, workers, sockets, provider sync, host access, or execution systems.

## Audit safety requirements

- Audit data must be local/mock-only.
- Change history data must come from browser-local storage or local/static mock data only.
- No backend audit storage may be added.
- No telemetry collection may be added.
- No analytics or event ingestion may be added.
- No provider sync may be added.
- No API routes, route handlers, server actions, middleware auth, backend calls, queues, workers, WebSockets, or background jobs may be added.
- No host access may be added.
- No shell execution may be added.
- Export audit log, clear history, restore event, acknowledge event, and open affected resource controls may render but must not perform real external actions.
- The UI must clearly state that audit trail and change history are local/static in this phase.

## UX requirements

- An audit trail or change history surface is reachable from Settings.
- At least one audit summary panel is visible from Settings.
- At least one audit event detail surface exists.
- Audit events render from local/static or local-store seeded data.
- Audit timeline renders ordered events.
- Change history panel renders local/static change entries.
- Category, severity, status, actor, and affected resource metadata are visible.
- Filter/search-looking controls render as local-only preview controls.
- Export, clear, restore, acknowledge, and open-resource controls are disabled or simulated only.
- The UI remains usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Audit trail and change history are mocked locally in this phase. No backend audit storage, telemetry, event ingestion, queues, workers, sockets, provider sync, or host access are active.

## Tasks

1. Inspect the existing Phase 18 scaffold.
2. Extend audit event, change history, actor, resource, status, severity, and action-preview types.
3. Add static/mock audit events, timeline items, change history entries, categories, and storage status data.
4. Extend local store schema for local audit trail data if useful.
5. Add local store seed/reset helpers for audit data if useful.
6. Add Settings audit summary panel.
7. Add audit trail route and route helper.
8. Add audit event detail route and route helper.
9. Add audit timeline UI.
10. Add audit event cards.
11. Add change history panel.
12. Add local-only filter/search-looking controls.
13. Add disabled export/clear/restore/acknowledge/open-resource action UI.
14. Add visible local/static audit safety copy.
15. Ensure no backend audit storage, telemetry, event ingestion, provider sync, workers, queues, API routes, route handlers, server actions, backend calls, credential usage, secret usage, WebSockets, or host access are added.
16. Run validation.
17. Update this phase file with validation evidence.

## Acceptance criteria

- Audit trail or change history surface resolves.
- Audit surface is reachable from Settings.
- At least one audit summary panel exists.
- At least one local/static or local-store seeded audit event exists.
- At least one audit event detail surface exists.
- At least one change history entry exists.
- Audit timeline renders ordered events.
- Category, severity, status, actor, and affected resource metadata are visible.
- Filter/search-looking preview controls are visible.
- Disabled or simulated actions are shown for export audit log, clear history, restore event, acknowledge event, and open affected resource.
- Required local-only audit safety copy is visible in the UI.
- No backend audit storage, telemetry collection, analytics ingestion, event ingestion, API route, route handler, server action, middleware auth, backend call, worker, queue, background job, WebSocket, provider sync, webhook ingestion, real command execution, shell execution, SSH, PTY, terminal runtime, runner, real log ingestion, remote execution, host access, credential usage, secret usage, cloud sync, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Pending.
