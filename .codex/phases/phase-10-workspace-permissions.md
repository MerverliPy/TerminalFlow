# Phase 10 — Workspace Permissions and Access Review UI

Status: pending

## Goal

Add a mock/local-only workspace permissions and access review experience so TerminalFlow can represent members, roles, permission groups, access warnings, and disabled invite/remove actions without implementing real authorization, backend auth, RBAC enforcement, API routes, server actions, database users, tokens, secrets, or remote execution.

## Why this phase is next

Phase 09 added a mock/local-only auth and workspace boundary. Phase 10 should define how TerminalFlow displays workspace membership, roles, permissions, and access review before introducing real backend authorization, organization management, secrets, host access, workflow execution, or deployment controls.

## In scope

- add mock workspace member data
- add typed role and permission models
- add workspace permissions UI
- add access review UI
- add permission group cards
- add member access table or list
- add local-only audit/review notes
- add disabled invite/remove/change-role actions
- add visible copy explaining permissions are mock/local-only
- preserve existing routes and behavior from prior phases

## Out of scope

- real authorization
- RBAC enforcement
- backend auth
- database users
- organization billing
- real invites
- real member removal
- real role changes
- API routes
- route handlers
- server actions
- middleware auth
- session cookies
- token storage
- secret storage
- SSH key storage
- private key storage
- remote execution
- SSH
- PTY
- WebSockets
- streaming logs
- workflow runners
- background jobs
- queues
- cloud sync
- deployment logic

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(auth)/workspace/page.tsx
- app/(tabs)/settings/page.tsx
- app/(tabs)/settings/permissions/page.tsx
- app/globals.css
- lib/domain/types.ts
- lib/domain/mock-data.ts
- lib/auth/auth-types.ts
- lib/auth/mock-auth.ts
- lib/navigation/routes.ts
- components/settings/workspace-boundary-panel.tsx
- components/settings/workspace-permissions-panel.tsx
- components/settings/member-access-list.tsx
- components/settings/permission-group-card.tsx
- components/settings/access-review-panel.tsx
- components/settings/disabled-access-actions.tsx
- components/settings/permissions-safety-note.tsx

## Product vocabulary

Extend or reuse the existing model to support:

- WorkspaceMember
- WorkspacePermission
- WorkspacePermissionGroup
- WorkspaceRole
- WorkspaceAccessReview
- WorkspaceAccessFinding
- WorkspaceInvitePreview
- WorkspaceAuditNote

These are TypeScript types and local/mock data only. Do not wire them to real authorization, backend APIs, middleware, session cookies, or database users.

## Permission boundary requirements

- Permissions must be mock/local-only.
- No real RBAC enforcement may be added.
- No API routes, route handlers, server actions, middleware auth, or backend calls may be added.
- No passwords, tokens, cookies, secrets, credentials, SSH keys, or private keys may be stored.
- Invite, remove, and change-role actions must render but must not perform real actions.
- Access review findings must come from local/static mock data only.
- The UI must clearly state that workspace permissions are not enforced in this phase.

## UX requirements

- Settings exposes a workspace permissions or access review surface.
- Workspace members render from local/static mock data.
- Roles and permission groups are visible.
- Access review findings are visible.
- Invite, remove, and change-role controls are disabled or simulated only.
- The UI remains usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Workspace permissions are mocked locally in this phase. No real authorization, invite, role change, or member removal is active.

## Tasks

1. Inspect the existing Phase 09 scaffold.
2. Extend workspace member, role, permission, and access review types.
3. Add static/mock workspace member and permission data.
4. Add a Settings permissions or access review surface.
5. Add permission group cards.
6. Add member access list.
7. Add access review panel.
8. Add disabled invite/remove/change-role action UI.
9. Add visible mock-permissions safety copy.
10. Ensure no real authorization, RBAC enforcement, API route, route handler, server action, middleware auth, cookies, tokens, secrets, or backend calls are added.
11. Run validation.
12. Update this phase file with validation evidence.

## Acceptance criteria

- Workspace permissions or access review UI exists.
- At least one mock workspace member exists.
- At least one role or permission group exists.
- Member access list renders from local/static data.
- Access review findings render from local/static data.
- Invite, remove, and change-role actions are disabled or simulated only.
- Required mock-permissions safety copy is visible in the UI.
- No real authorization, RBAC enforcement, backend auth, API route, route handler, server action, middleware auth, cookie session, database user, token storage, secret storage, SSH key storage, private key storage, WebSocket, SSH, PTY, terminal runtime, queue, background job, runner, streaming, real log ingestion, cloud sync, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Pending.
