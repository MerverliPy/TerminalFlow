# Phase 03 — Static Session Detail and Command Composer UI

Status: pending

## Goal

Add a static session detail experience with command history, host/session metadata, and a non-executing command composer UI.

## Why this phase is next

Phase 02 established navigation, domain types, and static workspace surfaces. Phase 03 should deepen the Sessions area into the core TerminalFlow interaction model before introducing real terminal execution, streaming, persistence, or host pairing.

## In scope

- add a session detail route
- link session cards to session detail pages
- render static session metadata
- render static command history
- add a command composer UI
- add disabled/simulated command actions
- add clear UI copy that execution is not active yet
- keep all data local/static
- preserve existing routes from Phase 02

## Out of scope

- real command execution
- terminal runtime
- PTY integration
- WebSockets
- streaming logs
- remote host pairing
- database persistence
- API routes
- server actions
- auth
- deployment logic
- workflow runner

## Primary files

Adjust paths only if the existing Phase 02 scaffold uses different names.

- app/(tabs)/sessions/page.tsx
- app/(tabs)/sessions/[sessionId]/page.tsx
- app/globals.css
- lib/navigation/routes.ts
- lib/domain/types.ts
- lib/domain/mock-data.ts
- components/cards/session-card.tsx
- components/session/session-detail-header.tsx
- components/session/session-command-history.tsx
- components/session/command-composer.tsx
- components/session/session-host-panel.tsx
- components/session/session-safety-note.tsx

## Product vocabulary

Extend or reuse the existing domain model to support:

- TerminalSession
- CommandEntry
- HostConnection
- SessionStatus
- CommandStatus

These are static TypeScript types only. Do not wire them to a backend.

## UX requirements

- The Sessions list links to individual session detail pages.
- A session detail page shows the session name, status, project, host, branch, and last activity.
- A command history area shows static command entries.
- A command composer is visible and mobile-first.
- The command composer must not execute commands.
- The UI must clearly indicate that command execution is not active in this phase.
- The page should remain usable on a phone viewport.

## Tasks

1. Inspect the existing Phase 02 scaffold.
2. Update the route map to include session detail route helpers.
3. Extend domain types for command history if needed.
4. Extend static mock data with command entries.
5. Link session cards to detail routes.
6. Add the static session detail route.
7. Add the command history component.
8. Add the non-executing command composer component.
9. Add host/session context panels.
10. Run validation.
11. Update this phase file with validation evidence.

## Acceptance criteria

- `/sessions` still resolves.
- At least one `/sessions/[sessionId]` detail page resolves from static mock data.
- Session cards link to detail pages.
- Session detail pages render static metadata.
- Command history renders from local/static data.
- Command composer renders but does not execute commands.
- The UI explicitly states that command execution is not active yet.
- Route helpers are explicit in code.
- No auth, persistence, terminal runtime, remote execution, API route, server action, WebSocket, deployment, or workflow runner logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Pending.
