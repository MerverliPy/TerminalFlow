import {
  MOCK_COMMAND_ENTRIES,
  MOCK_LOCAL_AUDIT_EVENTS,
  MOCK_LOCAL_AUDIT_TIMELINE_ITEMS,
  MOCK_LOCAL_CHANGE_HISTORY_ENTRIES,
  MOCK_PROJECTS,
  MOCK_SESSIONS,
  MOCK_LOCAL_EXECUTION_SIMULATOR,
  MOCK_WORKFLOWS,
  MOCK_WORKFLOW_RUNS,
} from "@/lib/domain/mock-data";
import { createEmptyLocalStoreSnapshot } from "@/lib/storage/schema";
import type {
  LocalStoreSnapshot,
  PersistedSimulationRunSnapshot,
  PersistedSimulatedCommandResult,
  PersistedWorkflowRun,
  PersistedWorkflowRunLogEntry,
  SimulationComparison,
  SimulationComparisonFinding,
  SimulationReplayActionPreview,
  SimulationReplayFrame,
  SimulationReplaySession,
  SimulationSnapshotSource,
} from "@/lib/storage/storage-types";

function buildSeedResult(command: string, sessionId: string, recordedAt: string): PersistedSimulatedCommandResult {
  const normalized = command.trim().toLowerCase();
  const isBlocked =
    normalized.includes("ssh") ||
    normalized.includes("sudo") ||
    normalized.includes("deploy") ||
    normalized.includes("rm -rf");
  const isFailure = normalized.includes("lint") || normalized.includes("fail");
  const isWarning = normalized.includes("preview") || normalized.includes("inspect") || normalized.includes("diff");

  const result = isBlocked
    ? {
        id: `seed-sim-${sessionId}`,
        command,
        mode: "manual" as const,
        status: "blocked" as const,
        exitCode: null,
        duration: "--",
        summary: "Seed data blocked the command before any shell-like activity could occur.",
        output: { stdout: [], stderr: [] },
        safetyCheck: {
          id: "seed-safety-blocked",
          label: "Blocked command",
          state: "blocked" as const,
          detail: "The seed path keeps blocked commands local-only and non-executing.",
        },
        blockedReason: "The seed path keeps blocked commands local-only and non-executing.",
      }
    : isFailure
      ? {
          id: `seed-sim-${sessionId}`,
          command,
          mode: "manual" as const,
          status: "failed" as const,
          exitCode: 1,
          duration: "1.8s",
          summary: "Seed data returns a failed status so the local store has an error example.",
          output: {
            stdout: [`Mock output for: ${command}`],
            stderr: ["Seeded failure example stored locally only."],
          },
          safetyCheck: {
            id: "seed-safety-warning",
            label: "Seeded mock command",
            state: "warning" as const,
            detail: "This command was derived from static demo data and never reached a shell.",
          },
        }
      : isWarning
        ? {
            id: `seed-sim-${sessionId}`,
            command,
            mode: "manual" as const,
            status: "warning" as const,
            exitCode: 0,
            duration: "0.9s",
            summary: "Seed data returns a warning state for local preview coverage.",
            output: {
              stdout: [`Mock output for: ${command}`],
              stderr: ["Seeded warning example stored locally only."],
            },
            safetyCheck: {
              id: "seed-safety-warning",
              label: "Seeded mock command",
              state: "warning" as const,
              detail: "This command was derived from static demo data and never reached a shell.",
            },
          }
        : {
            id: `seed-sim-${sessionId}`,
            command,
            mode: "manual" as const,
            status: "completed" as const,
            exitCode: 0,
            duration: "0.7s",
            summary: "Seed data returns a completed state for local preview coverage.",
            output: {
              stdout: [`Mock output for: ${command}`, "Stored only in browser-local demo data."],
              stderr: [],
            },
            safetyCheck: {
              id: "seed-safety-allowlisted",
              label: "Seeded mock command",
              state: "allowlisted" as const,
              detail: "This command was derived from static demo data and never reached a shell.",
            },
          };

  return {
    ...result,
    sessionId,
    recordedAt,
  };
}

function createSeedCommandResults(): PersistedSimulatedCommandResult[] {
  return MOCK_SESSIONS.map((session) => {
    return buildSeedResult(session.commandPreview, session.id, session.startedAt);
  });
}

function createWorkflowRunRecords(): {
  workflowRuns: PersistedWorkflowRun[];
  workflowRunLogs: PersistedWorkflowRunLogEntry[];
} {
  const workflowRunLogs = MOCK_WORKFLOW_RUNS.flatMap((run) =>
    run.logs.map((log) => ({
      ...log,
      workflowRunId: run.id,
    })),
  );

  const workflowRuns = MOCK_WORKFLOW_RUNS.map(({ logs, ...run }) => ({
    ...run,
    logIds: logs.map((log) => log.id),
  }));

  return { workflowRuns, workflowRunLogs };
}

function convertRunStatus(status: (typeof MOCK_WORKFLOW_RUNS)[number]["status"]): PersistedSimulationRunSnapshot["status"] {
  switch (status) {
    case "completed":
      return "completed";
    case "paused":
      return "paused";
    case "blocked":
      return "blocked";
    case "cancelled":
      return "cancelled";
    case "failed":
      return "failed";
    case "running":
    default:
      return "running";
  }
}

function convertStepStatus(status: (typeof MOCK_WORKFLOW_RUNS)[number]["steps"][number]["status"]) {
  switch (status) {
    case "completed":
    case "running":
    case "blocked":
    case "cancelled":
      return status;
    default:
      return "queued";
  }
}

function buildReplayFrames(
  run: (typeof MOCK_WORKFLOW_RUNS)[number],
  status: PersistedSimulationRunSnapshot["status"],
): SimulationReplayFrame[] {
  const frames: SimulationReplayFrame[] = run.steps.map((step, index) => ({
    id: `${run.id}-frame-${index + 1}`,
    order: index + 1,
    title: step.title,
    detail: step.detail,
    status,
    stepId: step.id,
    progress: step.status === "completed" ? 100 : step.status === "blocked" ? 34 : step.status === "cancelled" ? 0 : 62,
  }));

  frames.push({
    id: `${run.id}-frame-summary`,
    order: frames.length + 1,
    title: "Run summary",
    detail: run.summary,
    status,
    progress: status === "completed" ? 100 : status === "blocked" ? 40 : 75,
  });

  return frames;
}

function buildSimulationSnapshotFromWorkflowRun(
  run: (typeof MOCK_WORKFLOW_RUNS)[number],
  source: SimulationSnapshotSource,
): PersistedSimulationRunSnapshot {
  const status = convertRunStatus(run.status);
  const replayFrames = buildReplayFrames(run, status);

  return {
    id: `saved-${run.id}`,
    workflowId: run.workflowId,
    workflowName: run.workflowName,
    originRunId: run.id,
    source,
    capturedAt: run.startTime,
    status,
    summary: run.summary,
    note: `Derived from ${run.workflowName} and stored locally only.`,
    trigger: run.trigger,
    target: run.target,
    targetDetail: run.targetDetail,
    workspaceRoot: run.workspaceRoot,
    duration: run.duration,
    steps: run.steps.map((step) => ({
      ...step,
      status: convertStepStatus(step.status),
      progress:
        step.status === "completed"
          ? 100
          : step.status === "blocked"
            ? 25
            : step.status === "cancelled"
              ? 0
              : 50,
    })),
    logs: run.logs.map((log) => ({ ...log })),
    replayFrames,
    comparisonIds: [],
    replaySessionId: `replay-session-saved-${run.id}`,
  };
}

function buildSimulationSnapshotFromScenario(
  scenarioId: string,
): PersistedSimulationRunSnapshot {
  const scenario =
    MOCK_LOCAL_EXECUTION_SIMULATOR.scenarios.find((item) => item.id === scenarioId) ??
    MOCK_LOCAL_EXECUTION_SIMULATOR.scenarios[0];

  const runSteps = scenario.steps.map((step, index) => ({
    id: `${scenario.id}-saved-step-${index + 1}`,
    stepId: `${scenario.id}-step-${index + 1}`,
    title: step.title,
    kind: step.kind,
    status: step.status,
    startedAt: step.startedAt,
    finishedAt: step.finishedAt,
    duration: step.duration,
    detail: step.detail,
    progress: step.progress,
  }));

  return {
    id: `saved-${scenario.id}`,
    workflowId: "workflow-check",
    workflowName: scenario.title,
    originRunId: scenario.id,
    source: "simulator",
    capturedAt: "Today",
    status: scenario.lifecycleStatus,
    summary: scenario.summary,
    note: scenario.note,
    trigger: "Local simulator seed",
    target: scenario.title,
    targetDetail: scenario.blockedReason ?? "Replay-safe local scenario",
    workspaceRoot: "/home/calvin/projects/TerminalFlow",
    duration: "Local replay",
    steps: runSteps,
    logs: scenario.logs.map((log) => ({ ...log })),
    replayFrames: scenario.steps.map((step, index) => ({
      id: `${scenario.id}-frame-${index + 1}`,
      order: index + 1,
      title: step.title,
      detail: step.detail,
      status: scenario.lifecycleStatus,
      stepId: `${scenario.id}-step-${index + 1}`,
      progress: step.progress,
    })),
    comparisonIds: [],
    replaySessionId: `replay-session-saved-${scenario.id}`,
  };
}

function createSimulationReplayActionPreviews(): SimulationReplayActionPreview[] {
  return [
    {
      id: "preview-save",
      kind: "save",
      label: "Save snapshot",
      detail: "Store the current simulated run state in browser-local storage only.",
      mode: "local-only",
    },
    {
      id: "preview-replay",
      kind: "replay",
      label: "Replay frames",
      detail: "Advance through ordered replay frames from local snapshot data.",
      mode: "local-only",
    },
    {
      id: "preview-compare",
      kind: "compare",
      label: "Compare snapshots",
      detail: "Compare two local snapshots and render findings in the UI.",
      mode: "local-only",
    },
    {
      id: "preview-export",
      kind: "export",
      label: "Export snapshot",
      detail: "Export the current local snapshot as JSON in the browser UI only.",
      mode: "local-only",
    },
    {
      id: "preview-clear",
      kind: "clear",
      label: "Clear saved simulations",
      detail: "Remove saved simulation records from browser-local storage.",
      mode: "local-only",
    },
    {
      id: "preview-restore",
      kind: "restore",
      label: "Restore seeded demos",
      detail: "Restore the seeded local simulation data for replay review.",
      mode: "local-only",
    },
  ];
}

function createComparisonFinding(
  id: string,
  title: string,
  detail: string,
  severity: SimulationComparisonFinding["severity"],
  leftSnapshotId: string,
  rightSnapshotId: string,
  leftFrameId?: string,
  rightFrameId?: string,
): SimulationComparisonFinding {
  return {
    id,
    title,
    detail,
    severity,
    leftSnapshotId,
    rightSnapshotId,
    leftFrameId,
    rightFrameId,
  };
}

function createComparison(
  left: PersistedSimulationRunSnapshot,
  right: PersistedSimulationRunSnapshot,
): { comparison: SimulationComparison; findings: SimulationComparisonFinding[] } {
  const findings: SimulationComparisonFinding[] = [
    createComparisonFinding(
      `${left.id}-${right.id}-status`,
      `Status changed from ${left.status} to ${right.status}`,
      "The local replay comparison highlights the state transition between the two saved snapshots.",
      left.status === right.status ? "info" : "warn",
      left.id,
      right.id,
      left.replayFrames[0]?.id,
      right.replayFrames[0]?.id,
    ),
    createComparisonFinding(
      `${left.id}-${right.id}-steps`,
      "Step count preview",
      `Left snapshot has ${left.steps.length} steps while the right snapshot has ${right.steps.length} steps.`,
      left.steps.length === right.steps.length ? "info" : "warn",
      left.id,
      right.id,
      left.replayFrames.at(-1)?.id,
      right.replayFrames.at(-1)?.id,
    ),
    createComparisonFinding(
      `${left.id}-${right.id}-logs`,
      "Log surface difference",
      `The comparison keeps log differences visible without any real log ingestion or backend query.`,
      "blocked",
      left.id,
      right.id,
    ),
  ];

  return {
    comparison: {
      id: `comparison-${left.id}-${right.id}`,
      leftSnapshotId: left.id,
      rightSnapshotId: right.id,
      title: `${left.workflowName} vs ${right.workflowName}`,
      summary: `Comparison between ${left.workflowName} snapshots stored locally on this device only.`,
      status: left.status === right.status ? "matched" : "diverged",
      createdAt: right.capturedAt,
      updatedAt: right.capturedAt,
      findingIds: findings.map((finding) => finding.id),
      note: "Comparison records stay browser-local and are derived from seeded snapshot data.",
    },
    findings,
  };
}

function createSavedSimulationSeed(): {
  savedSimulationRuns: PersistedSimulationRunSnapshot[];
  simulationReplaySessions: SimulationReplaySession[];
  simulationComparisons: SimulationComparison[];
  simulationComparisonFindings: SimulationComparisonFinding[];
} {
  const workflowSnapshots = MOCK_WORKFLOW_RUNS.slice(0, 3).map((run) =>
    buildSimulationSnapshotFromWorkflowRun(run, "workflow-run"),
  );
  const simulatorSnapshot = buildSimulationSnapshotFromScenario("scenario-completed");
  const savedSimulationRuns = [...workflowSnapshots, simulatorSnapshot];
  const actionPreviews = createSimulationReplayActionPreviews();

  const simulationReplaySessions: SimulationReplaySession[] = savedSimulationRuns.map((snapshot, index) => ({
    id: snapshot.replaySessionId,
    snapshotId: snapshot.id,
    workflowId: snapshot.workflowId,
    workflowName: snapshot.workflowName,
    status: index === 0 ? "playing" : "ready",
    currentFrameIndex: Math.min(1, snapshot.replayFrames.length - 1),
    actionPreviews,
    startedAt: snapshot.capturedAt,
    updatedAt: snapshot.capturedAt,
    note: "Replay session state is stored locally only.",
  }));

  const firstComparison = createComparison(savedSimulationRuns[0], savedSimulationRuns[1]);
  const secondComparison = createComparison(savedSimulationRuns[0], savedSimulationRuns[2]);
  const simulationComparisons = [firstComparison.comparison, secondComparison.comparison];
  const simulationComparisonFindings = [...firstComparison.findings, ...secondComparison.findings];

  const byId = new Map<string, PersistedSimulationRunSnapshot>(savedSimulationRuns.map((run) => [run.id, run]));
  for (const comparison of simulationComparisons) {
    const left = byId.get(comparison.leftSnapshotId);
    const right = byId.get(comparison.rightSnapshotId);
    if (!left || !right) {
      continue;
    }
    const findings = comparison.id === firstComparison.comparison.id ? firstComparison.findings : secondComparison.findings;
    left.comparisonIds = Array.from(new Set([...left.comparisonIds, comparison.id]));
    right.comparisonIds = Array.from(new Set([...right.comparisonIds, comparison.id]));
    comparison.findingIds = findings.map((finding) => finding.id);
  }

  return {
    savedSimulationRuns,
    simulationReplaySessions,
    simulationComparisons,
    simulationComparisonFindings,
  };
}

export function createLocalStoreSeed(): LocalStoreSnapshot {
  const { workflowRuns, workflowRunLogs } = createWorkflowRunRecords();
  const savedSimulations = createSavedSimulationSeed();

  return {
    ...createEmptyLocalStoreSnapshot(),
    updatedAt: new Date().toISOString(),
    collections: {
      projects: [...MOCK_PROJECTS],
      sessions: [...MOCK_SESSIONS],
      workflows: [...MOCK_WORKFLOWS],
      workflowRuns,
      workflowRunLogs,
      simulatedCommandResults: createSeedCommandResults(),
      savedSimulationRuns: savedSimulations.savedSimulationRuns,
      simulationReplaySessions: savedSimulations.simulationReplaySessions,
      simulationComparisons: savedSimulations.simulationComparisons,
      simulationComparisonFindings: savedSimulations.simulationComparisonFindings,
      auditEvents: MOCK_LOCAL_AUDIT_EVENTS,
      auditTimelineItems: MOCK_LOCAL_AUDIT_TIMELINE_ITEMS,
      changeHistoryEntries: MOCK_LOCAL_CHANGE_HISTORY_ENTRIES,
      commandSimulationHistoryBySessionId: Object.fromEntries(
        MOCK_SESSIONS.map((session) => {
          const result = buildSeedResult(session.commandPreview, session.id, session.startedAt);
          return [session.id, [result]];
        }),
      ),
      commandDraftBySessionId: Object.fromEntries(
        MOCK_SESSIONS.map((session) => [session.id, session.commandPreview]),
      ),
    },
  };
}

export function createLocalStoreDemoSummary() {
  const seed = createLocalStoreSeed();

  return {
    projects: seed.collections.projects.length,
    sessions: seed.collections.sessions.length,
    workflows: seed.collections.workflows.length,
    workflowRuns: seed.collections.workflowRuns.length,
    workflowRunLogs: seed.collections.workflowRunLogs.length,
    simulatedCommandResults: seed.collections.simulatedCommandResults.length,
    commandPreviews: MOCK_COMMAND_ENTRIES.length,
  } as const;
}
