# Phase 20 — Local Release Notes and Milestone Review UI

Status: complete

## Goal

Add a mock/local-only release notes and milestone review UI so TerminalFlow can summarize completed phases, grouped changes, readiness status, local audit history, milestone progress, and disabled release actions without publishing releases, generating changelogs from Git history, deploying, calling APIs, creating backend jobs, using queues/workers, syncing providers, or collecting telemetry.

## Why this phase is next

Phase 19 added a local audit trail and change history UI. Phase 20 should consolidate local product progress into release-style summaries and milestone review surfaces before TerminalFlow introduces real release publishing, GitHub releases, deployment, backend jobs, changelog automation, provider sync, or telemetry.

## In scope

- add local/mock release notes UI
- add milestone review dashboard
- add grouped change summaries
- add phase completion summaries
- add local changelog timeline
- add release readiness checklist
- add milestone status metadata
- add local/static release risk notes
- add disabled publish/export/share/create-release actions
- add visible copy explaining release notes are local/static
- preserve existing routes and behavior from prior phases

## Out of scope

- real release publishing
- GitHub releases
- changelog generation from Git history
- GitHub API calls
- package publishing
- deployment
- provider sync
- telemetry collection
- analytics ingestion
- backend release jobs
- background jobs
- queues
- workers
- API routes
- route handlers
- server actions
- middleware auth
- database release persistence
- cloud sync
- WebSockets
- streaming logs
- real command execution
- shell execution
- terminal runtime
- real workflow execution
- host execution
- host access
- SSH
- PTY
- workflow runners
- secret usage
- credential usage

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(tabs)/health/page.tsx
- app/(tabs)/settings/page.tsx
- app/(tabs)/settings/releases/page.tsx
- app/(tabs)/settings/releases/[releaseId]/page.tsx
- app/globals.css
- lib/domain/types.ts
- lib/domain/mock-data.ts
- lib/navigation/routes.ts
- lib/storage/schema.ts
- lib/storage/storage-types.ts
- lib/storage/local-store.ts
- lib/storage/seed.ts
- lib/storage/migrations.ts
- components/releases/release-notes-dashboard.tsx
- components/releases/release-notes-card.tsx
- components/releases/release-detail.tsx
- components/releases/milestone-review-dashboard.tsx
- components/releases/milestone-status-card.tsx
- components/releases/phase-completion-summary.tsx
- components/releases/grouped-change-summary.tsx
- components/releases/changelog-timeline.tsx
- components/releases/release-readiness-checklist.tsx
- components/releases/release-risk-panel.tsx
- components/releases/disabled-release-actions.tsx
- components/releases/release-safety-note.tsx
- components/settings/release-summary-panel.tsx

## Product vocabulary

Extend or reuse the existing model to support:

- LocalReleaseNote
- LocalReleaseStatus
- LocalReleaseMilestone
- LocalMilestoneStatus
- LocalPhaseCompletionSummary
- LocalGroupedChangeSummary
- LocalChangelogEntry
- LocalReleaseReadinessCheck
- LocalReleaseRisk
- LocalReleaseActionPreview
- LocalReleaseTimelineItem
- LocalReleaseStorageStatus

These are TypeScript types and browser-local/static mock data only. Do not wire them to GitHub releases, Git history, backend jobs, provider sync, deployment, telemetry, or publishing systems.

## Release safety requirements

- Release notes must be mock/local-only.
- Milestone review data must come from browser-local storage or local/static mock data only.
- No GitHub release publishing may be added.
- No GitHub API calls may be added.
- No changelog generation from Git history may be added.
- No package publishing or deployment may be added.
- No telemetry collection may be added.
- No provider sync may be added.
- No API routes, route handlers, server actions, middleware auth, backend calls, queues, workers, WebSockets, or background jobs may be added.
- Publish release, export notes, share milestone, create GitHub release, refresh changelog, and deploy controls may render but must not perform real external actions.
- The UI must clearly state that release notes and milestone review data are local/static in this phase.

## UX requirements

- A release notes or milestone review surface is reachable from Settings or Health.
- At least one release summary panel is visible from Settings or Health.
- At least one release detail surface exists.
- Release notes render from local/static or local-store seeded data.
- Phase completion summaries are visible.
- Grouped change summaries are visible.
- Local changelog timeline is visible.
- Release readiness checklist is visible.
- Release risk notes are visible.
- Publish/export/share/create-release/deploy controls are disabled or simulated only.
- The UI remains usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Release notes and milestone review are mocked locally in this phase. No GitHub release, changelog automation, publishing, deployment, backend jobs, queues, workers, provider sync, or telemetry are active.

## Tasks

1. Inspect the existing Phase 19 scaffold.
2. Extend release note, milestone, changelog, readiness, risk, status, and action-preview types.
3. Add static/mock release notes, milestone records, phase summaries, grouped changes, changelog entries, readiness checks, and release risks.
4. Extend local store schema for local release/milestone data if useful.
5. Add local store seed/reset helpers for release data if useful.
6. Add Settings or Health release summary panel.
7. Add release notes route and route helper.
8. Add release detail route and route helper.
9. Add milestone review dashboard.
10. Add phase completion summary UI.
11. Add grouped change summary UI.
12. Add changelog timeline UI.
13. Add release readiness checklist.
14. Add disabled publish/export/share/create-release/deploy action UI.
15. Add visible local/static release safety copy.
16. Ensure no GitHub releases, GitHub API calls, Git history changelog automation, deployment, publishing, provider sync, telemetry, workers, queues, API routes, route handlers, server actions, backend calls, credential usage, secret usage, WebSockets, or host access are added.
17. Run validation.
18. Update this phase file with validation evidence.

## Acceptance criteria

- Release notes or milestone review surface resolves.
- Release surface is reachable from Settings or Health.
- At least one release summary panel exists.
- At least one local/static or local-store seeded release note exists.
- At least one release detail surface exists.
- At least one milestone review dashboard exists.
- At least one phase completion summary exists.
- At least one grouped change summary exists.
- Changelog timeline renders ordered local/static entries.
- Release readiness checklist renders local/static checks.
- Release risk notes are visible.
- Disabled or simulated actions are shown for publish release, export notes, share milestone, create GitHub release, refresh changelog, and deploy.
- Required local-only release safety copy is visible in the UI.
- No GitHub release, GitHub API call, Git history changelog generation, package publishing, deployment, telemetry collection, analytics ingestion, provider sync, event ingestion, API route, route handler, server action, middleware auth, backend call, worker, queue, background job, WebSocket, real command execution, shell execution, SSH, PTY, terminal runtime, runner, real log ingestion, remote execution, host access, credential usage, secret usage, cloud sync, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Implemented local-only release notes and milestone review surfaces in Settings and the new release routes.

Validation evidence:

- `npm run typecheck`
- Result: passed
