# TerminalFlow Product Specification

## 1. Product Name

**TerminalFlow**

## 2. Product Summary

TerminalFlow is a self-hosted, mobile-first AI coding workspace that lets users control a real Linux PC/server from a phone or mobile browser.

The first version focuses on a reliable mobile terminal and file viewer. Later versions will expand into GitHub repository workflows, AI provider integrations, token usage dashboards, sandboxed coding-agent execution, agent workflow dashboards, and database deployment tools.

## 3. Core Product Statement

TerminalFlow lets developers use a mobile device as a control surface for a real coding environment running on their own machine or server.

The platform is not meant to replace a full desktop IDE in v0.1. Instead, it begins as a focused mobile remote development dashboard and grows into a broader AI-assisted coding control platform over time.

## 4. Primary User

The first target user is a technical, self-hosting developer who is comfortable running a local or server-hosted development tool.

The user may want to:

- Access a coding workspace from a phone
- Run terminal commands remotely
- Inspect project files
- Manage repositories
- Connect AI coding providers
- Track AI token usage
- Run coding agents safely
- Control development containers and databases visually

## 5. Initial Target Environment

TerminalFlow v0.1 targets:

- Linux PC/server host
- Mobile browser client
- Self-hosted deployment
- Private/VPN/local network access
- Docker Compose installation
- Single-user usage

Public SaaS hosting, team accounts, and multi-tenant security are out of scope for the first release.

## 6. Locked v0.1 Technical Baseline

| Area | Decision |
|---|---|
| Frontend | Next.js |
| Backend | FastAPI |
| App database | SQLite |
| Terminal bridge | WebSocket-based terminal sessions |
| Runtime/install | Docker Compose |
| First host target | Linux PC/server |
| First client target | Mobile browser |
| First release focus | Mobile terminal + file viewer |

## 7. Product Goals

TerminalFlow should eventually provide:

- A mobile-first visual terminal interface
- Terminal layout and appearance settings
- A file browser and file viewer
- GitHub repository workflows
- AI provider connections
- Token usage monitoring
- Warning indicators for excessive AI usage
- Sandboxed coding-agent execution
- Agent workflow creation and management
- Database deployment and management tools
- Safe, incremental automation for coding tasks

## 8. Product Non-Goals for v0.1

TerminalFlow v0.1 will not attempt to be:

- A full IDE
- A full replacement for VS Code
- A public SaaS product
- A multi-user team platform
- A complete AI agent platform
- A database management suite
- A cloud-hosted coding environment
- A full visual workflow automation tool

These areas may be added incrementally after the foundation is stable.

## 9. Core Principles

### 9.1 Mobile-first

TerminalFlow should be designed around the constraints of phone screens first.

This means:

- Clear layout
- Large touch targets
- Minimal clutter
- Fast access to terminal actions
- Responsive panels
- Simple navigation between terminal, files, settings, and later dashboards

### 9.2 Self-hosted first

The first version should run on the user’s own Linux PC/server.

The user’s phone acts as the remote control surface.

### 9.3 Incremental releases

TerminalFlow should not attempt to ship every feature at once.

Each version should have a clear purpose and a narrow scope.

### 9.4 Safety before autonomy

AI agents and command execution must be designed with explicit user approval, logging, and sandbox boundaries.

The platform should not allow fully autonomous destructive actions in early versions.

### 9.5 Provider flexibility

AI provider support should be built through an adapter layer.

OpenAI and Anthropic are the first intended providers, but the architecture should allow additional providers later.

### 9.6 Clear usage visibility

AI token usage should be visible by provider, model, project, session, and agent.

The platform should eventually warn users when usage is high or approaching configured limits.

## 10. Key Product Areas

### 10.1 Mobile Terminal

The terminal is the first core feature.

It should allow a user to:

- Open a terminal from a mobile browser
- Connect to the host environment
- Run shell commands
- See command output in real time
- Use a touch-friendly terminal layout
- Adjust basic terminal appearance settings

### 10.2 File Interface

The file interface begins as a file tree and file viewer.

The first version should allow a user to:

- Browse project directories
- Open files
- View file contents
- Navigate between terminal and file viewer

File editing should come after the file viewer is stable.

### 10.3 GitHub Project Workflow

GitHub support should begin after the terminal and file viewer foundation.

The platform should eventually allow users to:

- Clone a GitHub repository
- Open an existing project
- View Git status
- Commit changes
- Push branches
- Create pull requests

### 10.4 AI Provider Integration

AI provider integration should come after the basic project workspace exists.

The platform should eventually allow users to:

- Add provider credentials
- Select an AI provider
- Select a model
- Run controlled coding-assistant tasks
- Track provider usage
- View run history

### 10.5 Token Usage Dashboard

The token dashboard should help users understand and control AI usage.

It should eventually show:

- Tokens used by provider
- Tokens used by model
- Tokens used by project
- Tokens used by coding agent
- Estimated cost
- Warning indicators
- Soft usage limits
- Usage history

### 10.6 Sandbox Container System

The sandbox system should allow coding agents to execute commands more safely.

It should eventually support:

- Per-project sandbox containers
- Start/stop/rebuild controls
- Command execution logs
- Resource limits
- Network policy controls
- Pluggable sandbox backends

The first backend should be basic Docker. Stronger isolation can come later.

### 10.7 Agent Workflow Dashboard

The agent workflow dashboard should allow users to create structured coding workflows.

It should eventually support:

- Workflow templates
- Agent roles
- Ordered workflow steps
- Manual approval gates
- Workflow execution history
- YAML/JSON workflow import and export
- Later visual workflow editing

### 10.8 Database Deployment Panel

The database panel should allow users to deploy project services visually.

It should eventually support:

- Deploying Postgres, Redis, or similar services
- Starting and stopping database containers
- Viewing connection details
- Health checks
- Reset controls
- Later visual table browsing and query tools

## 11. v0.1 Scope

TerminalFlow v0.1 should prove one main idea:

> A user can open TerminalFlow from a mobile browser and control a coding workspace running on their own Linux PC/server.

### v0.1 includes:

- Next.js frontend
- FastAPI backend
- SQLite app database
- Docker Compose setup
- Mobile-first layout
- Basic login/dev access gate
- Single workspace
- Browser terminal
- WebSocket terminal bridge
- Basic terminal appearance settings
- File tree
- File viewer
- App settings persistence

### v0.1 excludes:

- AI provider integrations
- AI agents
- Token dashboard
- GitHub OAuth
- Git commit/push support
- Sandbox containers
- Database deployment panel
- Agent workflow dashboard
- Multi-user accounts
- Public SaaS deployment

## 12. Long-Term Product Vision

TerminalFlow should become a mobile-first command center for AI-assisted software development.

The long-term platform should allow a user to:

1. Open a project from a phone.
2. Run commands on a real host machine.
3. Inspect and edit files.
4. Connect AI providers.
5. Create coding-agent workflows.
6. Run agents inside controlled sandboxes.
7. Track token usage and cost.
8. Deploy supporting services like databases.
9. Manage development tasks safely from a mobile interface.

## 13. Product Status

Current status:

- Product concept defined
- Repository name locked as TerminalFlow
- Product name locked as TerminalFlow
- v0.1 stack locked as Next.js + FastAPI + SQLite + Docker Compose
- Documentation baseline normalized
- Implementation not started

## 14. Implementation Gate

No implementation should begin until the user explicitly approves moving from documentation into repository or code creation. The official planning baseline consists of:

- PRODUCT_SPEC.md
- ROADMAP.md
- VERSION_PLAN.md
- V0_1_IMPLEMENTATION_PLAN.md

After these files are accepted, the next possible step is creating the repository structure for v0.1. That step is still implementation-adjacent and requires explicit user approval.