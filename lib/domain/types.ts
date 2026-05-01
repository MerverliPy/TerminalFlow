export type HostStatus = "connected" | "connecting" | "offline";
export type ProjectHealth = "ready" | "attention";
export type ReadinessStatus = "ready" | "watch" | "blocked";
export type ReadinessFindingSeverity = "info" | "warn" | "blocked";
export type ReadinessActionKind =
  | "fix"
  | "run-audit"
  | "refresh-checks"
  | "export-report"
  | "open-issue";
export type ReadinessActionMode = "disabled" | "preview";
export type ReadinessCategoryKind =
  | "workspace"
  | "project"
  | "host"
  | "workflow"
  | "integration"
  | "secrets"
  | "notification";
export type HealthDashboardMetricTone = "good" | "warn" | "accent";
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
export type SimulatedRunLifecycleStatus =
  | "idle"
  | "running"
  | "paused"
  | "warning"
  | "blocked"
  | "failed"
  | "cancelled"
  | "completed";
export type SimulatedRunStepStatus =
  | "queued"
  | "running"
  | "completed"
  | "blocked"
  | "cancelled";
export type SimulatedRunControlKind =
  | "start"
  | "pause"
  | "resume"
  | "cancel"
  | "retry"
  | "advance-step"
  | "reset";
export type SimulatedRunTransitionKind =
  | "start"
  | "pause"
  | "resume"
  | "cancel"
  | "retry"
  | "advance-step"
  | "reset";
export type SimulatedRunSafetyFindingSeverity = "info" | "warn" | "blocked";
export type IntegrationConnectionStatus = "connected" | "reviewing" | "syncing" | "offline" | "blocked";
export type IntegrationRiskLevel = "low" | "medium" | "high";
export type IntegrationReviewFindingSeverity = "info" | "warn" | "blocked";
export type IntegrationActivityEventKind = "review" | "scope" | "status" | "sync" | "policy";
export type IntegrationActionKind =
  | "connect"
  | "disconnect"
  | "reconnect"
  | "sync"
  | "authorize"
  | "revoke";
export type IntegrationActionMode = "disabled" | "simulated";
export type NotificationSeverity = "low" | "medium" | "high" | "critical";
export type NotificationStatus = "unread" | "read" | "snoozed" | "resolved" | "archived";
export type NotificationSource = "integration" | "workspace" | "system" | "review";
export type NotificationActivityEventKind = "received" | "reviewed" | "status-changed" | "escalated" | "archived";
export type AlertReviewStatus = "open" | "reviewing" | "escalated" | "resolved";
export type AlertActionKind =
  | "mark-read"
  | "snooze"
  | "resolve"
  | "archive"
  | "escalate"
  | "open-provider";
export type AlertActionMode = "disabled" | "simulated";
export type ExecutionPreflightStatus = "ready" | "warning" | "blocked";
export type ExecutionPreflightFindingSeverity = "info" | "warn" | "blocked";
export type ExecutionPreflightActionKind =
  | "approve-execution"
  | "start-run"
  | "override-block"
  | "refresh-checks"
  | "export-preflight-report";
export type ExecutionPreflightActionMode = "disabled" | "preview";
export type ExecutionPreflightCategoryKind = ReadinessCategoryKind;
export type LocalExecutionPlanStatus = "draft" | "ready" | "blocked";
export type LocalExecutionPlanRiskLevel = "low" | "medium" | "high";
export type LocalExecutionPlanStepStatus = "planned" | "ready" | "blocked";
export type LocalExecutionPlanStepKind =
  | "check"
  | "command"
  | "decision"
  | "handoff"
  | "review";
export type LocalExecutionPlanDependencyKind =
  | "workflow"
  | "host"
  | "session"
  | "command"
  | "step";
export type DryRunFindingSeverity = "info" | "warn" | "blocked";
export type ExecutionPlanActionKind =
  | "confirm-plan"
  | "start-run"
  | "export-plan"
  | "share-plan"
  | "refresh-estimate"
  | "approve-dry-run";
export type ExecutionPlanActionMode = "disabled" | "preview";
export type ExecutionPlanMappingKind = "workflow" | "host" | "session" | "command";

export interface IntegrationProviderCategory {
  id: string;
  title: string;
  summary: string;
  note: string;
}

export interface IntegrationPermissionScope {
  id: string;
  key: string;
  label: string;
  summary: string;
  preview: string;
  riskNote: string;
}

export interface IntegrationProvider {
  id: string;
  categoryId: string;
  name: string;
  summary: string;
  detail: string;
  workspaceNote: string;
  reviewSummary: string;
  connectionSummary: string;
  riskLevel: IntegrationRiskLevel;
  scopeIds: string[];
}

export interface IntegrationConnection {
  id: string;
  providerId: string;
  status: IntegrationConnectionStatus;
  lastCheckedAt: string;
  lastActivityAt: string;
  riskNote: string;
  findingIds: string[];
  activityEventIds: string[];
  actionPreviewIds: string[];
}

export interface IntegrationActionPreview {
  id: string;
  kind: IntegrationActionKind;
  label: string;
  detail: string;
  mode: IntegrationActionMode;
}

export interface IntegrationStatusSummary {
  totalProviders: number;
  totalCategories: number;
  totalScopes: number;
  totalConnections: number;
}

export interface IntegrationReviewFinding {
  id: string;
  title: string;
  detail: string;
  severity: IntegrationReviewFindingSeverity;
}

export interface IntegrationActivityEvent {
  id: string;
  time: string;
  kind: IntegrationActivityEventKind;
  title: string;
  detail: string;
}

export interface NotificationPreferencePreview {
  id: string;
  label: string;
  summary: string;
  enabled: boolean;
  note: string;
}

export interface NotificationCategory {
  id: string;
  title: string;
  summary: string;
  source: NotificationSource;
  note: string;
}

export interface NotificationActivityEvent {
  id: string;
  time: string;
  kind: NotificationActivityEventKind;
  title: string;
  detail: string;
}

export interface AlertReviewItem {
  id: string;
  notificationId: string;
  title: string;
  summary: string;
  status: AlertReviewStatus;
  severity: "low" | "medium" | "high";
  detail: string;
  recommendation: string;
}

export interface AlertActionPreview {
  id: string;
  kind: AlertActionKind;
  label: string;
  detail: string;
  mode: AlertActionMode;
}

export interface Notification {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  detail: string;
  severity: NotificationSeverity;
  status: NotificationStatus;
  source: NotificationSource;
  sourceLabel: string;
  linkedProviderId?: string;
  linkedConnectionId?: string;
  linkedProviderLabel?: string;
  linkedConnectionLabel?: string;
  createdAt: string;
  updatedAt: string;
  activityEventIds: string[];
  alertReviewItemIds: string[];
  preferencePreviewIds: string[];
}

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

export interface HealthDashboardMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: HealthDashboardMetricTone;
}

export interface ReadinessScore {
  id: string;
  label: string;
  score: number;
  status: ReadinessStatus;
  detail: string;
  note: string;
}

export interface ReadinessFinding {
  id: string;
  categoryId: string;
  title: string;
  detail: string;
  severity: ReadinessFindingSeverity;
  preview: string;
}

export interface ReadinessCategory {
  id: string;
  kind: ReadinessCategoryKind;
  title: string;
  summary: string;
  status: ReadinessStatus;
  scoreId: string;
  findingIds: string[];
  actionPreviewIds: string[];
  note: string;
}

export interface ReadinessActionPreview {
  id: string;
  kind: ReadinessActionKind;
  label: string;
  detail: string;
  mode: ReadinessActionMode;
}

export interface WorkspaceReadinessSnapshot {
  id: string;
  title: string;
  summary: string;
  status: ReadinessStatus;
  projectCount: number;
  hostCount: number;
  workflowCount: number;
  integrationCount: number;
  secretCount: number;
  notificationCount: number;
  note: string;
}

export interface ReadinessReview {
  id: string;
  title: string;
  summary: string;
  updatedAt: string;
  workspaceSnapshotId: string;
  scoreIds: string[];
  categoryIds: string[];
  findingIds: string[];
  actionPreviewIds: string[];
}

export interface ProjectHealthSummary {
  id: string;
  title: string;
  summary: string;
  updatedAt: string;
  overallScoreId: string;
  metricIds: string[];
  reviewId: string;
  note: string;
}

export interface ExecutionPreflightGate {
  id: string;
  kind: ExecutionPreflightCategoryKind;
  title: string;
  summary: string;
  status: ExecutionPreflightStatus;
  checkCategoryId: string;
  findingIds: string[];
  actionPreviewIds: string[];
  note: string;
}

export interface ExecutionPreflightCheckCategory {
  id: string;
  gateId: string;
  kind: ExecutionPreflightCategoryKind;
  title: string;
  summary: string;
  status: ExecutionPreflightStatus;
  checkIds: string[];
  note: string;
}

export interface ExecutionPreflightCheck {
  id: string;
  categoryId: string;
  label: string;
  detail: string;
  status: ExecutionPreflightStatus;
  evidence: string;
  preview: string;
}

export interface ExecutionPreflightFinding {
  id: string;
  gateId: string;
  title: string;
  detail: string;
  severity: ExecutionPreflightFindingSeverity;
  recommendation: string;
}

export interface ExecutionApprovalPreview {
  id: string;
  title: string;
  summary: string;
  detail: string;
  status: ExecutionPreflightStatus;
  note: string;
}

export interface ExecutionReadinessSnapshot {
  id: string;
  title: string;
  summary: string;
  updatedAt: string;
  workflowLabel: string;
  workspaceLabel: string;
  hostLabel: string;
  note: string;
}

export interface ExecutionGateActionPreview {
  id: string;
  kind: ExecutionPreflightActionKind;
  label: string;
  detail: string;
  mode: ExecutionPreflightActionMode;
}

export interface LocalExecutionPlan {
  id: string;
  workflowId: string;
  title: string;
  summary: string;
  status: LocalExecutionPlanStatus;
  riskLevel: LocalExecutionPlanRiskLevel;
  estimatedDuration: string;
  stepIds: string[];
  dependencyIds: string[];
  mappingIds: string[];
  dryRunSummaryId: string;
  note: string;
}

export interface LocalExecutionPlanStep {
  id: string;
  planId: string;
  order: number;
  title: string;
  kind: LocalExecutionPlanStepKind;
  status: LocalExecutionPlanStepStatus;
  detail: string;
  estimatedDuration: string;
  dependencyIds: string[];
  actionPreviewIds: string[];
  preview: string;
}

export interface LocalExecutionPlanDependency {
  id: string;
  planId: string;
  kind: LocalExecutionPlanDependencyKind;
  order: number;
  label: string;
  detail: string;
  fromStepId: string;
  toStepId: string;
}

export interface DryRunFinding {
  id: string;
  planId: string;
  title: string;
  detail: string;
  severity: DryRunFindingSeverity;
  recommendation: string;
}

export interface ExecutionPlanActionPreview {
  id: string;
  kind: ExecutionPlanActionKind;
  label: string;
  detail: string;
  mode: ExecutionPlanActionMode;
}

export interface ExecutionPlanMapping {
  id: string;
  planId: string;
  kind: ExecutionPlanMappingKind;
  label: string;
  source: string;
  target: string;
  detail: string;
  preview: string;
}

export interface DryRunSummary {
  id: string;
  planId: string;
  title: string;
  summary: string;
  estimatedDuration: string;
  riskLevel: LocalExecutionPlanRiskLevel;
  riskSummary: string;
  dependencySummary: string;
  findingIds: string[];
  actionPreviewIds: string[];
  note: string;
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

export interface SimulatedRunLogEntry {
  id: string;
  time: string;
  level: WorkflowRunLogLevel;
  stream: "stdout" | "stderr";
  message: string;
  stepId?: string;
}

export interface SimulatedRunStep {
  id: string;
  title: string;
  kind: WorkflowRunStepKind;
  status: SimulatedRunStepStatus;
  progress: number;
  startedAt: string;
  finishedAt: string;
  duration: string;
  detail: string;
}

export interface SimulatedRunTransition {
  id: string;
  kind: SimulatedRunTransitionKind;
  from: SimulatedRunLifecycleStatus;
  to: SimulatedRunLifecycleStatus;
  label: string;
  detail: string;
}

export interface SimulatedRunControl {
  id: string;
  kind: SimulatedRunControlKind;
  label: string;
  detail: string;
}

export interface SimulatedRunSafetyFinding {
  id: string;
  title: string;
  detail: string;
  severity: SimulatedRunSafetyFindingSeverity;
}

export interface SimulatedRunScenario {
  id: string;
  title: string;
  summary: string;
  lifecycleStatus: SimulatedRunLifecycleStatus;
  safetyState: WorkflowRunSafetyState;
  blockedReason?: string;
  note: string;
  steps: SimulatedRunStep[];
  logs: SimulatedRunLogEntry[];
  transitions: SimulatedRunTransition[];
  safetyFindings: SimulatedRunSafetyFinding[];
}

export interface LocalExecutionSimulator {
  id: string;
  title: string;
  summary: string;
  note: string;
  controls: SimulatedRunControl[];
  scenarios: SimulatedRunScenario[];
}

export interface SimulatedRunState {
  scenarioId: string;
  lifecycleStatus: SimulatedRunLifecycleStatus;
  activeStepIndex: number;
  lastAction: SimulatedRunControlKind | null;
  steps: SimulatedRunStep[];
  logs: SimulatedRunLogEntry[];
  transitionHistory: SimulatedRunTransition[];
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
