# Phase 04 — Host Connection Setup and Safety Model UI

Status: complete

## Goal

Add a static host connection setup experience with safety warnings, typed host models, disabled connection actions, and clear boundaries before any real SSH, PTY, secrets, or remote execution work.

## Why this phase is next

Phase 03 added the static session detail and command composer UI. Phase 04 should define how TerminalFlow represents host connections and safety expectations before introducing any real remote connectivity.

## In scope

- add host connection domain types
- add static host connection mock data
- add host connection list surface
- add host connection detail/setup surface
- add safety model UI
- add disabled connect/test actions
- add clear copy that real connection is not active yet
- link host information from sessions where appropriate
- keep all data local/static

## Out of scope

- real SSH
- real host pairing
- secret storage
- API routes
- server actions
- PTY integration
- WebSockets
- streaming logs
- real command execution
- database persistence
- auth
- deployment logic
- workflow runner

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(tabs)/hosts/page.tsx
- app/(tabs)/hosts/[hostId]/page.tsx
- app/(tabs)/settings/page.tsx
- app/(tabs)/layout.tsx
- app/globals.css
- lib/navigation/routes.ts
- lib/domain/types.ts
- lib/domain/mock-data.ts
- components/hosts/host-card.tsx
- components/hosts/host-detail-header.tsx
- components/hosts/host-connection-panel.tsx
- components/hosts/host-safety-checklist.tsx
- components/hosts/host-disabled-actions.tsx

## Product vocabulary

Extend or reuse the existing domain model to support:

- HostConnection
- HostStatus
- HostEnvironment
- HostSafetyCheck
- ConnectionMethod

These are static TypeScript types only. Do not wire them to a backend.

## UX requirements

- Hosts should be reachable from the app navigation.
- The Hosts page should list static host connection cards.
- Each host card should link to a host detail/setup page.
- The host detail page should show host name, environment, status, operating system, connection method, and last checked state.
- The host detail page should show a safety checklist.
- Connect, test connection, and save credentials actions must be disabled or simulated only.
- The UI must clearly state that real host connection is not active in this phase.
- The page should remain usable on a phone viewport.

## Tasks

1. Inspect the existing Phase 03 scaffold.
2. Update the route map with host routes and helpers.
3. Extend domain types for host connection setup if needed.
4. Extend static mock data with host connection records.
5. Add Hosts navigation.
6. Add the static Hosts list page.
7. Add the static Host detail/setup route.
8. Add safety checklist UI.
9. Add disabled connection action UI.
10. Run validation.
11. Update this phase file with validation evidence.

## Acceptance criteria

- `/hosts` resolves.
- At least one `/hosts/[hostId]` detail page resolves from static mock data.
- Hosts are reachable from app navigation.
- Host cards link to detail/setup pages.
- Host detail pages render static metadata.
- Safety checklist renders from local/static data.
- Connect/test/save actions are disabled or simulated only.
- The UI explicitly states that real host connection is not active yet.
- Route helpers are explicit in code.
- No auth, persistence, SSH, PTY, secret storage, remote execution, API route, server action, WebSocket, deployment, or workflow runner logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Validation command: `npm run typecheck`

Validation result: passed.
