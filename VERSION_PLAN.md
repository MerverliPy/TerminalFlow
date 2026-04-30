# TerminalFlow Version Plan

## 1. Purpose

This document defines what each TerminalFlow version should include and exclude.

The goal is to prevent scope creep and keep each release focused.

## 2. Locked Baseline

| Area | Locked Choice |
|---|---|
| Repository name | TerminalFlow |
| Product type | Self-hosted mobile-first AI coding workspace |
| Frontend | Next.js |
| Backend | FastAPI |
| App database | SQLite |
| Host target | Linux PC/server |
| Install method | Docker Compose |
| Terminal bridge | WebSocket-based terminal sessions |
| Initial user type | Self-hosting developer |
| Initial access model | Local/private/VPN access |
| First release focus | Mobile terminal + file viewer |

## 3. Version Strategy

TerminalFlow will use small, focused releases.

Each version must answer one main product question:

| Version | Product Question |
|---|---|
| v0.1 | Can a user control a host terminal from a mobile browser? |
| v0.2 | Can a user work with a real GitHub project? |
| v0.3 | Can a user connect AI and run a controlled coding assistant? |
| v0.4 | Can a user understand and control AI token usage? |
| v0.5 | Can an agent run commands safely inside a sandbox? |
| v0.6 | Can a user build repeatable coding-agent workflows? |
| v0.7 | Can a user deploy project database services visually? |

## 4. v0.1 Detailed Plan — Mobile Remote Coding Shell

### 4.1 v0.1 Goal

The goal of v0.1 is to prove the core TerminalFlow workflow:

> A user can open TerminalFlow from a mobile browser and control a coding workspace running on their own Linux PC/server.

### 4.2 v0.1 User Story

As a self-hosting developer, I want to open TerminalFlow from my phone so I can run commands and inspect files on my own Linux development machine.

### 4.3 v0.1 Included Features

#### Frontend

- Next.js app
- Mobile-first layout
- Terminal screen
- File browser screen
- File viewer screen
- Settings screen
- Simple navigation between major screens

#### Backend

- FastAPI app
- WebSocket terminal endpoint
- File listing endpoint
- File read endpoint
- Settings read/write endpoints
- Basic app health endpoint

#### Persistence

- SQLite database
- Persist basic app settings
- Persist workspace metadata
- Persist terminal appearance settings

#### Terminal

- Single terminal session
- WebSocket communication
- Real-time command output
- Basic terminal resizing behavior
- Basic mobile input support

#### Files

- Browse directory tree
- Open file
- View file contents
- Handle common text files
- Show basic file metadata where useful

#### Settings

- Terminal font size
- Terminal theme mode or appearance option
- Workspace root path
- Basic app preferences

#### Deployment

- Docker Compose setup
- Local development instructions
- Linux host target
- Environment variable configuration

### 4.4 v0.1 Excluded Features

v0.1 must not include:

- AI provider integration
- OpenAI integration
- Anthropic integration
- AI agents
- Token usage dashboard
- GitHub OAuth
- GitHub clone flow
- Git commit flow
- Git push flow
- Pull request flow
- File editing
- Sandbox containers
- Database deployment panel
- Agent workflow dashboard
- Multi-user login
- Team workspaces
- Public SaaS hosting
- Billing
- Payments

### 4.5 v0.1 Success Criteria

v0.1 is complete when:

- The app can be started with Docker Compose.
- The frontend loads in a mobile browser.
- The backend responds to health checks.
- A user can access one workspace.
- A user can open a browser terminal.
- A user can run shell commands through the terminal.
- Terminal output streams back to the browser.
- A user can browse files.
- A user can open and view text files.
- Basic settings persist across app restarts.

### 4.6 v0.1 Risk Areas

Potential risks:

- Terminal behavior on mobile keyboards
- WebSocket stability
- Terminal resizing on small screens
- File path safety
- Host command execution safety
- Docker permissions
- Cross-device network access
- Authentication expectations

### 4.7 v0.1 Safety Rules

v0.1 should follow these safety rules:

- Default to private/local use.
- Do not expose the app publicly by default.
- Restrict file access to the configured workspace root.
- Avoid destructive default actions.
- Keep terminal access clearly visible to the user.
- Do not run hidden background commands.
- Do not include autonomous agent behavior.

## 5. v0.2 Detailed Plan — GitHub Project Workspace

### 5.1 v0.2 Goal

Make TerminalFlow useful for real GitHub repositories.

### 5.2 Included Features

- GitHub repository clone flow
- Open local project
- Improved file tree
- Basic file edit/save
- Git status display
- Local commit creation
- Project history
- Workspace switching

### 5.3 Excluded Features

- Pull request creation
- GitHub issue management
- AI code generation
- Agent workflows
- Sandboxed execution
- Multi-user project permissions

### 5.4 Success Criteria

v0.2 is complete when:

- A user can clone a GitHub repository.
- A user can open a cloned project.
- A user can browse the project files.
- A user can edit and save a file.
- A user can view Git status.
- A user can create a local commit.

## 6. v0.3 Detailed Plan — AI Provider Connection + First Agent

### 6.1 v0.3 Goal

Allow users to connect AI providers and run one controlled coding assistant.

### 6.2 Included Features

- AI provider adapter interface
- OpenAI provider support
- Anthropic provider support
- Provider credential storage
- Model selection
- First coding assistant
- Proposed file edits
- Proposed command execution
- User approval before edits
- User approval before commands
- Agent run history

### 6.3 Excluded Features

- Fully autonomous execution
- Multi-agent orchestration
- Workflow builder
- Background autonomous coding
- Public agent marketplace

### 6.4 Success Criteria

v0.3 is complete when:

- A user can add provider credentials.
- A user can choose a provider and model.
- A user can ask the assistant for a coding task.
- The assistant can propose an edit.
- The user can approve or reject the edit.
- The assistant can propose a command.
- The user can approve or reject the command.
- The run is saved in history.

## 7. v0.4 Detailed Plan — Token Usage Dashboard

### 7.1 v0.4 Goal

Make AI usage visible and controllable.

### 7.2 Included Features

- Token usage by provider
- Token usage by model
- Token usage by project
- Token usage by session
- Token usage by agent
- Estimated cost
- Warning thresholds
- High-usage indicators
- Soft confirmation before continuing after threshold warning

### 7.3 Excluded Features

- Billing
- Payment processing
- Team cost allocation
- Enterprise usage exports
- Provider-side hard enforcement

### 7.4 Success Criteria

v0.4 is complete when:

- A user can see token usage for AI calls.
- A user can see usage grouped by provider and model.
- A user can see usage grouped by project/session/agent.
- A user can configure a warning threshold.
- The app warns before high usage continues.

## 8. v0.5 Detailed Plan — Sandboxed Execution

### 8.1 v0.5 Goal

Allow approved commands and agent actions to run inside project sandboxes.

### 8.2 Included Features

- Docker-based sandbox backend
- Per-project sandbox
- Sandbox create/start/stop/rebuild controls
- Basic resource limits
- Basic network controls
- Command logs
- Clear host-vs-sandbox execution indicator
- Pluggable sandbox backend design

### 8.3 Excluded Features

- Enterprise-grade sandbox isolation
- Multi-tenant execution
- Unrestricted autonomous command execution
- Cloud orchestration
- Sandbox marketplace

### 8.4 Success Criteria

v0.5 is complete when:

- A user can create a sandbox for a project.
- A user can start and stop the sandbox.
- Approved commands can run inside the sandbox.
- The user can view command logs.
- The app clearly shows whether a command ran on the host or inside the sandbox.

## 9. v0.6 Detailed Plan — Agent Workflow Dashboard

### 9.1 v0.6 Goal

Allow users to create repeatable coding-agent workflows.

### 9.2 Included Features

- Workflow templates
- Agent role definitions
- Ordered steps
- Approval gates
- Workflow run logs
- YAML import/export
- JSON import/export

### 9.3 Excluded Features

- Full visual drag-and-drop workflow builder
- Public workflow marketplace
- Team approval systems
- Fully autonomous background workflows

### 9.4 Success Criteria

v0.6 is complete when:

- A user can select a workflow template.
- A user can configure workflow steps.
- A user can assign agent roles.
- A user can run a workflow.
- The app pauses at approval gates.
- The user can review workflow logs.
- The user can import/export workflow definitions.

## 10. v0.7 Detailed Plan — Database Deployment Panel

### 10.1 v0.7 Goal

Allow users to deploy and manage common project database services.

### 10.2 Included Features

- Postgres container deployment
- Redis container deployment
- Start/stop/reset controls
- Connection string display
- Health checks
- Basic service logs

### 10.3 Excluded Features

- Full database GUI
- Advanced SQL editor
- Production database hosting
- Automated backups
- Managed cloud database provisioning

### 10.4 Success Criteria

v0.7 is complete when:

- A user can add a database service to a project.
- A user can start and stop that service.
- A user can view connection details.
- A user can check service health.
- A user can reset the local service.

## 11. Post-v0.7 Possibilities

After v0.7, TerminalFlow may expand into:

- PWA install support
- GitHub OAuth
- Pull request creation
- Visual workflow builder
- More AI providers
- Local model support
- Advanced sandbox isolation
- Visual database browser
- Team workspaces
- Role-based permissions
- Audit logs
- Public deployment mode
- Remote server fleet management

## 12. Scope Control Rules

To avoid overbuilding:

1. Each version must have one main goal.
2. Features that do not support the version goal should move to a later version.
3. AI agents must not be added before basic project workflows exist.
4. Token usage tracking must not be added before provider calls exist.
5. Sandboxes must not be added before controlled command execution exists.
6. Workflow dashboards must not be added before a basic agent exists.
7. Database UI must not be added before the terminal, files, GitHub, and AI foundations are usable.

## 13. Current Status

Current status:

- Repository name locked: TerminalFlow
- Stack locked: Next.js + FastAPI
- Database locked for v0.1: SQLite
- Install method locked for v0.1: Docker Compose
- Host target locked for v0.1: Linux PC/server
- Implementation status: not started
- Current phase: planning documentation

## 14. Next Step After This File

After this version plan is accepted, the next step is to create the initial repository structure.

The first implementation task should be limited to the v0.1 foundation:

- Next.js app shell
- FastAPI app shell
- Docker Compose setup
- SQLite setup
- Basic health check
- Mobile-first layout shell

No AI, agents, token dashboard, sandbox, GitHub workflow, or database deployment should be implemented in the first setup task.