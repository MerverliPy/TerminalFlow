# Phase 11 — Secrets Vault UI and Credential Safety Boundary

Status: pending

## Goal

Add a mock/local-only secrets vault and credential safety boundary UI so TerminalFlow can represent secret metadata, credential categories, access policies, vault activity, and disabled secret actions without storing, revealing, copying, encrypting, syncing, or transmitting any real secrets.

## Why this phase is next

Phase 10 added mock workspace permissions and access review. Phase 11 should define how TerminalFlow safely represents credentials and secrets before introducing any real secret storage, encryption, key management, SSH keys, API tokens, host credentials, backend vault integration, cloud sync, or workflow execution.

## In scope

- add mock secrets vault UI
- add typed secret metadata and credential category models
- add static/mock secret metadata records
- add redacted placeholder display
- add access policy preview UI
- add mock vault activity/audit UI
- add disabled add/edit/delete/reveal/copy/rotate actions
- add visible safety copy explaining no real secrets are stored
- preserve existing routes and behavior from prior phases

## Out of scope

- real secret storage
- secret values
- password storage
- token storage
- SSH key storage
- private key storage
- encryption
- key management
- reveal secret behavior
- copy secret behavior
- rotate secret behavior
- backend vault integration
- API routes
- route handlers
- server actions
- middleware auth
- database persistence for secrets
- cloud sync
- remote execution
- SSH
- PTY
- WebSockets
- streaming logs
- workflow runners
- background jobs
- queues
- deployment logic

## Primary files

Adjust paths only if the existing scaffold uses different names.

- app/(tabs)/settings/page.tsx
- app/(tabs)/settings/secrets/page.tsx
- app/globals.css
- lib/domain/types.ts
- lib/domain/mock-data.ts
- lib/navigation/routes.ts
- components/settings/workspace-boundary-panel.tsx
- components/settings/secrets-vault-panel.tsx
- components/settings/secret-metadata-card.tsx
- components/settings/secret-category-card.tsx
- components/settings/secret-access-policy-panel.tsx
- components/settings/secret-activity-list.tsx
- components/settings/disabled-secret-actions.tsx
- components/settings/secrets-safety-note.tsx

## Product vocabulary

Extend or reuse the existing model to support:

- SecretMetadata
- SecretCategory
- SecretProvider
- SecretScope
- SecretAccessPolicy
- SecretAccessFinding
- SecretActivityEvent
- SecretRotationState
- SecretRiskLevel

These are TypeScript types and local/static mock data only. Do not store secret values.

## Secret safety requirements

- No real secret values may be added anywhere.
- No placeholder should look like a real token, API key, password, SSH key, or private key.
- Use redacted display text only, such as `••••••••`.
- No reveal/copy/rotate/add/edit/delete action may perform a real action.
- No API routes, route handlers, server actions, middleware auth, backend calls, or cloud sync may be added.
- No passwords, tokens, cookies, secrets, credentials, SSH keys, or private keys may be stored.
- Vault activity must come from local/static mock data only.
- The UI must clearly state that the vault is metadata-only in this phase.

## UX requirements

- Settings exposes a secrets/vault surface.
- A secrets page or panel lists mock secret metadata.
- Secret records show category, scope, provider, risk level, rotation state, and last reviewed/updated metadata.
- Secret values are never shown.
- Access policy preview is visible.
- Vault activity/audit-style events are visible.
- Add, edit, delete, reveal, copy, and rotate controls are disabled or simulated only.
- The UI remains usable on a phone viewport.

## Required UI copy

Include this copy somewhere visible:

Secrets vault is metadata-only in this phase. No secret values, tokens, passwords, SSH keys, private keys, encryption, or backend vault storage are active.

## Tasks

1. Inspect the existing Phase 10 scaffold.
2. Extend secret metadata, category, policy, and vault activity types.
3. Add static/mock secret metadata, category, access policy, and vault activity data.
4. Add a Settings secrets/vault surface.
5. Add secret metadata cards.
6. Add credential category cards.
7. Add access policy preview UI.
8. Add vault activity/audit list.
9. Add disabled add/edit/delete/reveal/copy/rotate action UI.
10. Add visible metadata-only secrets safety copy.
11. Ensure no real secret values, token-shaped values, key material, API routes, route handlers, server actions, middleware auth, backend calls, encryption, cloud sync, or real vault logic are added.
12. Run validation.
13. Update this phase file with validation evidence.

## Acceptance criteria

- Settings exposes a secrets/vault UI.
- At least one mock secret metadata record exists.
- At least one secret category exists.
- At least one access policy preview exists.
- At least one vault activity event exists.
- Secret values are never shown or stored.
- Add, edit, delete, reveal, copy, and rotate controls are disabled or simulated only.
- Required metadata-only secrets safety copy is visible in the UI.
- No real secret storage, secret value, password storage, token storage, SSH key storage, private key storage, encryption, key management, backend vault, API route, route handler, server action, middleware auth, database secret persistence, cloud sync, WebSocket, SSH, PTY, terminal runtime, queue, background job, runner, streaming, real log ingestion, or deployment logic is added.
- `npm run typecheck` passes.

## Validation command

Use:

    npm run typecheck

## Completion summary

Completed locally.

Validation evidence:

- `npm run typecheck` passed.
