export type ConnectionState = "connected" | "connecting" | "offline";
export type ProjectHealth = "ready" | "attention";
export type SessionState = "running" | "idle" | "paused";
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
  state: SessionState;
  cwd: string;
  commandPreview: string;
  outputPreview: string;
  startedAt: string;
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
