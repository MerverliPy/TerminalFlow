import { MOCK_SIMULATED_COMMAND_PRESETS } from "@/lib/domain/mock-data";
import type {
  CommandSimulationSafetyCheck,
  SimulatedCommandPreset,
  SimulatedCommandResult,
  SimulatedCommandStatus,
} from "@/lib/domain/types";

const BLOCKED_PATTERNS: Array<{ pattern: RegExp; reason: string }> = [
  {
    pattern: /\bssh\b/i,
    reason: "SSH is out of scope in this phase, so host access cannot be simulated.",
  },
  {
    pattern: /\bsudo\b/i,
    reason: "Privileged shell commands are blocked in the local-only simulator.",
  },
  {
    pattern: /\brm\s+-rf\b/i,
    reason: "Destructive shell commands are blocked before any simulation result is shown.",
  },
  {
    pattern: /\bdeploy\b/i,
    reason: "Deployment flows are disabled until a later phase.",
  },
  {
    pattern: /\bscp\b|\brsync\b/i,
    reason: "Remote transfer commands are blocked because remote execution is not active.",
  },
];

function cloneSafetyCheck(check: CommandSimulationSafetyCheck): CommandSimulationSafetyCheck {
  return { ...check };
}

function cloneOutput(output: SimulatedCommandPreset["output"]) {
  return {
    stdout: [...output.stdout],
    stderr: [...output.stderr],
  };
}

function clonePresetResult(
  preset: SimulatedCommandPreset,
  command: string,
  id: string,
): SimulatedCommandResult {
  return {
    id,
    command,
    presetId: preset.id,
    presetLabel: preset.label,
    mode: "preset",
    status: preset.status,
    exitCode: preset.exitCode,
    duration: preset.duration,
    summary: preset.summary,
    output: cloneOutput(preset.output),
    safetyCheck: cloneSafetyCheck(preset.safetyCheck),
    blockedReason: preset.status === "blocked" ? preset.safetyCheck.detail : undefined,
  };
}

function blockedResult(command: string, id: string, reason: string): SimulatedCommandResult {
  return {
    id,
    command,
    mode: "manual",
    status: "blocked",
    exitCode: null,
    duration: "--",
    summary: "The simulator blocked this command before any shell-like activity could occur.",
    output: {
      stdout: [],
      stderr: [],
    },
    safetyCheck: {
      id: "sim-safety-blocked",
      label: "Blocked command",
      state: "blocked",
      detail: reason,
    },
    blockedReason: reason,
  };
}

function warningResult(command: string, id: string): SimulatedCommandResult {
  return {
    id,
    command,
    mode: "manual",
    status: "warning",
    exitCode: 0,
    duration: "0.9s",
    summary: "The command was simulated locally with a cautionary mock warning state.",
    output: {
      stdout: [`Mock output for: ${command}`],
      stderr: ["This result was generated entirely in browser memory."],
    },
    safetyCheck: {
      id: "sim-safety-warning",
      label: "Manual mock command",
      state: "warning",
      detail: "This command was not selected from a preset, so the simulator returned a cautionary mock state.",
    },
  };
}

function successResult(command: string, id: string): SimulatedCommandResult {
  return {
    id,
    command,
    mode: "manual",
    status: "completed",
    exitCode: 0,
    duration: "0.7s",
    summary: "The browser-only simulator accepted the command and returned a local success state.",
    output: {
      stdout: [`Mock output for: ${command}`, "No shell, host, or workflow execution occurred."],
      stderr: [],
    },
    safetyCheck: {
      id: "sim-safety-allowlisted",
      label: "Local mock command",
      state: "allowlisted",
      detail: "The command matched local simulation rules and stayed inside the browser.",
    },
  };
}

function failedResult(command: string, id: string): SimulatedCommandResult {
  return {
    id,
    command,
    mode: "manual",
    status: "failed",
    exitCode: 1,
    duration: "1.8s",
    summary: "The local simulator returned a failed state so the UI can show error handling.",
    output: {
      stdout: [`Mock output for: ${command}`],
      stderr: ["Simulated error: review the command or choose a safer preset."],
    },
    safetyCheck: {
      id: "sim-safety-warning",
      label: "Manual mock command",
      state: "warning",
      detail: "This command produced a mock failure state without any actual shell execution.",
    },
  };
}

function findPresetByCommand(command: string) {
  const normalized = command.trim().toLowerCase();
  return MOCK_SIMULATED_COMMAND_PRESETS.find(
    (preset) => preset.command.trim().toLowerCase() === normalized,
  );
}

function hasBlockedPattern(command: string) {
  return BLOCKED_PATTERNS.find((entry) => entry.pattern.test(command));
}

function hasFailurePattern(command: string) {
  const normalized = command.toLowerCase();
  return normalized.includes("lint") || normalized.includes("test fail") || normalized.includes("fail");
}

function hasSuccessPattern(command: string) {
  const normalized = command.toLowerCase();
  return (
    normalized.includes("typecheck") ||
    normalized.includes("build") ||
    normalized.includes("echo") ||
    normalized.includes("status")
  );
}

function hasWarningPattern(command: string) {
  const normalized = command.toLowerCase();
  return normalized.includes("preview") || normalized.includes("inspect") || normalized.includes("diff");
}

export function simulateCommand(
  command: string,
  options: {
    id: string;
    presetId?: string;
  },
): SimulatedCommandResult {
  const trimmed = command.trim();
  const preset = options.presetId
    ? MOCK_SIMULATED_COMMAND_PRESETS.find((entry) => entry.id === options.presetId)
    : findPresetByCommand(trimmed);

  if (!trimmed) {
    return blockedResult(
      trimmed,
      options.id,
      "Enter a mock command or choose an allowlisted preset before simulating.",
    );
  }

  if (preset) {
    return clonePresetResult(preset, trimmed, options.id);
  }

  const blocked = hasBlockedPattern(trimmed);
  if (blocked) {
    return blockedResult(trimmed, options.id, blocked.reason);
  }

  if (hasFailurePattern(trimmed)) {
    return failedResult(trimmed, options.id);
  }

  if (hasSuccessPattern(trimmed)) {
    return successResult(trimmed, options.id);
  }

  if (hasWarningPattern(trimmed)) {
    return warningResult(trimmed, options.id);
  }

  return warningResult(trimmed, options.id);
}

export function getCommandSimulationPresets() {
  return MOCK_SIMULATED_COMMAND_PRESETS;
}

export function isBlockedSimulation(command: string) {
  return Boolean(hasBlockedPattern(command));
}
