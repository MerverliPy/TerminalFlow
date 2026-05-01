export type ConnectionState = "connected" | "connecting" | "offline";
export type ProjectHealth = "ready" | "attention";
export type SessionStatus = "running" | "idle" | "paused";
export type SessionState = SessionStatus;
export type CommandStatus = "completed" | "queued" | "draft" | "blocked";
export type WorkflowState = "ready" | "draft" | "blocked";

export interface HostConnection {
  id: string;
  name: string;
  host: string;
  status: ConnectionState;
  platform: string;
  workspaceRoot: string;
  lastSeenAt: string;
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  path: string;
  language: string;
  hostId: string;
  health: ProjectHealth;
  updatedAt: string;
  openFiles: number;
}

export interface TerminalSession {
  id: string;
  title: string;
  projectId: string;
  hostId: string;
  state: SessionStatus;
  branch: string;
  lastActivityAt: string;
  cwd: string;
  commandPreview: string;
  outputPreview: string;
  startedAt: string;
}

export interface CommandEntry {
  id: string;
  sessionId: string;
  command: string;
  status: CommandStatus;
  timestamp: string;
  cwd: string;
  output: string;
}

export interface Workflow {
  id: string;
  name: string;
  projectId: string;
  trigger: string;
  state: WorkflowState;
  steps: string[];
  lastRunAt: string;
}
