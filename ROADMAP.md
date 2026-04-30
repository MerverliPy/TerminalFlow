# TerminalFlow Roadmap

## 1. Roadmap Philosophy

TerminalFlow will be built incrementally.

The project should not attempt to release terminal control, files, GitHub integration, AI providers, token tracking, sandbox containers, workflow dashboards, and database tools all at once.

Each version should have a narrow purpose and should produce a usable improvement over the previous version.

## 2. Locked Product Direction

TerminalFlow is a self-hosted, mobile-first AI coding workspace.

The platform starts as a mobile remote terminal and file viewer, then expands into a broader coding control dashboard with GitHub workflows, AI provider integrations, token usage monitoring, sandboxed agent execution, workflow creation, and database deployment tools.

## 3. Version Overview

| Version | Name | Main Goal |
|---|---|---|
| v0.1 | Mobile Remote Coding Shell | Open TerminalFlow from a phone and control a Linux host terminal |
| v0.2 | GitHub Project Workspace | Open, clone, inspect, and begin managing repositories |
| v0.3 | AI Provider Connection + First Agent | Connect AI providers and run controlled coding-assistant tasks |
| v0.4 | Token Usage Dashboard | Track usage, cost, and high-usage warnings |
| v0.5 | Sandboxed Execution | Run agent commands inside controlled containers |
| v0.6 | Agent Workflow Dashboard | Create repeatable coding-agent workflows |
| v0.7 | Database Deployment Panel | Deploy and manage project database containers |

## 4. v0.1 — Mobile Remote Coding Shell

### Goal

Prove that a user can open TerminalFlow from a mobile browser and control a coding workspace running on their own Linux PC/server.

### Primary Features

- Mobile-first Next.js interface
- FastAPI backend
- SQLite persistence
- Docker Compose install
- Basic local/dev access gate
- Single workspace
- Browser terminal
- WebSocket terminal bridge
- Basic terminal settings
- File tree
- File viewer

### Success Criteria

v0.1 is successful when a user can:

- Install TerminalFlow on a Linux PC/server
- Open the app from a mobile browser
- Access a single workspace
- Run terminal commands
- Browse files
- View file contents
- Adjust basic terminal appearance settings

### Explicitly Excluded

- AI providers
- AI agents
- Token dashboard
- GitHub OAuth
- Git commit/push support
- Sandbox containers
- Database deployment
- Agent workflow dashboard
- Multi-user teams

## 5. v0.2 — GitHub Project Workspace

### Goal

Make TerminalFlow useful for real repositories.

### Primary Features

- Clone a GitHub repository
- Open an existing project
- Improve file browser navigation
- Add basic file edit/save support
- Show Git status
- Create local commits
- Persist project/session history

### Success Criteria

v0.2 is successful when a user can:

- Clone a GitHub repo into TerminalFlow
- Open the repo from a mobile browser
- Browse the project files
- Edit and save a file
- View Git status
- Create a commit

### Explicitly Excluded

- Pull request creation
- Full GitHub issue management
- AI code editing
- Agent workflows
- Sandboxed execution
- Multi-user collaboration

## 6. v0.3 — AI Provider Connection + First Agent

### Goal

Introduce AI coding assistance without overbuilding the agent system.

### Primary Features

- Provider adapter interface
- OpenAI provider support
- Anthropic provider support
- Encrypted provider credential storage
- Model selection
- First controlled coding assistant
- Approval step before file edits
- Approval step before command execution
- Agent run history

### Success Criteria

v0.3 is successful when a user can:

- Add an AI provider credential
- Select a provider and model
- Start a basic coding-assistant task
- Review proposed file edits
- Approve or reject proposed actions
- View a history of agent runs

### Explicitly Excluded

- Fully autonomous agents
- Complex multi-agent workflows
- Visual workflow builder
- Background task execution without user visibility
- Public shared agent marketplace

## 7. v0.4 — Token Usage Dashboard

### Goal

Make AI usage visible, understandable, and controllable.

### Primary Features

- Token usage by provider
- Token usage by model
- Token usage by project
- Token usage by session
- Token usage by agent
- Estimated cost
- Warning indicators
- Soft usage thresholds
- Usage history

### Success Criteria

v0.4 is successful when a user can:

- See how many tokens were used
- See which provider and model used the tokens
- See which project/session/agent caused the usage
- Configure a warning threshold
- Receive a high-usage warning before continuing

### Explicitly Excluded

- Billing system
- Payment processing
- Team cost allocation
- Enterprise reporting
- Hard provider-level enforcement beyond local app limits

## 8. v0.5 — Sandboxed Execution

### Goal

Allow coding agents to run commands more safely.

### Primary Features

- Per-project sandbox container
- Docker-based sandbox backend
- Start/stop/rebuild sandbox controls
- Command execution logs
- Basic resource limits
- Basic network controls
- Pluggable sandbox backend design

### Success Criteria

v0.5 is successful when a user can:

- Create a sandbox for a project
- Start and stop the sandbox
- Run approved commands inside the sandbox
- View command logs
- Rebuild the sandbox when needed
- Understand whether an action ran on the host or in the sandbox

### Explicitly Excluded

- Enterprise-grade isolation
- Multi-tenant container hosting
- Unrestricted autonomous command execution
- Marketplace for sandbox templates
- Full cloud container orchestration

## 9. v0.6 — Agent Workflow Dashboard

### Goal

Allow users to define repeatable coding workflows.

### Primary Features

- Workflow templates
- Agent roles
- Ordered workflow steps
- Manual approval gates
- Workflow execution logs
- YAML workflow export
- JSON workflow export
- YAML/JSON workflow import

### Success Criteria

v0.6 is successful when a user can:

- Select a workflow template
- Configure workflow steps
- Assign agent roles
- Start a workflow
- Approve gated actions
- Review workflow run logs
- Export and import workflow definitions

### Explicitly Excluded

- Full drag-and-drop workflow builder
- Public workflow marketplace
- Unrestricted background agent execution
- Complex team approval policies

## 10. v0.7 — Database Deployment Panel

### Goal

Support project databases and local development services.

### Primary Features

- Deploy database containers
- Support Postgres first
- Support Redis after Postgres
- Start/stop/reset database services
- Show connection strings
- Health checks
- Basic service logs

### Success Criteria

v0.7 is successful when a user can:

- Add a database service to a project
- Start the service
- Stop the service
- View connection details
- Check service health
- Reset the service when needed

### Explicitly Excluded

- Full visual database browser
- Advanced SQL editor
- Production database hosting
- Backup automation
- Managed cloud database provisioning

## 11. Future Versions

Future versions may include:

- PWA installation
- Stronger authentication
- GitHub OAuth
- Pull request creation
- More AI providers
- Local model support
- Visual workflow builder
- Advanced sandbox isolation
- Visual database browser
- Team workspaces
- Role-based permissions
- Audit logs
- Remote server management
- Public deployment mode

## 12. Current Roadmap Status

Current locked decisions:

- Repository name: TerminalFlow
- Product name: TerminalFlow
- Frontend: Next.js
- Backend: FastAPI
- Database: SQLite
- Host target: Linux PC/server
- Install method: Docker Compose
- First release focus: Mobile terminal + file viewer

Implementation status:

- Not started
- Documentation baseline normalized
- No implementation authorized yet