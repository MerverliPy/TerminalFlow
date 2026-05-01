# Phase 20A UI Optimization Brief

## Direction

Apply a focused UI optimization pass to TerminalFlow.

The visual direction is:

Dark Retro Cyber Command Center + Linear/Vercel-style polish + selective terminal-native details.

## Required Traits

Prioritize:

- clean hierarchy over dashboard clutter
- minimal header chrome
- centered onboarding empty states
- very spacious vertical layout
- simple action pills/buttons
- large rounded input composer

## Product Spec Preservation

Keep the product direction aligned with:

- Access a coding workspace from a phone
- Run terminal commands remotely
- Inspect project files
- Manage repositories
- Connect AI coding providers
- Track AI token usage
- Run coding agents safely
- Control development containers and databases visually

These may be represented as UI surfaces, labels, previews, disabled actions, or roadmap-aware panels, but this phase must not implement real backend or execution behavior.

## Layout Goals

The app should feel less like a dense dashboard and more like a focused mobile-first command workspace.

Use:

- generous vertical spacing
- clear page titles
- fewer competing panels per viewport
- compact metadata chips
- simple action rows
- strong primary interaction areas
- large composer areas on terminal/session pages
- readable mobile card stacks

## Terminal Page Goal

The session/terminal page should become a full-screen chat-first workspace.

It should include:

- minimal top bar
- centered empty state when there is no conversation
- scrollable thread area
- command/output/log cards inside the thread
- large bottom-pinned rounded composer
- simple mode/tool/action pills
- visible local/mock/simulated/disabled labels

It should not look like:

- a raw terminal emulator
- a dense admin dashboard
- a desktop-only split-pane interface
- a wall of log text
- a cluttered cockpit

## Visual Rules

Use:

- deep dark backgrounds
- elevated graphite or blue-black panels
- subtle cyan and green accents
- restrained purple for AI/provider intelligence
- amber for warnings
- red only for blocked/destructive states
- monospace only for commands, logs, IDs, paths, timestamps, and metadata

Avoid:

- heavy neon
- playful gradients
- generic SaaS cards
- excessive borders
- huge admin tables
- noisy HUD clutter
- making every label monospace

## Component Goals

Refine:

- global page backgrounds
- navigation active states
- page headers
- cards and panels
- badges and chips
- safety notes
- disabled action panels
- settings sections
- workflow/run cards
- session terminal page
- command/log/output blocks
- mobile spacing

## Behavior Boundary

This is a presentation and layout optimization phase only.

Do not add:

- real execution
- real remote commands
- SSH
- PTY
- API routes
- route handlers
- server actions
- WebSockets
- queues
- workers
- backend calls
- telemetry
- provider sync
- token usage
- secret usage
- database/container control logic
- workflow runners

Preserve existing data models and behavior unless a small refactor is required for layout clarity.
