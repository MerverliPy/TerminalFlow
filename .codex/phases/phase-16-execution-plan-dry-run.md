# Phase 16 — Local Execution Plan Builder and Dry-Run Summary UI

Status: completed

## Goal

Add a mock/local-only execution plan builder and dry-run summary UI so TerminalFlow can show exactly what would be executed after preflight review without performing real approvals, command execution, shell execution, workflow execution, host access, backend orchestration, queues, workers, API routes, server actions, SSH, PTY, WebSockets, telemetry, or provider sync.

## Why this phase is next

Phase 15 added the execution readiness gate and preflight review UI. Phase 16 should convert that preflight context into a local execution plan preview and dry-run summary before any real execution system, command handler, host bridge, queue, worker, backend job, provider sync, or telemetry is introduced.

## In scope

- add local execution plan builder UI
- add dry-run summary UI
- add typed execution plan and dry-run models
- add static/mock execution plan records
- add static/mock execution plan steps
- add workflow-to-plan mapping preview
- add host/session/command mapping preview
- add estimated duration and risk summary
- add static dependency/ordering preview
- add disabled confirm/start/export/share actions
- add visible copy explaining dry-run data is local/static
- preserve existing routes and behavior from prior phases

## Out of scope

- real execution
- real approvals
- real workflow execution
- real command execution
- shell execution
- terminal runtime
- host execution
- host access
- SSH
- PTY
- WebSockets
- streaming logs
- backend orchestration
- backend checks
- provider sync
- webhook ingestion
- telemetry collection
- background jobs
- queues
- workers
- API routes
- route handlers
- server actions
- middleware auth
- database persistence for execution plans
- cloud sync
- deployment logic
- real workflow runner
- secret usage
- credential usage

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(tabs)/workflows/[workflowId]/plan/page.tsx
- app/(tabs)/workflows/[workflowId]/preflight/page.tsx
- app/(tabs)/workflows/[workflowId]/preview/page.tsx
- app/(tabs)/workflows/[workflowId]/page.tsx
- app/(tabs)/health/page.tsx
- app/globals.css
- lib/domain/types.ts
- lib/domain/mock-data.ts
- lib/navigation/routes.ts
- components/execution-plan/execution-plan-builder.tsx
- components/execution-plan/execution-plan-step-card.tsx
- components/execution-plan/dry-run-summary.tsx
- components/execution-plan/execution-plan-mapping-panel.tsx
- components/execution-plan/execution-plan-risk-panel.tsx
- components/execution-plan/execution-plan-dependency-panel.tsx
- components/execution-plan/disabled-execution-plan-actions.tsx
- components/execution-plan/execution-plan-safety-note.tsx
- components/preflight/execution-readiness-gate.tsx

## Product vocabulary

Extend or reuse the existing model to support:

- LocalExecutionPlan
- LocalExecutionPlanStep
- LocalExecutionPlanStatus
- LocalExecutionPlanRiskLevel
- LocalExecutionPlanDependency
- DryRunSummary
- DryRunFinding
- DryRunFindingSeverity
- ExecutionPlanActionPreview
- ExecutionPlanMapping

These are TypeScript types and local/static mock data only. Do not wire them to real execution, backend orchestration, queues, workers, host access, or command handling.

## Dry-run safety requirements

- Execution plan data must be mock/local-only.
- Dry-run summaries must come from local/static mock data only.
- No real approval flow may be added.
- No execution action may perform a real command or workflow run.
- No shell execution may be added.
- No host access may be added.
- No telemetry collection may be added.
- No provider sync may be added.
- No API routes, route handlers, server actions, middleware auth, backend calls, queues, workers, or background jobs may be added.
- Confirm plan, start run, export plan, share plan, refresh estimate, and approve dry-run actions must render but must not perform real actions.
- The UI must clearly state that execution plans and dry-runs are local/static in this phase.

## UX requirements

- An execution plan or dry-run route is reachable from a workflow detail, preview, or preflight page.
- An execution plan builder surface is visible.
- A dry-run summary is visible.
- Plan steps render from local/static mock data.
- Workflow, host, session, and command mappings are visible.
- Estimated duration and risk summary are visible.
- Dependency or step ordering preview is visible.
- Disabled confirm/start/export/share controls are visible.
- The UI remains usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Execution plans and dry-runs are mocked locally in this phase. No real approvals, command execution, workflow runs, backend orchestration, queues, workers, or host access are active.

## Tasks

1. Inspect the existing Phase 15 scaffold.
2. Extend execution plan, dry-run, mapping, dependency, risk, and action-preview types.
3. Add static/mock execution plans, plan steps, dry-run summaries, mappings, dependencies, and findings.
4. Add an execution plan route and route helper.
5. Link workflow detail, preview, or preflight surfaces to the execution plan.
6. Add execution plan builder UI.
7. Add dry-run summary UI.
8. Add execution mapping panel.
9. Add risk and estimated-duration panel.
10. Add dependency/order preview panel.
11. Add disabled confirm/start/export/share/refresh/approve action UI.
12. Add visible local/static execution-plan safety copy.
13. Ensure no real approvals, execution, command handling, shell execution, host access, backend orchestration, telemetry, provider sync, webhook ingestion, workers, queues, API routes, route handlers, server actions, backend calls, credential usage, secret usage, or host access are added.
14. Run validation.
15. Update this phase file with validation evidence.

## Acceptance criteria

- Execution plan or dry-run route resolves.
- Execution plan surface is reachable from at least one workflow detail, preview, or preflight surface.
- At least one local/static execution plan exists.
- At least one local/static execution plan step exists.
- At least one dry-run summary exists.
- Workflow, host, session, and command mappings are represented.
- Estimated duration and risk summary are represented.
- Dependency or ordering preview is represented.
- Disabled or simulated actions are shown for confirm plan, start run, export plan, share plan, refresh estimate, and approve dry-run behavior.
- Required mock-dry-run safety copy is visible in the UI.
- No real approval, real workflow execution, real command execution, shell execution, backend orchestration, backend check, telemetry collection, provider sync, webhook ingestion, worker, queue, background job, database execution-plan persistence, API route, route handler, server action, middleware auth, cloud sync, credential usage, secret usage, WebSocket, SSH, PTY, terminal runtime, runner, streaming, real log ingestion, remote execution, host access, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Completed locally on 2026-05-01.

Validation evidence:

- Command: `npm run typecheck`
- Result: passed
