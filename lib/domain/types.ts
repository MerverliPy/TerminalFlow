export type HostStatus = "connected" | "connecting" | "offline";
export type ProjectHealth = "ready" | "attention";
export type SessionStatus = "running" | "idle" | "paused";
export type SessionState = SessionStatus;
export type CommandStatus = "completed" | "queued" | "draft" | "blocked";
export type HostEnvironment = "local" | "lab" | "remote";
export type ConnectionMethod = "local profile" | "saved preset" | "manual setup";
export type HostSafetyCheckState = "pass" | "warn" | "blocked";
export type WorkflowState = "ready" | "draft" | "blocked";
export type WorkflowStepKind = "command" | "check" | "decision" | "handoff" | "note";
export type WorkflowRunStatus = "ready" | "blocked" | "preview" | "inactive";
export type WorkflowStepStatus = "pending" | "ready" | "running" | "blocked" | "done";
export type WorkflowTriggerKind = "manual" | "schedule" | "event";
export type WorkflowTargetMode = "project" | "host" | "workspace";

export type ConnectionState = HostStatus;

export interface HostConnection {
  id: string;
  name: string;
  host: string;
  status: HostStatus;
  environment: HostEnvironment;
  operatingSystem: string;
  connectionMethod: ConnectionMethod;
  workspaceRoot: string;
  lastCheckedAt: string;
  safetyChecks: HostSafetyCheck[];
}

export interface HostSafetyCheck {
  id: string;
  label: string;
  state: HostSafetyCheckState;
  detail: string;
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
  description: string;
  projectId: string;
  trigger: WorkflowTrigger;
  target: WorkflowTarget;
  state: WorkflowState;
  steps: WorkflowStep[];
  lastRunAt: string;
  runPreview: WorkflowRunPreview;
  safetyChecks: WorkflowSafetyCheck[];
}

export interface WorkflowTrigger {
  id: string;
  kind: WorkflowTriggerKind;
  label: string;
  detail: string;
  schedule?: string;
}

export interface WorkflowTarget {
  id: string;
  mode: WorkflowTargetMode;
  projectId: string;
  hostId: string;
  projectName: string;
  hostName: string;
  workspaceRoot: string;
  detail: string;
}

export interface WorkflowStep {
  id: string;
  kind: WorkflowStepKind;
  title: string;
  detail: string;
  commandPreview?: string;
  status: WorkflowStepStatus;
}

export interface WorkflowSafetyCheck {
  id: string;
  label: string;
  state: HostSafetyCheckState;
  detail: string;
}

export interface WorkflowRunPreview {
  id: string;
  status: WorkflowRunStatus;
  summary: string;
  expectedOutcome: string;
  nextRun: string;
  steps: WorkflowStep[];
  checks: WorkflowSafetyCheck[];
}
