# Phase 13 — Local Notification Center and Alert Review UI

Status: pending

## Goal

Add a mock/local-only notification center and alert review UI so TerminalFlow can represent alerts, review items, severities, unread states, integration-linked notifications, and disabled alert actions without implementing real webhooks, push notifications, email notifications, provider sync, background jobs, queues, API routes, server actions, or backend event ingestion.

## Why this phase is next

Phase 12 added a mock/local-only integration provider catalog and connection review UI. Phase 13 should define how TerminalFlow presents integration-related notifications, alerts, and action-required events before real provider webhooks, event ingestion, workers, queues, push notifications, or backend alert processing exist.

## In scope

- add mock notification center UI
- add typed notification and alert review models
- add static/mock notification records
- add static/mock alert/review item records
- add notification category cards
- add severity and status metadata
- add unread/read state UI
- add integration-linked alert metadata
- add mock notification activity timeline
- add disabled mark-read/snooze/resolve/archive/escalate actions
- add visible copy explaining notifications and alerts are local/static
- preserve existing routes and behavior from prior phases

## Out of scope

- real webhooks
- webhook receivers
- provider sync
- push notifications
- email notifications
- SMS notifications
- background jobs
- queues
- workers
- backend event ingestion
- database event persistence
- real alert processing
- real notification delivery
- API routes
- route handlers
- server actions
- middleware auth
- cloud sync
- remote execution
- SSH
- PTY
- WebSockets
- streaming logs
- workflow runners
- deployment logic
- token storage
- secret storage
- credential usage

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(tabs)/notifications/page.tsx
- app/(tabs)/notifications/[notificationId]/page.tsx
- app/(tabs)/settings/page.tsx
- app/(tabs)/layout.tsx
- app/globals.css
- lib/domain/types.ts
- lib/domain/mock-data.ts
- lib/navigation/routes.ts
- components/notifications/notification-center.tsx
- components/notifications/notification-card.tsx
- components/notifications/notification-detail.tsx
- components/notifications/notification-category-card.tsx
- components/notifications/notification-activity-timeline.tsx
- components/notifications/alert-review-panel.tsx
- components/notifications/alert-severity-badge.tsx
- components/notifications/disabled-notification-actions.tsx
- components/notifications/notification-safety-note.tsx
- components/settings/notification-preferences-panel.tsx

## Product vocabulary

Extend or reuse the existing model to support:

- Notification
- NotificationCategory
- NotificationSeverity
- NotificationStatus
- NotificationSource
- AlertReviewItem
- AlertReviewStatus
- AlertActionPreview
- NotificationActivityEvent
- NotificationPreferencePreview

These are TypeScript types and local/static mock data only. Do not wire them to real webhooks, push notifications, provider APIs, workers, queues, background jobs, or backend services.

## Notification safety requirements

- Notifications must be mock/local-only.
- Alert review items must come from local/static mock data only.
- No webhook receiver may be added.
- No provider sync may be added.
- No push, email, SMS, or external notification delivery may be added.
- No API routes, route handlers, server actions, middleware auth, backend calls, queues, workers, or background jobs may be added.
- Mark-read, snooze, resolve, archive, escalate, and open-provider actions must render but must not perform real actions.
- Notification preferences must be preview metadata only.
- Integration-linked alerts may reference mock integration/provider metadata only.
- The UI must clearly state that notifications and alerts are local/static in this phase.

## UX requirements

- A Notifications surface is reachable from app navigation.
- Notifications render from local/static mock data.
- At least one notification detail or alert review surface exists.
- Notification categories are visible.
- Severity and status badges are visible.
- Unread/read state is represented visually.
- Integration-linked metadata is visible when relevant.
- Mock activity timeline is visible.
- Notification preferences preview is visible in Settings if implemented.
- Mark-read, snooze, resolve, archive, escalate, and open-provider controls are disabled or simulated only.
- The UI remains usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Notifications and alerts are mocked locally in this phase. No webhooks, push delivery, email, provider sync, background jobs, or backend event ingestion are active.

## Tasks

1. Inspect the existing Phase 12 scaffold.
2. Extend notification, alert review, severity, status, source, and activity types.
3. Add static/mock notifications, alert review items, categories, activity events, and preference previews.
4. Add a notification center route and navigation entry.
5. Add notification cards.
6. Add notification detail or alert review surface.
7. Add severity and status badges.
8. Add notification category cards.
9. Add notification activity timeline.
10. Add disabled mark-read/snooze/resolve/archive/escalate/open-provider action UI.
11. Add notification preferences preview in Settings if useful.
12. Add visible local/static notification safety copy.
13. Ensure no real webhooks, provider sync, notification delivery, workers, queues, API routes, route handlers, server actions, backend calls, credential usage, or secret usage are added.
14. Run validation.
15. Update this phase file with validation evidence.

## Acceptance criteria

- Notifications surface resolves.
- At least one mock notification exists.
- At least one notification category exists.
- At least one notification detail or alert review surface exists.
- Severity and status metadata render from local/static data.
- Unread/read state is visible.
- At least one integration-linked notification or alert exists.
- At least one mock notification activity event exists.
- Mark-read, snooze, resolve, archive, escalate, and open-provider controls are disabled or simulated only.
- Required mock-notifications safety copy is visible in the UI.
- No real webhook, webhook receiver, push delivery, email delivery, SMS delivery, provider sync, worker, queue, background job, backend event ingestion, database event persistence, real alert processing, API route, route handler, server action, middleware auth, cloud sync, credential usage, secret usage, WebSocket, SSH, PTY, terminal runtime, runner, streaming, real log ingestion, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Implemented with a local notification center, notification detail route, alert review panel, notification categories, disabled actions, activity timeline, and settings preference preview. Validation evidence: `npm run typecheck` passed.
