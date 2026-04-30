# TerminalFlow v0.1 Implementation Plan

## 1. Purpose

This document defines the implementation plan for TerminalFlow v0.1.

v0.1 must stay focused on the foundation:

> A user can open TerminalFlow from a mobile browser and control a coding workspace running on their own Linux PC/server.

This version should not include AI providers, AI agents, token dashboards, sandbox containers, GitHub workflows, database deployment, or visual workflow builders.

---

## 2. Locked v0.1 Stack

| Area | Technology |
|---|---|
| Frontend | Next.js |
| Backend | FastAPI |
| App database | SQLite |
| Terminal bridge | WebSocket |
| Install/runtime | Docker Compose |
| Host target | Linux PC/server |
| Client target | Mobile browser |
| User model | Single-user/self-hosted |
| Access model | Local/private/VPN first |

---

## 3. v0.1 Goal

TerminalFlow v0.1 should prove the core workflow:

1. Start TerminalFlow on a Linux PC/server.
2. Open TerminalFlow from a phone browser.
3. Access one workspace.
4. Open a terminal connected to the host.
5. Run commands.
6. Browse files.
7. View file contents.
8. Save basic app and terminal settings.

---

## 4. v0.1 Non-Goals

The following must not be implemented in v0.1:

- AI provider integration
- OpenAI integration
- Anthropic integration
- AI agents
- Token usage dashboard
- GitHub OAuth
- Git clone/commit/push flows
- Pull request support
- File editing
- Sandbox containers
- Database deployment panel
- Agent workflow dashboard
- Multi-user accounts
- Team workspaces
- Public SaaS hosting
- Billing or payments

---

## 5. Repository Structure

The initial repository should use this structure:

```text
TerminalFlow/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   └── shared/
├── docs/
├── scripts/
├── docker-compose.yml
├── .env.example
├── README.md
├── PRODUCT_SPEC.md
├── ROADMAP.md
├── VERSION_PLAN.md
├── V0_1_IMPLEMENTATION_PLAN.md
└── memory.md