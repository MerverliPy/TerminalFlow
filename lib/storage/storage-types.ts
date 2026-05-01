import type {
  LocalAuditEvent,
  LocalAuditTimelineItem,
  LocalChangeHistoryEntry,
  SimulatedRunLifecycleStatus,
  SimulatedRunLogEntry,
  SimulatedRunStep,
  Project,
  TerminalSession,
  Workflow,
  WorkflowRun,
  WorkflowRunLogEntry,
} from "@/lib/domain/types";

export type LocalStoreVersion = 2;

export type LocalStoreCollection =
  | "projects"
  | "sessions"
  | "workflows"
  | "workflowRuns"
  | "workflowRunLogs"
  | "simulatedCommandResults"
  | "savedSimulationRuns"
  | "simulationReplaySessions"
  | "simulationComparisons"
  | "simulationComparisonFindings"
  | "auditEvents"
  | "auditTimelineItems"
  | "changeHistoryEntries"
  | "commandSimulationHistoryBySessionId"
  | "commandDraftBySessionId";

export type LocalStoreStatus = "unavailable" | "empty" | "seeded" | "custom";
export type SimulationSnapshotSource =
  | "workflow-run"
  | "simulator"
  | "manual-save"
  | "settings-restore";
export type SimulationReplayStatus = "idle" | "ready" | "playing" | "paused" | "completed";
export type SimulationComparisonStatus = "matched" | "diverged" | "reviewing";

export interface SimulationReplayActionPreview {
  id: string;
  kind: "save" | "replay" | "compare" | "export" | "clear" | "restore";
  label: string;
  detail: string;
  mode: "local-only" | "disabled";
}

export interface SimulationReplayFrame {
  id: string;
  order: number;
  title: string;
  detail: string;
  status: SimulatedRunLifecycleStatus;
  stepId?: string;
  logId?: string;
  progress: number;
}

export interface SimulationComparisonFinding {
  id: string;
  title: string;
  detail: string;
  severity: "info" | "warn" | "blocked";
  leftSnapshotId: string;
  rightSnapshotId: string;
  leftFrameId?: string;
  rightFrameId?: string;
}

export interface SimulationComparison {
  id: string;
  leftSnapshotId: string;
  rightSnapshotId: string;
  title: string;
  summary: string;
  status: SimulationComparisonStatus;
  createdAt: string;
  updatedAt: string;
  findingIds: string[];
  note: string;
}

export interface SimulationReplaySession {
  id: string;
  snapshotId: string;
  workflowId: string;
  workflowName: string;
  status: SimulationReplayStatus;
  currentFrameIndex: number;
  actionPreviews: SimulationReplayActionPreview[];
  startedAt: string;
  updatedAt: string;
  note: string;
}

export interface SavedSimulationRun {
  id: string;
  workflowId: string;
  workflowName: string;
  originRunId?: string;
  source: SimulationSnapshotSource;
  capturedAt: string;
  status: SimulatedRunLifecycleStatus;
  summary: string;
  note: string;
}

export interface PersistedSimulationRunSnapshot extends SavedSimulationRun {
  trigger: string;
  target: string;
  targetDetail: string;
  workspaceRoot: string;
  duration: string;
  steps: SimulatedRunStep[];
  logs: SimulatedRunLogEntry[];
  replayFrames: SimulationReplayFrame[];
  comparisonIds: string[];
  replaySessionId: string;
}

export interface LocalSimulationStorageStatus {
  state: LocalStoreStatus;
  snapshotCount: number;
  replaySessionCount: number;
  comparisonCount: number;
  comparisonFindingCount: number;
  lastUpdatedAt: string | null;
  note: string;
}

export interface PersistedProject extends Project {}

export interface PersistedTerminalSession extends TerminalSession {}

export interface PersistedWorkflow extends Workflow {}

export interface PersistedWorkflowRun extends Omit<WorkflowRun, "logs"> {
  logIds: string[];
}

export interface PersistedWorkflowRunLogEntry extends WorkflowRunLogEntry {
  workflowRunId: string;
}

export interface PersistedSimulatedCommandOutput {
  stdout: string[];
  stderr: string[];
}

export interface PersistedSimulatedCommandSafetyCheck {
  id: string;
  label: string;
  state: "allowlisted" | "warning" | "blocked";
  detail: string;
}

export interface PersistedSimulatedCommandResult {
  id: string;
  sessionId: string;
  recordedAt: string;
  command: string;
  presetId?: string;
  presetLabel?: string;
  mode: "preset" | "manual";
  status: "completed" | "warning" | "blocked" | "failed";
  exitCode: number | null;
  duration: string;
  summary: string;
  output: PersistedSimulatedCommandOutput;
  safetyCheck: PersistedSimulatedCommandSafetyCheck;
  blockedReason?: string;
}

export interface LocalStoreCollections {
  projects: PersistedProject[];
  sessions: PersistedTerminalSession[];
  workflows: PersistedWorkflow[];
  workflowRuns: PersistedWorkflowRun[];
  workflowRunLogs: PersistedWorkflowRunLogEntry[];
  simulatedCommandResults: PersistedSimulatedCommandResult[];
  savedSimulationRuns: PersistedSimulationRunSnapshot[];
  simulationReplaySessions: SimulationReplaySession[];
  simulationComparisons: SimulationComparison[];
  simulationComparisonFindings: SimulationComparisonFinding[];
  auditEvents: LocalAuditEvent[];
  auditTimelineItems: LocalAuditTimelineItem[];
  changeHistoryEntries: LocalChangeHistoryEntry[];
  commandSimulationHistoryBySessionId: Record<string, PersistedSimulatedCommandResult[]>;
  commandDraftBySessionId: Record<string, string>;
}

export interface LocalStoreSchema {
  version: LocalStoreVersion;
}

export interface LocalStoreSnapshot {
  version: LocalStoreVersion;
  updatedAt: string;
  collections: LocalStoreCollections;
}

export interface LocalStoreMigration {
  from: number;
  to: number;
  description: string;
  migrate: (snapshot: LocalStoreSnapshot) => LocalStoreSnapshot;
}

export interface LocalStoreSummary {
  status: LocalStoreStatus;
  version: LocalStoreVersion;
  updatedAt: string | null;
  counts: Record<LocalStoreCollection, number>;
}
