# Phase 15 — Execution Readiness Gate and Preflight Review UI

Status: complete

## Goal

Add a mock/local-only execution readiness gate and preflight review UI so TerminalFlow can represent whether a workspace, host, workflow, secrets boundary, integration state, notifications posture, and safety checks are ready before execution without implementing real approvals, real workflow execution, command execution, backend checks, queues, workers, API routes, server actions, SSH, PTY, WebSockets, or telemetry.

## Why this phase is next

Phase 14 added a project health dashboard and readiness review UI. Phase 15 should turn those readiness concepts into a formal pre-execution safety gate before TerminalFlow introduces any controlled execution, real command handling, backend orchestration, queues, workers, provider sync, or host access.

## In scope

- add execution preflight review UI
- add typed preflight gate and checklist models
- add static/mock preflight gate records
- add workspace readiness gate
- add host readiness gate
- add workflow readiness gate
- add secrets/vault readiness gate
- add integration readiness gate
- add notification/safety readiness gate
- add blocked/ready/warning states
- add static preflight findings
- add disabled approve-execution/start-run/override actions
- add visible copy explaining preflight is local/static
- preserve existing routes and behavior from prior phases

## Out of scope

- real execution approval
- real workflow execution
- real command execution
- shell execution
- terminal runtime
- host execution
- SSH
- PTY
- WebSockets
- streaming logs
- backend checks
- real audits
- telemetry collection
- provider sync
- webhook ingestion
- background jobs
- queues
- workers
- API routes
- route handlers
- server actions
- middleware auth
- database persistence for approvals
- cloud sync
- deployment logic
- real workflow runner
- secret usage
- credential usage

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(tabs)/health/page.tsx
- app/(tabs)/workflows/[workflowId]/preflight/page.tsx
- app/(tabs)/workflows/[workflowId]/page.tsx
- app/(tabs)/workflows/[workflowId]/preview/page.tsx
- app/globals.css
- lib/domain/types.ts
- lib/domain/mock-data.ts
- lib/navigation/routes.ts
- components/preflight/execution-readiness-gate.tsx
- components/preflight/preflight-checklist.tsx
- components/preflight/preflight-check-card.tsx
- components/preflight/preflight-finding-card.tsx
- components/preflight/preflight-status-badge.tsx
- components/preflight/preflight-summary-panel.tsx
- components/preflight/disabled-preflight-actions.tsx
- components/preflight/preflight-safety-note.tsx
- components/health/readiness-review-panel.tsx

## Product vocabulary

Extend or reuse the existing model to support:

- ExecutionPreflightGate
- ExecutionPreflightStatus
- ExecutionPreflightCheck
- ExecutionPreflightCheckCategory
- ExecutionPreflightFinding
- ExecutionPreflightFindingSeverity
- ExecutionApprovalPreview
- ExecutionReadinessSnapshot
- ExecutionGateActionPreview

These are TypeScript types and local/static mock data only. Do not wire them to real checks, approvals, backend jobs, queues, execution systems, or host access.

## Preflight safety requirements

- Preflight data must be mock/local-only.
- Readiness checks and findings must come from local/static mock data only.
- No real audit engine may be added.
- No real approval flow may be added.
- No execution action may perform a real command or workflow run.
- No telemetry collection may be added.
- No provider sync may be added.
- No API routes, route handlers, server actions, middleware auth, backend calls, queues, workers, or background jobs may be added.
- Approve execution, start run, override block, refresh checks, and export preflight report actions must render but must not perform real actions.
- The UI must clearly state that preflight gates are local/static in this phase.

## UX requirements

- A preflight or execution readiness surface is reachable from a workflow detail or preview page.
- A preflight gate summary is visible.
- Workspace readiness gate is visible.
- Host readiness gate is visible.
- Workflow readiness gate is visible.
- Secrets/vault readiness gate is visible.
- Integration readiness gate is visible.
- Notification/safety readiness gate is visible.
- Blocked, warning, and ready states are visually distinct.
- At least one static preflight finding is visible.
- Disabled approve/start/override controls are visible.
- The UI remains usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Execution preflight gates are mocked locally in this phase. No real approvals, backend checks, command execution, workflow runs, queues, workers, or host access are active.

## Tasks

1. Inspect the existing Phase 14 scaffold.
2. Extend preflight, gate, checklist, finding, status, and action-preview types.
3. Add static/mock preflight gates, readiness checks, summaries, and findings.
4. Add an execution preflight route and route helper.
5. Link workflow detail or preview surfaces to the preflight review.
6. Add execution readiness gate UI.
7. Add checklist and category cards.
8. Add preflight findings list.
9. Add blocked/ready/warning status badges.
10. Add disabled approve-execution/start-run/override/refresh/export action UI.
11. Add visible local/static preflight safety copy.
12. Add or update health/readiness surface to reference the execution gate if useful.
13. Ensure no real approvals, execution, command handling, backend checks, telemetry, provider sync, webhook ingestion, workers, queues, API routes, route handlers, server actions, backend calls, credential usage, secret usage, or host access are added.
14. Run validation.
15. Update this phase file with validation evidence.

## Acceptance criteria

- Execution preflight route or surface resolves.
- Preflight surface is reachable from at least one workflow detail or preview surface.
- At least one preflight gate summary exists.
- Workspace, host, workflow, secrets/vault, integration, and notification/safety readiness gates are represented.
- Blocked, warning, and ready states render from local/static data.
- At least one static preflight finding exists.
- Disabled or simulated actions are shown for approve execution, start run, override block, refresh checks, and export preflight report.
- Required mock-preflight safety copy is visible in the UI.
- No real approval, real workflow execution, real command execution, shell execution, backend check, telemetry collection, provider sync, webhook ingestion, worker, queue, background job, database approval persistence, API route, route handler, server action, middleware auth, cloud sync, credential usage, secret usage, WebSocket, SSH, PTY, terminal runtime, runner, streaming, real log ingestion, remote execution, host access, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Validation command: `npm run typecheck`

Validation result: passed.

Notes: execution readiness, preflight checks, findings, disabled actions, and local-only safety copy are implemented in the workflow preflight route and supporting components.
