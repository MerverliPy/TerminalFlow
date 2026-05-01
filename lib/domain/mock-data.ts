import type {
  HostConnection,
  Project,
  TerminalSession,
  Workflow,
} from "@/lib/domain/types";

export const MOCK_HOST_CONNECTIONS: HostConnection[] = [
  {
    id: "host-main",
    name: "Primary Linux host",
    host: "calvin@workstation",
    status: "connected",
    platform: "Ubuntu 24.04",
    workspaceRoot: "/home/calvin/projects",
    lastSeenAt: "Just now",
  },
  {
    id: "host-lab",
    name: "Lab node",
    host: "calvin@lab-box",
    status: "connecting",
    platform: "Debian 12",
    workspaceRoot: "/srv/workspaces",
    lastSeenAt: "2 minutes ago",
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "terminalflow",
    name: "TerminalFlow",
    summary: "Mobile control plane for terminal-driven workflows.",
    path: "/home/calvin/projects/TerminalFlow",
    language: "TypeScript",
    hostId: "host-main",
    health: "ready",
    updatedAt: "Today, 9:12 AM",
    openFiles: 4,
  },
  {
    id: "signalops",
    name: "SignalOps",
    summary: "Ops dashboard for service checks and deploy notes.",
    path: "/home/calvin/projects/signalops",
    language: "Go",
    hostId: "host-main",
    health: "ready",
    updatedAt: "Yesterday",
    openFiles: 2,
  },
  {
    id: "edge-notes",
    name: "Edge Notes",
    summary: "Side project for lightweight note capture and search.",
    path: "/srv/workspaces/edge-notes",
    language: "Rust",
    hostId: "host-lab",
    health: "attention",
    updatedAt: "2 days ago",
    openFiles: 6,
  },
];

export const MOCK_SESSIONS: TerminalSession[] = [
  {
    id: "session-hub",
    title: "App shell review",
    projectId: "terminalflow",
    hostId: "host-main",
    state: "running",
    cwd: "/home/calvin/projects/TerminalFlow",
    commandPreview: "pnpm typecheck",
    outputPreview: "Type-check is currently green.",
    startedAt: "14 min ago",
  },
  {
    id: "session-api",
    title: "API workspace prep",
    projectId: "signalops",
    hostId: "host-main",
    state: "idle",
    cwd: "/home/calvin/projects/signalops",
    commandPreview: "git status --short",
    outputPreview: "Workspace is clean.",
    startedAt: "1 hr ago",
  },
  {
    id: "session-lab",
    title: "Lab node diagnostics",
    projectId: "edge-notes",
    hostId: "host-lab",
    state: "paused",
    cwd: "/srv/workspaces/edge-notes",
    commandPreview: "cargo test",
    outputPreview: "Waiting on host connection.",
    startedAt: "3 hr ago",
  },
];

export const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: "workflow-check",
    name: "Preflight checks",
    projectId: "terminalflow",
    trigger: "Manual",
    state: "ready",
    steps: ["typecheck", "lint", "build"],
    lastRunAt: "Today, 8:41 AM",
  },
  {
    id: "workflow-notes",
    name: "Update notes",
    projectId: "edge-notes",
    trigger: "Manual",
    state: "draft",
    steps: ["fetch workspace", "preview files", "summarize changes"],
    lastRunAt: "Not run yet",
  },
  {
    id: "workflow-sync",
    name: "Session sync",
    projectId: "signalops",
    trigger: "On demand",
    state: "blocked",
    steps: ["inspect session", "collect output", "queue follow-up"],
    lastRunAt: "Yesterday, 5:14 PM",
  },
];

export const MOCK_WORKSPACE = {
  name: "Calvin's workspace",
  root: "/home/calvin/projects",
  hostConnectionCount: MOCK_HOST_CONNECTIONS.length,
  connectedHosts: MOCK_HOST_CONNECTIONS.filter((host) => host.status === "connected")
    .length,
  projectCount: MOCK_PROJECTS.length,
  runningSessions: MOCK_SESSIONS.filter((session) => session.state === "running").length,
  workflowCount: MOCK_WORKFLOWS.length,
} as const;
