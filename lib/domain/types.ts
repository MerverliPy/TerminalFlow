export type HostStatus = "connected" | "connecting" | "offline";
export type ProjectHealth = "ready" | "attention";
export type SessionStatus = "running" | "idle" | "paused";
export type SessionState = SessionStatus;
export type CommandStatus = "completed" | "queued" | "draft" | "blocked";
export type HostEnvironment = "local" | "lab" | "remote";
export type ConnectionMethod = "local profile" | "saved preset" | "manual setup";
export type HostSafetyCheckState = "pass" | "warn" | "blocked";
export type WorkflowState = "ready" | "draft" | "blocked";
export type WorkflowRunStatus = "completed" | "running" | "paused" | "blocked" | "cancelled" | "failed";
export type WorkflowRunStepKind = "check" | "command" | "decision" | "handoff";
export type WorkflowRunStepStatus = "queued" | "running" | "completed" | "blocked" | "skipped" | "cancelled";
export type WorkflowRunEventKind =
  | "started"
  | "step-started"
  | "step-finished"
  | "log"
  | "interrupted"
  | "cancelled"
  | "completed";
export type WorkflowRunLogLevel = "stdout" | "stderr" | "info" | "warn" | "error";
export type WorkflowRunSafetyState = "safe" | "warning" | "blocked";
export type CommandSimulationMode = "preset" | "manual";
export type SimulatedCommandStatus = "completed" | "warning" | "blocked" | "failed";
export type CommandSimulationSafetyCheckState = "allowlisted" | "warning" | "blocked";

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
  projectId: string;
  trigger: string;
  state: WorkflowState;
  steps: string[];
  lastRunAt: string;
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  workflowName: string;
  projectId: string;
  trigger: string;
  target: string;
  targetDetail: string;
  workspaceRoot: string;
  status: WorkflowRunStatus;
  safetyState: WorkflowRunSafetyState;
  startTime: string;
  duration: string;
  summary: string;
  steps: WorkflowRunStep[];
  timeline: WorkflowRunTimelineItem[];
  logs: WorkflowRunLogEntry[];
}

export interface WorkflowRunStep {
  id: string;
  stepId: string;
  title: string;
  kind: WorkflowRunStepKind;
  status: WorkflowRunStepStatus;
  startedAt: string;
  finishedAt: string;
  duration: string;
  detail: string;
}

export interface WorkflowRunEvent {
  id: string;
  kind: WorkflowRunEventKind;
  time: string;
  title: string;
  detail: string;
  stepId?: string;
}

export interface WorkflowRunTimelineItem extends WorkflowRunEvent {
  index: number;
}

export interface WorkflowRunLogEntry {
  id: string;
  time: string;
  level: WorkflowRunLogLevel;
  stream: "stdout" | "stderr";
  message: string;
  stepId?: string;
}

export interface CommandSimulationSafetyCheck {
  id: string;
  label: string;
  state: CommandSimulationSafetyCheckState;
  detail: string;
}

export interface SimulatedCommandOutput {
  stdout: string[];
  stderr: string[];
}

export interface SimulatedCommandPreset {
  id: string;
  label: string;
  command: string;
  description: string;
  status: SimulatedCommandStatus;
  summary: string;
  exitCode: number | null;
  duration: string;
  output: SimulatedCommandOutput;
  safetyCheck: CommandSimulationSafetyCheck;
}

export interface SimulatedCommand {
  id: string;
  command: string;
  presetId?: string;
  mode: CommandSimulationMode;
  submittedAt: string;
}

export interface SimulatedCommandResult {
  id: string;
  command: string;
  presetId?: string;
  presetLabel?: string;
  mode: CommandSimulationMode;
  status: SimulatedCommandStatus;
  exitCode: number | null;
  duration: string;
  summary: string;
  output: SimulatedCommandOutput;
  safetyCheck: CommandSimulationSafetyCheck;
  blockedReason?: string;
}

export type {
  AuthState,
  MockAuthSession,
  User,
  UserProfile,
  SecretAccessFinding,
  SecretAccessPolicy,
  SecretActivityEvent,
  SecretCategory,
  SecretMetadata,
  SecretProvider,
  SecretRiskLevel,
  SecretRotationState,
  SecretScope,
  WorkspaceAccessFinding,
  WorkspaceAccessReview,
  WorkspaceAuditNote,
  WorkspaceInvitePreview,
  WorkspaceMember,
  WorkspacePermission,
  WorkspacePermissionGroup,
  WorkspacePermissionState,
  Workspace,
  WorkspaceMembership,
  WorkspaceRole,
  WorkspaceSelection,
} from "@/lib/auth/auth-types";
