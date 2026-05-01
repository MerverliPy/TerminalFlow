# TerminalFlow Product Spec

## Product Vision

TerminalFlow is a mobile-first command center for software development, terminal operations, AI coding workflows, repositories, containers, databases, and remote coding environments.

The product should let a developer control a coding workspace from a phone without feeling like they are using a cramped desktop terminal.

## Core Product Capabilities

TerminalFlow should eventually support:

- Access a coding workspace from a phone
- Run terminal commands remotely
- Inspect project files
- Manage repositories
- Connect AI coding providers
- Track AI token usage
- Run coding agents safely
- Control development containers and databases visually

## Product Positioning

TerminalFlow is not just a terminal emulator.

It should feel like:

- a mobile-first developer operations console
- a safe AI coding command center
- a remote coding workspace controller
- a workflow and execution review surface
- a visually guided interface for powerful developer operations

## UX Principles

The interface should prioritize:

- clear hierarchy
- minimal chrome
- mobile-first usability
- large comfortable interaction zones
- visible safety boundaries
- review-before-execute flows
- local/mock/simulated/disabled state clarity
- chat-first command interaction where appropriate

## Terminal Experience Direction

The terminal/session experience should behave more like a full-screen chat workspace than a raw terminal emulator.

Use:

- minimal top chrome
- centered onboarding empty state
- spacious thread area
- bottom-pinned rounded input composer
- simple action pills
- command/output/log cards inside the thread
- terminal-native styling only where useful

Avoid:

- dense terminal walls
- tiny command inputs
- desktop-heavy split panes
- dashboard clutter
- raw terminal-only presentation

## Current Implementation Boundary

Until explicit functional execution phases begin, TerminalFlow must not implement:

- real remote command execution
- SSH
- PTY
- workflow runners
- background jobs
- queues
- WebSockets
- provider API calls
- secrets usage
- token usage
- real database or container control

UI may represent these future capabilities as local, mocked, simulated, preview-only, or disabled surfaces.
