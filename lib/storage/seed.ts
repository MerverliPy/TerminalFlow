import {
  MOCK_COMMAND_ENTRIES,
  MOCK_PROJECTS,
  MOCK_SESSIONS,
  MOCK_WORKFLOWS,
  MOCK_WORKFLOW_RUNS,
} from "@/lib/domain/mock-data";
import { createEmptyLocalStoreSnapshot } from "@/lib/storage/schema";
import type {
  LocalStoreSnapshot,
  PersistedSimulatedCommandResult,
  PersistedWorkflowRun,
  PersistedWorkflowRunLogEntry,
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

export function createLocalStoreSeed(): LocalStoreSnapshot {
  const { workflowRuns, workflowRunLogs } = createWorkflowRunRecords();

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
