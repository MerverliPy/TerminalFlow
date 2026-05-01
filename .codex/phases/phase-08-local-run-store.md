# Phase 08 — Persistence Schema and Local Run Store

Status: pending

## Goal

Add a local-only persistence boundary for TerminalFlow data so projects, sessions, workflows, workflow runs, logs, and simulated command results can be stored and restored locally without introducing auth, backend APIs, remote execution, real databases, cloud sync, queues, or workflow runners.

## Why this phase is next

Phase 07 added local-only command simulation. Phase 08 should define the storage model and local persistence boundary before TerminalFlow introduces real execution, backend synchronization, authentication, host pairing, queues, streaming, or workflow runners.

## In scope

- add typed local storage schema
- add local persistence adapter
- add local seed data source derived from existing static mock data
- add basic schema versioning or migration structure
- add local run/session history persistence helpers
- add local simulated command result persistence helpers
- add storage status UI in Settings
- add reset/demo-data UI in Settings
- add visible copy explaining storage is local-only
- preserve existing routes and behavior from prior phases

## Out of scope

- real database
- cloud sync
- auth
- user accounts
- API routes
- route handlers
- server actions
- remote execution
- SSH
- PTY
- WebSockets
- streaming logs
- background jobs
- queueing
- deployment logic
- real workflow runner
- real log ingestion
- secrets or credential storage
- encryption/key management

## Primary files

Adjust paths only if the existing scaffold uses different names.

- lib/storage/schema.ts
- lib/storage/storage-types.ts
- lib/storage/local-store.ts
- lib/storage/seed.ts
- lib/storage/migrations.ts
- lib/domain/types.ts
- lib/domain/mock-data.ts
- app/(tabs)/settings/page.tsx
- app/globals.css
- components/settings/storage-status-panel.tsx
- components/settings/reset-demo-data-panel.tsx
- components/settings/local-data-safety-note.tsx

## Product vocabulary

Extend or reuse the existing model to support:

- LocalStoreSchema
- LocalStoreVersion
- LocalStoreSnapshot
- LocalStoreCollection
- LocalStoreMigration
- LocalStoreStatus
- PersistedProject
- PersistedTerminalSession
- PersistedWorkflow
- PersistedWorkflowRun
- PersistedWorkflowRunLogEntry
- PersistedSimulatedCommandResult

These are TypeScript types and local browser storage abstractions only. Do not wire them to a backend.

## Storage requirements

- Storage must be local-only.
- Storage may use localStorage or an IndexedDB-style abstraction, but keep implementation small.
- No API routes, server actions, route handlers, or backend calls may be added.
- No secrets, credentials, SSH keys, tokens, or private keys may be stored.
- Local store must include an explicit schema version.
- Local store must include a seed/reset path.
- Migration structure may be a placeholder but must be explicit.
- Existing static mock data should remain safe to import.
- Storage helpers should be testable as pure or mostly pure TypeScript where possible.

## UX requirements

- Settings page shows local storage status.
- Settings page shows schema version.
- Settings page shows demo data/reset controls.
- Reset/demo controls must be disabled or simulated unless the implementation is safely local-only.
- The UI must clearly state that data is local-only and no cloud sync or backend persistence is active.
- The page should remain usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Local storage is used only on this device in this phase. No cloud sync, backend database, secrets, or remote execution data is active.

## Tasks

1. Inspect the existing Phase 07 scaffold.
2. Add local storage schema and storage types.
3. Add a local storage adapter.
4. Add seed data derived from existing static mock data.
5. Add explicit schema version and migration structure.
6. Add helpers for storing/restoring local sessions, workflow runs, logs, and simulated command results.
7. Add Settings UI for local storage status.
8. Add Settings UI for reset/demo-data handling.
9. Add visible local-only storage safety copy.
10. Ensure no API routes, server actions, route handlers, backend calls, secrets storage, cloud sync, or real execution logic are added.
11. Run validation.
12. Update this phase file with validation evidence.

## Acceptance criteria

- Local storage schema types exist.
- Local storage adapter exists.
- Local store has an explicit schema version.
- Migration structure exists, even if only one version currently exists.
- Seed/reset path exists and is local-only.
- Settings page renders storage status and schema version.
- Settings page renders local-only safety copy.
- No secrets, credentials, SSH keys, tokens, or private keys are stored.
- No auth, persistence backend, API route, route handler, server action, WebSocket, SSH, PTY, terminal runtime, queue, background job, runner, streaming, real log ingestion, cloud sync, secret storage, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Pending.
