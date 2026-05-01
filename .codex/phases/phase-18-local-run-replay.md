# Phase 18 — Local Run Persistence and Simulation Replay UI

Status: pending

## Goal

Add local-only persistence and replay UI for simulated execution runs so TerminalFlow can save, browse, inspect, compare, reset, and replay simulated run snapshots without real execution persistence, backend databases, cloud sync, API routes, server actions, queues, workers, WebSockets, telemetry, SSH, PTY, host access, or workflow runners.

## Why this phase is next

Phase 17 added a browser-local execution simulator and controlled run state UI. Phase 18 should persist and replay those simulated outcomes locally so TerminalFlow can test run history, replay, and comparison behavior before introducing real execution, backend persistence, synchronization, queues, workers, telemetry, or host access.

## In scope

- add local-only simulated run snapshot persistence
- add saved simulation run history UI
- add saved simulated run detail UI
- add simulation replay UI
- add simulated run comparison UI
- add reset/clear saved simulations UI
- add typed persisted simulation snapshot models
- add local store helpers for saving and reading simulation snapshots
- add visible copy explaining replay data is local-only
- preserve existing routes and behavior from prior phases

## Out of scope

- real execution persistence
- backend database
- cloud sync
- API routes
- route handlers
- server actions
- middleware auth
- queues
- workers
- background jobs
- WebSockets
- real streaming logs
- telemetry collection
- real command execution
- shell execution
- terminal runtime
- host execution
- host access
- SSH
- PTY
- real workflow runners
- provider sync
- webhook ingestion
- secret usage
- credential usage
- deployment logic

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(tabs)/workflows/[workflowId]/runs/page.tsx
- app/(tabs)/workflows/[workflowId]/runs/[runId]/page.tsx
- app/(tabs)/workflows/[workflowId]/runs/replay/page.tsx
- app/(tabs)/workflows/[workflowId]/runs/compare/page.tsx
- app/(tabs)/workflows/[workflowId]/plan/page.tsx
- app/(tabs)/settings/page.tsx
- app/globals.css
- lib/domain/types.ts
- lib/domain/mock-data.ts
- lib/navigation/routes.ts
- lib/storage/schema.ts
- lib/storage/storage-types.ts
- lib/storage/local-store.ts
- lib/storage/seed.ts
- lib/storage/migrations.ts
- lib/simulation/execution-simulator.ts
- components/runs/run-card.tsx
- components/runs/run-detail-header.tsx
- components/runs/run-log-viewer.tsx
- components/simulation-replay/saved-simulation-history.tsx
- components/simulation-replay/saved-simulation-card.tsx
- components/simulation-replay/simulation-replay-panel.tsx
- components/simulation-replay/simulation-comparison-panel.tsx
- components/simulation-replay/simulation-snapshot-detail.tsx
- components/simulation-replay/reset-simulations-panel.tsx
- components/simulation-replay/simulation-replay-safety-note.tsx
- components/settings/local-simulation-storage-panel.tsx

## Product vocabulary

Extend or reuse the existing model to support:

- PersistedSimulationRunSnapshot
- SimulationReplaySession
- SimulationReplayStatus
- SimulationReplayFrame
- SimulationComparison
- SimulationComparisonFinding
- SavedSimulationRun
- SimulationSnapshotSource
- SimulationReplayActionPreview
- LocalSimulationStorageStatus

These are TypeScript types and browser-local/static mock data only. Do not wire them to real execution, backend persistence, queues, workers, sockets, host access, telemetry, or command handling.

## Local replay safety requirements

- Saved simulation data must be local-only.
- Replay data must come from browser-local storage or local/static mock data only.
- No real execution persistence may be added.
- No backend database may be added.
- No cloud sync may be added.
- No API routes, route handlers, server actions, middleware auth, backend calls, queues, workers, WebSockets, or background jobs may be added.
- No telemetry collection may be added.
- No host access may be added.
- No shell execution may be added.
- Save snapshot, replay, compare, export, clear, and restore actions may update local UI or local browser storage only.
- The UI must clearly state that simulation replay and history are local-only in this phase.

## UX requirements

- A saved simulation history surface is visible from workflow runs, run detail, simulator, or settings.
- At least one saved simulated run snapshot is visible.
- A replay panel shows simulated replay frames or ordered state snapshots.
- A comparison panel shows static/local comparison findings between simulated runs.
- A saved run detail view shows snapshot metadata, status, steps, and logs.
- Reset/clear saved simulations controls are visible.
- Save/replay/compare/export/clear controls affect only local UI or local browser storage.
- The UI remains usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Simulation replay and run history are local-only in this phase. No backend database, cloud sync, real execution logs, queues, workers, sockets, telemetry, or host access are active.

## Tasks

1. Inspect the existing Phase 17 scaffold.
2. Extend persisted simulation snapshot, replay, comparison, frame, and local-storage status types.
3. Extend the local store schema for saved simulated run snapshots.
4. Add seed data or derive demo snapshots from existing simulated runs.
5. Add local store helpers for saving, reading, clearing, and resetting saved simulated runs.
6. Add saved simulation history UI.
7. Add saved simulation detail UI.
8. Add simulation replay UI.
9. Add simulation comparison UI.
10. Add reset/clear simulations UI.
11. Link saved simulation history from workflow runs, simulator, or settings.
12. Add visible local-only replay safety copy.
13. Ensure no real execution persistence, backend database, cloud sync, telemetry, workers, queues, WebSockets, API routes, route handlers, server actions, backend calls, credential usage, secret usage, or host access are added.
14. Run validation.
15. Update this phase file with validation evidence.

## Acceptance criteria

- Saved simulation history surface resolves or is reachable from an existing workflow run, simulator, or settings surface.
- At least one local/static or local-store seeded simulation snapshot exists.
- Saved run detail renders snapshot metadata, status, steps, and logs.
- Replay panel renders ordered replay frames or state snapshots.
- Comparison panel renders local/static comparison findings.
- Reset/clear saved simulations controls are visible.
- Save/replay/compare/export/clear controls affect only local UI or local browser storage.
- Required local-only replay safety copy is visible in the UI.
- No real execution persistence, backend database, cloud sync, API route, route handler, server action, middleware auth, backend call, worker, queue, background job, WebSocket, telemetry collection, real streaming log, provider sync, webhook ingestion, real command execution, shell execution, SSH, PTY, terminal runtime, runner, real log ingestion, remote execution, host access, credential usage, secret usage, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Pending.
