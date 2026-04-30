# Phase 01 — Runnable Shell and Routing Foundation

Status: pending

## Goal

Create the first runnable TerminalFlow app shell with a default route and mobile-first navigation foundation.

## Why this phase is first

The repository needs a stable executable surface before auth, persistence, terminal sessions, host pairing, or workflow execution can be implemented safely.

## In scope

- initialize the app scaffold
- create the root app shell
- create the default route
- create route constants
- create a first Hub/Home placeholder
- add basic validation command

## Out of scope

- GitHub OAuth
- database schema
- remote host pairing
- terminal execution
- workflow runner
- deployment controls
- advanced styling polish

## Primary files

Adjust paths to the selected stack if needed.

- package.json
- app/layout.tsx
- app/page.tsx
- app/(tabs)/layout.tsx
- app/(tabs)/hub/page.tsx
- lib/navigation/routes.ts

## Tasks

1. Inspect the repository structure.
2. Confirm the selected frontend stack from existing files.
3. If the repo is empty, scaffold the smallest viable app.
4. Add the shell layout.
5. Add the default Hub route.
6. Add route constants.
7. Run validation.
8. Update this phase file with validation evidence.

## Acceptance criteria

- The repository has a runnable app entry point.
- The default route resolves to the Hub/Home surface.
- The shell is mobile-first.
- The navigation map is explicit in code.
- No backend/auth/remote execution work is introduced.
- A validation command is documented.

## Validation command

Use the first command that applies:

    pnpm typecheck
    pnpm build
    npm run build
    npm run typecheck

## Completion summary

Pending.
