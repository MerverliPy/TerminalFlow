import type {
  Project,
  TerminalSession,
  Workflow,
  WorkflowRun,
  WorkflowRunLogEntry,
} from "@/lib/domain/types";

export type LocalStoreVersion = 1;

export type LocalStoreCollection =
  | "projects"
  | "sessions"
  | "workflows"
  | "workflowRuns"
  | "workflowRunLogs"
  | "simulatedCommandResults"
  | "commandSimulationHistoryBySessionId"
  | "commandDraftBySessionId";

export type LocalStoreStatus = "unavailable" | "empty" | "seeded" | "custom";

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
