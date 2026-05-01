# Phase 06 — Static Execution Log and Run Timeline UI

Status: pending

## Goal

Add a static workflow run timeline and execution log experience that shows what a workflow run would look like after starting, without executing commands, streaming logs, creating jobs, or persisting run state.

## Why this phase is next

Phase 05 added a static workflow builder and run preview. Phase 06 should define how TerminalFlow displays run status, timeline events, step logs, safety interruptions, and disabled run controls before any real execution engine, queue, streaming, or persistence is introduced.

## In scope

- add static workflow run history
- add static workflow run detail route
- add static run timeline UI
- add static execution log UI
- add typed run and log domain models
- add mock workflow run records
- add mock timeline events
- add mock stdout/stderr-style log entries
- add disabled retry/cancel/rerun controls
- add visible copy that logs and run state are static
- keep all data local/static
- preserve existing routes from prior phases

## Out of scope

- real workflow execution
- command execution
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

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(tabs)/workflows/[workflowId]/runs/page.tsx
- app/(tabs)/workflows/[workflowId]/runs/[runId]/page.tsx
- app/(tabs)/workflows/[workflowId]/page.tsx
- app/globals.css
- lib/navigation/routes.ts
- lib/domain/types.ts
- lib/domain/mock-data.ts
- components/runs/run-card.tsx
- components/runs/run-detail-header.tsx
- components/runs/run-timeline.tsx
- components/runs/run-log-viewer.tsx
- components/runs/run-step-panel.tsx
- components/runs/run-disabled-actions.tsx
- components/runs/run-safety-note.tsx
- components/runs/run-status-badge.tsx

## Product vocabulary

Extend or reuse the existing domain model to support:

- WorkflowRun
- WorkflowRunStep
- WorkflowRunLogEntry
- WorkflowRunStatus
- WorkflowRunEvent
- WorkflowRunTimelineItem
- WorkflowRunLogLevel

These are static TypeScript types only. Do not wire them to a backend.

## UX requirements

- A workflow detail page should link to its static run history when appropriate.
- A workflow run history page should list static run cards.
- A workflow run detail page should show run status, workflow name, trigger, target, start time, duration, and safety state.
- A timeline area should show static ordered run events.
- A log viewer should show static stdout/stderr-style log entries.
- Step panels should show static step status and timing.
- Retry, cancel, rerun, resume, and download log actions must be disabled or simulated only.
- The UI must clearly state that run logs and execution state are static in this phase.
- The page should remain usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Run logs and execution state are static in this phase. No workflow execution, streaming, or background job is active yet.

## Tasks

1. Inspect the existing Phase 05 scaffold.
2. Update the route map with workflow run history and run detail routes.
3. Extend domain types for workflow runs, steps, timeline events, and log entries.
4. Extend static mock data with workflow runs, run steps, timeline items, and log entries.
5. Add a workflow run history page.
6. Add a workflow run detail page.
7. Add run timeline UI.
8. Add static log viewer UI.
9. Add run step panels.
10. Add disabled retry/cancel/rerun/resume/download action UI.
11. Add visible static-run safety copy.
12. Run validation.
13. Update this phase file with validation evidence.

## Acceptance criteria

- `/workflows/[workflowId]/runs` resolves for at least one static workflow.
- `/workflows/[workflowId]/runs/[runId]` resolves for at least one static run.
- Workflow run route helpers are explicit in code.
- Workflow run data is local/static.
- Timeline events render from typed mock data.
- Log entries render from typed mock data.
- Step panels render static status and timing.
- Disabled or simulated actions are shown for retry, cancel, rerun, resume, and download logs.
- UI clearly states that run logs and execution state are static in this phase.
- No auth, persistence, API route, server action, WebSocket, SSH, PTY, terminal runtime, queue, background job, runner, streaming, real log ingestion, secret storage, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Pending.
