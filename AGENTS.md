# TerminalFlow Agent Guide

## Product direction

TerminalFlow is a mobile-first control plane for terminal-based and AI-assisted development workflows.

The product should behave like a command center, not a raw terminal clone.

## Operating model

Work in bounded phases.

Default loop:

1. Orchestrator defines the smallest safe phase.
2. Builder implements only that phase.
3. Validator checks the acceptance criteria.
4. Shipper prepares commit and rollout notes.

## Current priority

Phase 10: Workspace permissions and access review UI.

## Hard constraints

- Keep the first phase small.
- Do not add backend integrations yet.
- Do not add real auth yet.
- Do not implement remote execution yet.
- Keep mobile-first layout decisions explicit.
- Prefer typed, inspectable files over hidden state.
- Name exact files changed.
- Run the smallest useful validation command.

## Definition of done

A phase is complete only when:

- the scoped files exist
- the app starts or type-checks
- acceptance criteria are satisfied
- validation evidence is recorded
