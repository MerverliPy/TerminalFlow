# Phase 07 — Local-Only Command Simulation Engine

Status: pending

## Goal

Add a local-only command simulation experience that lets users submit predefined mock commands and see simulated results in the UI without executing real shell commands, contacting hosts, calling APIs, streaming logs, or persisting state.

## Why this phase is next

Phase 06 added static workflow run timelines and execution logs. Phase 07 introduces the first controlled behavior layer: local simulation. This lets TerminalFlow test the command interaction model safely before real terminal execution, remote hosts, queues, persistence, streaming, or workflow runners exist.

## In scope

- add a local-only command simulation model
- add predefined mock command presets
- add simulated command result data
- add a client-side command composer interaction
- add simulated stdout/stderr/result rendering
- add simulated success, warning, blocked, and failed states
- add safety copy explaining that no real command execution occurs
- add allowlist-style UI language for simulated commands
- keep all simulation state local/in-memory
- preserve existing routes from prior phases

## Out of scope

- real command execution
- shell execution
- terminal runtime
- host execution
- SSH
- PTY
- WebSockets
- streaming logs
- database persistence
- auth
- API routes
- server actions
- background jobs
- queueing
- deployment logic
- real workflow runner
- real log ingestion
- secrets or credential storage
- remote host pairing

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(tabs)/sessions/[sessionId]/page.tsx
- app/(tabs)/workflows/[workflowId]/runs/[runId]/page.tsx
- app/globals.css
- lib/domain/types.ts
- lib/domain/mock-data.ts
- lib/navigation/routes.ts
- lib/simulation/command-simulator.ts
- components/session/command-composer.tsx
- components/session/session-command-history.tsx
- components/session/simulated-command-result.tsx
- components/session/command-preset-list.tsx
- components/session/command-simulation-safety-note.tsx
- components/runs/run-log-viewer.tsx
- components/runs/run-safety-note.tsx

## Product vocabulary

Extend or reuse the existing domain model to support:

- SimulatedCommand
- SimulatedCommandPreset
- SimulatedCommandResult
- SimulatedCommandStatus
- SimulatedCommandOutput
- CommandSimulationMode
- CommandSimulationSafetyCheck

These are local TypeScript types only. Do not wire them to a backend.

## Simulation requirements

- Commands must come from local/static presets or local mock input handling only.
- No user input may be passed to a real shell.
- No APIs, server actions, route handlers, WebSockets, or background jobs may be added.
- The simulator may return hard-coded results based on command text or preset id.
- Simulated results may include stdout, stderr, exit code, duration, and status.
- Blocked commands should show a safety explanation instead of a result.
- Simulation state should be local to the browser component only.

## UX requirements

- A visible command composer allows selecting or entering a mock command.
- Submitting a command updates the UI with a simulated result.
- Preset commands are visible and tappable on a phone viewport.
- Simulated command output is visually distinct from real execution.
- The UI must clearly state that no real command execution occurs.
- Blocked commands must explain why they are blocked.
- The page should remain usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Command simulation is local-only in this phase. No shell, host, workflow, or background job execution occurs.

## Tasks

1. Inspect the existing Phase 06 scaffold.
2. Extend domain types for local command simulation.
3. Add local/static simulated command presets and result examples.
4. Add a pure local simulation helper under lib/simulation.
5. Update the session command composer to support local simulated submission.
6. Add simulated command result rendering.
7. Add preset command UI.
8. Add blocked-command safety handling.
9. Add visible local-only simulation safety copy.
10. Ensure no API routes, server actions, WebSockets, shell calls, or real execution logic are added.
11. Run validation.
12. Update this phase file with validation evidence.

## Acceptance criteria

- A session detail page supports local-only command simulation UI.
- At least three command presets render from local/static data.
- Submitting a preset or mock command shows a simulated result.
- Simulated results render status, output, duration, and exit-code-style metadata.
- Blocked commands render a safety explanation.
- The required local-only simulation copy is visible in the UI.
- No auth, persistence, API route, server action, WebSocket, SSH, PTY, terminal runtime, queue, background job, runner, streaming, real log ingestion, secret storage, shell execution, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Pending.
