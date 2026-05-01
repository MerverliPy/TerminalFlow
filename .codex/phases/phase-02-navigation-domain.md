# Phase 02 — Navigation, Domain Model, and Static Workspace Surfaces

Status: complete

## Goal

Extend the Phase 01 app shell into a navigable TerminalFlow control plane with typed domain models and static workspace surfaces.

## Why this phase is next

Phase 01 created the runnable shell and Hub route. Phase 02 should define the core product vocabulary and navigation structure before introducing auth, persistence, host pairing, terminal execution, or workflow runners.

## In scope

- expand the app navigation beyond the Hub route
- add mobile-first tab destinations
- define core TerminalFlow domain types
- add static mock workspace data
- render basic cards/lists for projects, sessions, and workflows
- preserve the existing `/` to `/hub` default route
- keep all data local/static

## Out of scope

- real auth
- database schema
- remote host pairing
- terminal execution
- workflow runner
- GitHub OAuth
- API routes
- server actions
- deployment logic
- persistent storage
- WebSocket or streaming logic

## Primary files

Adjust paths only if the existing Phase 01 scaffold uses different names.

- app/(tabs)/layout.tsx
- app/(tabs)/hub/page.tsx
- app/(tabs)/projects/page.tsx
- app/(tabs)/sessions/page.tsx
- app/(tabs)/workflows/page.tsx
- app/(tabs)/settings/page.tsx
- app/globals.css
- lib/navigation/routes.ts
- lib/domain/types.ts
- lib/domain/mock-data.ts
- components/shell/mobile-tab-nav.tsx
- components/cards/project-card.tsx
- components/cards/session-card.tsx
- components/cards/workflow-card.tsx

## Product vocabulary

Define at minimum:

- Project
- TerminalSession
- Workflow
- HostConnection

These are static TypeScript types only. Do not wire them to a backend.

## UX requirements

- The app remains mobile-first.
- The bottom tab navigation is usable on a phone viewport.
- The Hub should summarize the current static workspace.
- Projects page should show project cards.
- Sessions page should show session cards.
- Workflows page should show workflow cards.
- Settings page should show placeholder settings groups.
- Empty/loading/error states may be static placeholders only.

## Tasks

1. Inspect the existing Phase 01 scaffold.
2. Update the route map with all Phase 02 tab routes.
3. Add typed domain models.
4. Add static mock data.
5. Extract or add a mobile tab navigation component if useful.
6. Add Projects, Sessions, Workflows, and Settings pages.
7. Update the Hub page to summarize the mock workspace.
8. Run validation.
9. Update this phase file with validation evidence.

## Acceptance criteria

- `/` still redirects to `/hub`.
- `/hub`, `/projects`, `/sessions`, `/workflows`, and `/settings` resolve.
- The route map is explicit in code.
- Core domain types exist.
- Mock data exists and is local/static.
- Hub, Projects, Sessions, Workflows, and Settings surfaces render without backend calls.
- No auth, persistence, remote execution, terminal runtime, API route, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Validation command: `npm run typecheck`

Validation result: passed.
