# Phase 09 — Auth and User Workspace Boundary

Status: pending

## Goal

Add a mock/local-only authentication and workspace boundary so TerminalFlow can represent signed-out, signed-in, account, and workspace-selection states without implementing real OAuth, session cookies, backend auth, API routes, server actions, database users, secrets, or remote execution.

## Why this phase is next

Phase 08 added a local persistence boundary. Phase 09 should define how TerminalFlow represents users and workspaces before introducing real authentication, backend synchronization, workspace permissions, host access, workflow execution, or deployment controls.

## In scope

- add mock/local-only auth state model
- add typed user and workspace domain models
- add signed-out landing/sign-in UI
- add signed-in mock account state
- add workspace selector UI
- add account/profile surface
- add workspace boundary copy
- add local-only mock session data
- optionally store selected workspace locally using the Phase 08 local store pattern
- preserve existing routes and behavior from prior phases

## Out of scope

- real OAuth
- GitHub OAuth
- password auth
- session cookies
- backend auth
- database users
- API routes
- route handlers
- server actions
- real authorization
- RBAC enforcement
- organization billing
- cloud sync
- remote execution
- SSH
- PTY
- WebSockets
- streaming logs
- workflow runners
- background jobs
- queues
- secrets or credential storage
- token storage
- private key storage
- deployment logic

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/page.tsx
- app/(tabs)/layout.tsx
- app/(tabs)/settings/page.tsx
- app/(auth)/sign-in/page.tsx
- app/(auth)/workspace/page.tsx
- app/globals.css
- lib/navigation/routes.ts
- lib/domain/types.ts
- lib/domain/mock-data.ts
- lib/auth/mock-auth.ts
- lib/auth/auth-types.ts
- components/auth/sign-in-panel.tsx
- components/auth/signed-out-hero.tsx
- components/auth/workspace-card.tsx
- components/auth/workspace-selector.tsx
- components/auth/mock-auth-safety-note.tsx
- components/settings/account-panel.tsx
- components/settings/workspace-boundary-panel.tsx

## Product vocabulary

Extend or reuse the existing model to support:

- User
- UserProfile
- Workspace
- WorkspaceRole
- WorkspaceMembership
- MockAuthSession
- AuthState
- WorkspaceSelection

These are TypeScript types and local/mock auth abstractions only. Do not wire them to real OAuth, backend APIs, session cookies, or database users.

## Auth boundary requirements

- Authentication must be mock/local-only.
- No OAuth provider may be configured.
- No GitHub OAuth may be added.
- No API routes, route handlers, server actions, middleware auth, or backend calls may be added.
- No passwords, tokens, cookies, secrets, credentials, SSH keys, or private keys may be stored.
- Signed-in state may be represented by local/static mock data only.
- Workspace selection may be local-only.
- The UI must clearly state that auth and workspace membership are mocked in this phase.

## UX requirements

- A signed-out entry surface exists.
- A sign-in page or sign-in panel exists.
- Mock sign-in controls render but do not call a real auth provider.
- A signed-in shell can show mock user identity.
- A workspace selector lists static/local workspaces.
- Settings shows account/profile information from mock data.
- Settings shows workspace boundary information.
- The UI remains usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Authentication and workspace membership are mocked locally in this phase. No OAuth, backend session, database user, token, or secret is active.

## Tasks

1. Inspect the existing Phase 08 scaffold.
2. Add mock/local auth types.
3. Add mock user and workspace data.
4. Add a local-only mock auth helper.
5. Add signed-out/sign-in UI.
6. Add workspace selector UI.
7. Add account/profile settings UI.
8. Add workspace boundary settings UI.
9. Add visible mock-auth safety copy.
10. Ensure no OAuth, API route, route handler, server action, middleware auth, cookies, tokens, secrets, or backend calls are added.
11. Run validation.
12. Update this phase file with validation evidence.

## Acceptance criteria

- A signed-out or sign-in UI exists.
- A mock signed-in state exists.
- At least one mock user exists.
- At least one mock workspace exists.
- Workspace selector UI renders from local/static data.
- Settings renders mock account/profile information.
- Settings renders workspace boundary information.
- Required mock-auth safety copy is visible in the UI.
- No OAuth, GitHub OAuth, password auth, backend auth, API route, route handler, server action, middleware auth, cookie session, database user, token storage, secret storage, SSH key storage, private key storage, WebSocket, SSH, PTY, terminal runtime, queue, background job, runner, streaming, real log ingestion, cloud sync, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Completed locally.

Validation evidence:

- `npm run typecheck` passed.
