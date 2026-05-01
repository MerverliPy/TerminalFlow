# Phase 17 — Local Execution Simulator and Controlled Run State UI

Status: pending

## Goal

Add a local-only execution simulator and controlled run state UI so TerminalFlow can simulate run lifecycle transitions, step progress, blocked states, and log append behavior without executing real commands, accessing hosts, calling APIs, creating backend jobs, using queues/workers, opening sockets, or touching secrets.

## Why this phase is next

Phase 16 added the local execution plan builder and dry-run summary. Phase 17 should introduce a safe local run-state simulation layer so TerminalFlow can test progress, lifecycle transitions, simulated logs, and run controls before any real shell execution, host bridge, workflow runner, backend orchestration, queue, worker, WebSocket, telemetry, or provider sync exists.

## In scope

- add local-only execution simulator
- add typed run state machine models
- add simulated run lifecycle states
- add simulated step progress
- add simulated log append behavior
- add local-only start/pause/resume/cancel/retry controls
- add static seeded simulator scenarios
- add blocked/warning/completed run states
- add visible copy explaining simulator is local-only
- preserve existing routes and behavior from prior phases

## Out of scope

- real shell execution
- real command execution
- real workflow execution
- terminal runtime
- host execution
- host access
- SSH
- PTY
- WebSockets
- streaming logs from real systems
- backend orchestration
- backend jobs
- queues
- workers
- API routes
- route handlers
- server actions
- middleware auth
- database persistence for simulator state
- cloud sync
- provider sync
- webhook ingestion
- telemetry collection
- deployment logic
- real workflow runner
- secret usage
- credential usage

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(tabs)/workflows/[workflowId]/runs/[runId]/page.tsx
- app/(tabs)/workflows/[workflowId]/plan/page.tsx
- app/(tabs)/workflows/[workflowId]/preflight/page.tsx
- app/(tabs)/workflows/[workflowId]/page.tsx
- app/globals.css
- lib/domain/types.ts
- lib/domain/mock-data.ts
- lib/navigation/routes.ts
- lib/simulation/execution-simulator.ts
- components/execution-simulator/local-execution-simulator.tsx
- components/execution-simulator/simulator-control-panel.tsx
- components/execution-simulator/simulator-step-progress.tsx
- components/execution-simulator/simulator-log-stream.tsx
- components/execution-simulator/simulator-state-badge.tsx
- components/execution-simulator/simulator-scenario-card.tsx
- components/execution-simulator/simulator-safety-note.tsx
- components/runs/run-detail-header.tsx
- components/runs/run-log-viewer.tsx
- components/runs/run-step-panel.tsx

## Product vocabulary

Extend or reuse the existing model to support:

- LocalExecutionSimulator
- SimulatedRunState
- SimulatedRunLifecycleStatus
- SimulatedRunStep
- SimulatedRunStepStatus
- SimulatedRunLogEntry
- SimulatedRunScenario
- SimulatedRunControl
- SimulatedRunTransition
- SimulatedRunSafetyFinding

These are TypeScript types and browser-local/static mock data only. Do not wire them to real shell execution, backend orchestration, queues, workers, sockets, host access, or command handling.

## Simulator safety requirements

- Simulator state must be local-only.
- Simulated lifecycle transitions must come from local/static data or pure client-side state only.
- No real approval flow may be added.
- No execution action may perform a real command or workflow run.
- No shell execution may be added.
- No host access may be added.
- No telemetry collection may be added.
- No provider sync may be added.
- No API routes, route handlers, server actions, middleware auth, backend calls, queues, workers, WebSockets, or background jobs may be added.
- Start, pause, resume, cancel, retry, advance step, and reset simulation controls may update local UI state only.
- The UI must clearly state that execution simulation is local-only in this phase.

## UX requirements

- A local execution simulator surface is visible from a workflow run, execution plan, or preflight page.
- Simulated lifecycle state is visible.
- Step progress is visible.
- Simulated logs are visible.
- At least one seeded simulator scenario is visible.
- Start, pause, resume, cancel, retry, advance step, and reset controls are visible.
- Controls affect only local mock UI state.
- Blocked, warning, running, paused, canceled, failed, and completed states are visually distinct where relevant.
- The UI remains usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Execution simulation is local-only in this phase. No real commands, workflow runs, backend jobs, queues, workers, sockets, or host access are active.

## Tasks

1. Inspect the existing Phase 16 scaffold.
2. Extend simulator, lifecycle, step, log, scenario, transition, and control types.
3. Add static/mock simulator scenarios and seeded run states.
4. Add a pure local simulator helper under lib/simulation.
5. Add local execution simulator UI.
6. Add simulator control panel.
7. Add step progress UI.
8. Add simulated log append UI.
9. Add scenario selection UI.
10. Link simulator from workflow run, execution plan, or preflight surfaces.
11. Add visible local-only simulator safety copy.
12. Ensure no real approvals, execution, command handling, shell execution, host access, backend orchestration, telemetry, provider sync, webhook ingestion, workers, queues, API routes, route handlers, server actions, backend calls, credential usage, secret usage, WebSockets, or host access are added.
13. Run validation.
14. Update this phase file with validation evidence.

## Acceptance criteria

- Local execution simulator surface resolves or is reachable from an existing workflow run, execution plan, or preflight surface.
- At least one local/static simulator scenario exists.
- Simulated lifecycle state renders from local/static data or local UI state.
- Simulated step progress renders.
- Simulated log entries render.
- Start, pause, resume, cancel, retry, advance step, and reset simulation controls are visible.
- Simulator controls affect only local mock UI state.
- Required local-only simulator safety copy is visible in the UI.
- No real approval, real workflow execution, real command execution, shell execution, backend orchestration, backend job, telemetry collection, provider sync, webhook ingestion, worker, queue, background job, database simulator persistence, API route, route handler, server action, middleware auth, cloud sync, credential usage, secret usage, WebSocket, SSH, PTY, terminal runtime, runner, streaming from real systems, real log ingestion, remote execution, host access, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Pending.
