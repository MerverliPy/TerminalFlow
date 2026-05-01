# Phase 05 — Static Workflow Builder and Run Preview UI

Status: pending

## Goal

Add a static workflow builder and run preview experience that lets users plan workflows, inspect steps, preview a run, and see disabled run/save/schedule actions without executing anything.

## Why this phase is next

Phase 04 defined host connection setup and safety boundaries. Phase 05 should define how TerminalFlow represents workflow planning and run previews before introducing any real workflow runner, queue, terminal execution, remote execution, streaming logs, or persistence.

## In scope

- add a static workflow builder page
- add workflow detail or preview surfaces
- add typed workflow builder domain models
- add static mock workflow data
- add static workflow run preview data
- render workflow steps from typed mock data
- render trigger and target panels
- render safety checks for workflow runs
- add disabled run/save/schedule/deploy actions
- add clear copy that workflow execution is not active yet
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
- secrets or credential storage

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(tabs)/workflows/page.tsx
- app/(tabs)/workflows/new/page.tsx
- app/(tabs)/workflows/[workflowId]/page.tsx
- app/(tabs)/workflows/[workflowId]/preview/page.tsx
- app/globals.css
- lib/navigation/routes.ts
- lib/domain/types.ts
- lib/domain/mock-data.ts
- components/workflows/workflow-card.tsx
- components/workflows/workflow-builder-shell.tsx
- components/workflows/workflow-step-card.tsx
- components/workflows/workflow-run-preview.tsx
- components/workflows/workflow-disabled-actions.tsx
- components/workflows/workflow-safety-note.tsx
- components/workflows/workflow-trigger-panel.tsx
- components/workflows/workflow-target-panel.tsx

## Product vocabulary

Extend or reuse the existing domain model to support:

- Workflow
- WorkflowStep
- WorkflowTrigger
- WorkflowTarget
- WorkflowRunPreview
- WorkflowRunStatus
- WorkflowStepKind
- WorkflowSafetyCheck

These are static TypeScript types only. Do not wire them to a backend.

## UX requirements

- The Workflows page should list static workflow cards.
- The workflow builder page should show editable-looking static sections.
- The workflow detail page should show trigger, target, steps, and status.
- The run preview area should show what would happen if run were enabled.
- The run preview must be based on local/static mock data.
- Run, save, schedule, and deploy actions must be disabled or simulated only.
- The UI must clearly state that workflow execution is not active in this phase.
- The page should remain usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Workflow execution is not active in this phase. This is a static planning and preview interface only.

## Tasks

1. Inspect the existing Phase 04 scaffold.
2. Update the route map with workflow builder and preview routes.
3. Extend domain types for workflow planning and run previews.
4. Extend static mock data with workflows, steps, triggers, targets, and run previews.
5. Add or update the Workflows list page.
6. Add the static workflow builder page.
7. Add workflow detail and/or preview surfaces.
8. Add trigger and target panels.
9. Add workflow step cards.
10. Add workflow run preview UI.
11. Add disabled run/save/schedule/deploy action UI.
12. Run validation.
13. Update this phase file with validation evidence.

## Acceptance criteria

- `/workflows` resolves.
- `/workflows/new` resolves.
- At least one `/workflows/[workflowId]` detail page resolves from static mock data.
- A workflow run preview surface exists.
- Workflow route helpers are explicit in code.
- Workflow builder and run preview data are local/static.
- Workflow steps render from typed mock data.
- Disabled or simulated actions are shown for run, save, schedule, and deploy behavior.
- UI clearly states that workflow execution is not active yet.
- No auth, persistence, API route, server action, WebSocket, SSH, PTY, terminal runtime, queue, background job, runner, secret storage, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Pending.
