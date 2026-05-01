# Phase 14 — Project Health Dashboard and Readiness Review UI

Status: pending

## Goal

Add a mock/local-only project health dashboard and readiness review UI so TerminalFlow can summarize workspace readiness, project health, host readiness, workflow readiness, integration readiness, secrets/vault readiness, notification posture, and safety gaps without implementing real audits, telemetry, provider sync, backend analytics, execution checks, API routes, server actions, workers, or workflow runners.

## Why this phase is next

Phase 13 added a mock/local-only notification center and alert review UI. Phase 14 should consolidate the existing static surfaces into a single readiness dashboard before TerminalFlow introduces real checks, execution, remote hosts, provider sync, workflow runners, telemetry, or backend analytics.

## In scope

- add project health dashboard UI
- add typed readiness and health review models
- add static/mock readiness scorecards
- add workspace readiness summary
- add project readiness summary
- add host readiness summary
- add workflow readiness summary
- add integration readiness summary
- add secrets/vault readiness summary
- add notification/alert readiness summary
- add local/static review findings
- add disabled fix/run-audit/export-report actions
- add visible copy explaining readiness data is local/static
- preserve existing routes and behavior from prior phases

## Out of scope

- real auditing
- real checks
- backend analytics
- telemetry collection
- provider sync
- webhook ingestion
- background jobs
- queues
- workers
- real readiness scoring
- API routes
- route handlers
- server actions
- middleware auth
- database analytics persistence
- cloud sync
- remote execution
- SSH
- PTY
- WebSockets
- streaming logs
- workflow runners
- deployment logic
- secret usage
- credential usage

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(tabs)/health/page.tsx
- app/(tabs)/projects/page.tsx
- app/(tabs)/settings/page.tsx
- app/(tabs)/layout.tsx
- app/globals.css
- lib/domain/types.ts
- lib/domain/mock-data.ts
- lib/navigation/routes.ts
- components/health/project-health-dashboard.tsx
- components/health/readiness-score-card.tsx
- components/health/readiness-summary-grid.tsx
- components/health/readiness-finding-card.tsx
- components/health/readiness-category-panel.tsx
- components/health/workspace-readiness-panel.tsx
- components/health/disabled-health-actions.tsx
- components/health/health-safety-note.tsx
- components/settings/readiness-review-panel.tsx

## Product vocabulary

Extend or reuse the existing model to support:

- ProjectHealthSummary
- ReadinessScore
- ReadinessCategory
- ReadinessStatus
- ReadinessFinding
- ReadinessFindingSeverity
- ReadinessReview
- ReadinessActionPreview
- WorkspaceReadinessSnapshot
- HealthDashboardMetric

These are TypeScript types and local/static mock data only. Do not wire them to real checks, analytics, telemetry, provider sync, backend jobs, or execution systems.

## Readiness safety requirements

- Readiness data must be mock/local-only.
- Scores and findings must come from local/static mock data only.
- No real audit engine may be added.
- No telemetry collection may be added.
- No provider sync may be added.
- No API routes, route handlers, server actions, middleware auth, backend calls, queues, workers, or background jobs may be added.
- Fix, run audit, refresh checks, export report, and open issue actions must render but must not perform real actions.
- Health metrics must be preview metadata only.
- The UI must clearly state that readiness and health data are local/static in this phase.

## UX requirements

- A Health or Readiness surface is reachable from app navigation.
- Dashboard scorecards render from local/static mock data.
- Workspace readiness is visible.
- Project readiness is visible.
- Host readiness is visible.
- Workflow readiness is visible.
- Integration readiness is visible.
- Secrets/vault readiness is visible.
- Notification/alert readiness is visible.
- At least one readiness finding is visible.
- Disabled fix/run-audit/export-report controls are visible.
- The UI remains usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Project health and readiness data are mocked locally in this phase. No real audits, telemetry, provider sync, backend checks, or execution systems are active.

## Tasks

1. Inspect the existing Phase 13 scaffold.
2. Extend readiness, health, score, finding, status, and action-preview types.
3. Add static/mock health dashboard metrics, readiness snapshots, categories, scorecards, and findings.
4. Add a Health or Readiness route and navigation entry.
5. Add project health dashboard UI.
6. Add readiness scorecards.
7. Add category readiness panels.
8. Add workspace readiness summary.
9. Add readiness findings list.
10. Add disabled fix/run-audit/export-report/open-issue action UI.
11. Add visible local/static readiness safety copy.
12. Add a Settings readiness review panel if useful.
13. Ensure no real audits, telemetry, provider sync, webhook ingestion, workers, queues, API routes, route handlers, server actions, backend calls, credential usage, secret usage, or execution logic are added.
14. Run validation.
15. Update this phase file with validation evidence.

## Acceptance criteria

- Health or readiness dashboard route resolves.
- Health/readiness route is reachable from app navigation.
- At least one readiness scorecard exists.
- At least one readiness category panel exists.
- At least one readiness finding exists.
- Workspace, project, host, workflow, integration, secrets/vault, and notification readiness are represented.
- Disabled or simulated actions are shown for fix, run audit, refresh checks, export report, and open issue behavior.
- Required mock-readiness safety copy is visible in the UI.
- No real audit, telemetry collection, provider sync, webhook ingestion, worker, queue, background job, backend check, database analytics persistence, API route, route handler, server action, middleware auth, cloud sync, credential usage, secret usage, WebSocket, SSH, PTY, terminal runtime, runner, streaming, real log ingestion, remote execution, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Pending.
