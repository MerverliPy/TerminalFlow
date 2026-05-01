# Phase 20A — UI Optimization, Visual Hierarchy, and Chat-First Terminal Polish

Status: pending

## Goal

Optimize TerminalFlow’s UI around a cleaner mobile-first command center experience while preserving the product spec and avoiding any new backend, execution, provider, secrets, terminal, remote host, container, database, queue, worker, or workflow-runner behavior.

## Why this phase is next

Phase 20 completed release notes and milestone review. Before moving into functional execution, TerminalFlow needs a focused visual and interaction polish pass so the product feels coherent, mobile-native, and aligned with its long-term goal as a phone-accessible coding workspace command center.

## Product spec to preserve

TerminalFlow should continue to support the long-term direction of:

- Access a coding workspace from a phone
- Run terminal commands remotely
- Inspect project files
- Manage repositories
- Connect AI coding providers
- Track AI token usage
- Run coding agents safely
- Control development containers and databases visually

In this phase, these capabilities may only appear as UI direction, disabled controls, preview surfaces, local/mock labels, or roadmap-aware structure. Do not implement real functionality for them.

## Visual direction

Apply:

Dark Retro Cyber Command Center + Linear/Vercel-style polish + selective terminal-native details.

## Required UI traits

Prioritize:

- clean hierarchy over dashboard clutter
- minimal header chrome
- centered onboarding empty states
- very spacious vertical layout
- simple action pills/buttons
- large rounded input composer

## In scope

- global visual polish
- cleaner page hierarchy
- reduced dashboard clutter
- mobile-first spacing improvements
- minimal page/header chrome
- consistent card and panel treatment
- consistent badge/chip/status styling
- consistent safety-note styling
- simplified action pill/button styling
- terminal/session page full-screen chat-first layout
- large bottom-pinned rounded composer on session/terminal surfaces
- command/log/output card styling
- settings and dashboard section cleanup
- visual references to future product spec surfaces where already present
- preserve existing routes, types, mock data, local storage, and behavior

## Out of scope

- real terminal execution
- real command execution
- remote command execution
- SSH
- PTY
- host access
- workflow runners
- queues
- workers
- WebSockets
- streaming from real systems
- API routes
- route handlers
- server actions
- backend calls
- telemetry
- provider sync
- OAuth
- token usage
- secret usage
- real database control
- real container control
- deployment logic
- new product capability implementation

## Primary files

Adjust paths only if the existing scaffold uses different names.

- docs/product-spec.md
- docs/ui-optimization-brief.md
- app/globals.css
- app/(tabs)/layout.tsx
- app/(tabs)/sessions/[sessionId]/page.tsx
- app/(tabs)/sessions/page.tsx
- app/(tabs)/hub/page.tsx
- app/(tabs)/health/page.tsx
- app/(tabs)/settings/page.tsx
- components/session/command-composer.tsx
- components/session/session-command-history.tsx
- components/session/session-detail-header.tsx
- components/session/session-safety-note.tsx
- components/runs/run-log-viewer.tsx
- components/runs/run-detail-header.tsx
- components/health/project-health-dashboard.tsx
- components/settings/*
- components/*

## Terminal/session UX requirements

The terminal/session page should become a full-screen chat-first workspace.

It should include:

- minimal top bar
- centered onboarding empty state
- spacious scrollable thread area
- bottom-pinned rounded composer dock
- simple action pills/buttons
- command preview cards
- simulated output/log cards
- local/mock/simulated/disabled labels
- mobile-first layout

Avoid:

- raw terminal emulator layout
- dense admin dashboard layout
- tiny command input
- desktop-only split panes
- wide tables
- full-page monospace styling

## Visual requirements

Use:

- deep dark backgrounds
- elevated graphite or blue-black panels
- subtle cyan and green accents
- restrained purple for AI/workflow/provider hints
- amber for warnings
- red only for blocked/destructive states
- monospace only for commands, logs, IDs, paths, timestamps, and metadata

Avoid:

- heavy neon
- game-like HUD clutter
- playful gradients
- generic SaaS dashboard styling
- making the entire UI terminal-styled
- reducing readability on mobile

## Tasks

1. Inspect existing UI structure.
2. Read docs/product-spec.md.
3. Read docs/ui-optimization-brief.md.
4. Refine global dark visual system.
5. Reduce dashboard clutter and improve hierarchy.
6. Simplify page/header chrome.
7. Normalize cards, panels, badges, chips, and safety notes.
8. Refactor terminal/session page into a full-screen chat-first workspace.
9. Add or refine centered empty states where useful.
10. Add or refine large rounded composer treatment.
11. Improve mobile spacing and responsiveness.
12. Preserve existing behavior, routes, data models, local storage, and mock data.
13. Ensure no real execution, backend, provider, secrets, host, container, database, queue, worker, or workflow-runner logic is added.
14. Run validation.
15. Update this phase file with validation evidence.

## Acceptance criteria

- Terminal/session page presents as a full-screen chat-first workspace.
- Terminal/session page has a large rounded composer.
- Terminal/session page has minimal chrome and spacious vertical layout.
- Empty/onboarding state is centered where applicable.
- UI hierarchy is cleaner and less cluttered.
- Cards, panels, badges, chips, buttons, and safety notes are visually more consistent.
- Mobile layouts remain usable.
- Product spec direction remains represented in copy, structure, or disabled/preview surfaces where appropriate.
- Existing routes and behavior remain intact.
- No real command execution, remote execution, SSH, PTY, host access, API route, route handler, server action, backend call, WebSocket, queue, worker, provider sync, token usage, secret usage, database/container control, workflow runner, telemetry, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Pending.
