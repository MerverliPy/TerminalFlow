import type {
  LocalExecutionSimulator,
  SimulatedRunControlKind,
  SimulatedRunLogEntry,
  SimulatedRunLifecycleStatus,
  SimulatedRunScenario,
  SimulatedRunState,
  SimulatedRunStep,
  SimulatedRunTransition,
} from "@/lib/domain/types";

const COMPLETION_PROGRESS = 100;

function cloneStep(step: SimulatedRunStep): SimulatedRunStep {
  return { ...step };
}

function cloneLogEntry(log: SimulatedRunScenario["logs"][number]) {
  return { ...log };
}

function cloneTransition(transition: SimulatedRunTransition): SimulatedRunTransition {
  return { ...transition };
}

function findActiveStepIndex(steps: SimulatedRunStep[]) {
  return steps.findIndex((step) => step.status === "running" || step.status === "blocked");
}

function createSyntheticLog(
  action: SimulatedRunControlKind,
  detail: string,
  stepId?: string,
  index?: number,
): SimulatedRunLogEntry {
  return {
    id: `sim-log-${Date.now()}-${index ?? 0}`,
    time: "Now",
    level: action === "cancel" || action === "retry" ? "warn" : "info",
    stream: action === "cancel" ? "stderr" : "stdout",
    message: detail,
    stepId,
  };
}

function createSyntheticTransition(
  action: SimulatedRunControlKind,
  from: SimulatedRunLifecycleStatus,
  to: SimulatedRunLifecycleStatus,
  detail: string,
): SimulatedRunTransition {
  return {
    id: `sim-transition-${Date.now()}-${action}`,
    kind: action,
    from,
    to,
    label: action.replace(/-/g, " "),
    detail,
  };
}

function findScenario(simulator: LocalExecutionSimulator, scenarioId: string) {
  return simulator.scenarios.find((scenario) => scenario.id === scenarioId) ?? simulator.scenarios[0];
}

export function createSimulatorState(scenario: SimulatedRunScenario): SimulatedRunState {
  const steps = scenario.steps.map(cloneStep);
  return {
    scenarioId: scenario.id,
    lifecycleStatus: scenario.lifecycleStatus,
    activeStepIndex: findActiveStepIndex(steps),
    lastAction: null,
    steps,
    logs: scenario.logs.map(cloneLogEntry),
    transitionHistory: scenario.transitions.map(cloneTransition),
  };
}

export function resetSimulatorState(
  simulator: LocalExecutionSimulator,
  scenarioId: string,
): SimulatedRunState {
  return createSimulatorState(findScenario(simulator, scenarioId));
}

export function getSimulatorScenario(
  simulator: LocalExecutionSimulator,
  scenarioId: string,
): SimulatedRunScenario {
  return findScenario(simulator, scenarioId);
}

function nextLifecycleStatusOnRetry(initialStatus: SimulatedRunLifecycleStatus) {
  switch (initialStatus) {
    case "blocked":
      return "warning";
    case "completed":
      return "running";
    case "failed":
      return "running";
    case "paused":
      return "running";
    case "warning":
    case "idle":
    default:
      return "running";
  }
}

function finalizeStep(step: SimulatedRunStep) {
  return {
    ...step,
    status: "completed" as const,
    progress: COMPLETION_PROGRESS,
    finishedAt: step.finishedAt === "Not started" ? "Now" : step.finishedAt,
    duration: step.duration === "--" ? "1s" : step.duration,
  };
}

function advanceActiveStep(steps: SimulatedRunStep[]) {
  const nextSteps = steps.map(cloneStep);
  const activeIndex = nextSteps.findIndex((step) => step.status === "running");

  if (activeIndex === -1) {
    return { steps: nextSteps, activeStepIndex: findActiveStepIndex(nextSteps) };
  }

  nextSteps[activeIndex] = finalizeStep(nextSteps[activeIndex]);
  const nextIndex = activeIndex + 1;

  if (nextIndex < nextSteps.length) {
    nextSteps[nextIndex] = {
      ...nextSteps[nextIndex],
      status: "running",
      progress: Math.max(nextSteps[nextIndex].progress, 25),
      startedAt: nextSteps[nextIndex].startedAt === "Not started" ? "Now" : nextSteps[nextIndex].startedAt,
      finishedAt:
        nextSteps[nextIndex].finishedAt === "Not started" ? "In progress" : nextSteps[nextIndex].finishedAt,
      duration: nextSteps[nextIndex].duration === "--" ? "In progress" : nextSteps[nextIndex].duration,
    };
  }

  return {
    steps: nextSteps,
    activeStepIndex: findActiveStepIndex(nextSteps),
  };
}

function markCurrentStepCancelled(steps: SimulatedRunStep[]) {
  const nextSteps = steps.map(cloneStep);
  const activeIndex = nextSteps.findIndex((step) => step.status === "running" || step.status === "blocked");

  if (activeIndex === -1) {
    return { steps: nextSteps, activeStepIndex: -1 };
  }

  nextSteps[activeIndex] = {
    ...nextSteps[activeIndex],
    status: "cancelled",
    finishedAt: "Cancelled",
    duration: nextSteps[activeIndex].duration === "--" ? "Cancelled" : nextSteps[activeIndex].duration,
  };

  for (let index = activeIndex + 1; index < nextSteps.length; index += 1) {
    if (nextSteps[index].status === "queued") {
      nextSteps[index] = {
        ...nextSteps[index],
        status: "cancelled",
        finishedAt: "Cancelled",
      };
    }
  }

  return {
    steps: nextSteps,
    activeStepIndex: findActiveStepIndex(nextSteps),
  };
}

function stepProgress(steps: SimulatedRunStep[]) {
  const total = steps.reduce((sum, step) => sum + step.progress, 0);
  return Math.round(total / Math.max(steps.length, 1));
}

export function getSimulatorProgress(steps: SimulatedRunStep[]) {
  return stepProgress(steps);
}

export function applySimulatorControl(
  simulator: LocalExecutionSimulator,
  state: SimulatedRunState,
  control: SimulatedRunControlKind,
): SimulatedRunState {
  const scenario = findScenario(simulator, state.scenarioId);
  const logs = [...state.logs];
  const transitionHistory = [...state.transitionHistory];
  let lifecycleStatus = state.lifecycleStatus;
  let steps = state.steps.map(cloneStep);
  let lastAction = control;

  const append = (message: string, stepId?: string) => {
    logs.push(createSyntheticLog(control, message, stepId, logs.length + 1));
  };

  switch (control) {
    case "start": {
      if (state.lifecycleStatus === "running" || state.lifecycleStatus === "cancelled") {
        return state;
      }

      lifecycleStatus = "running";
      const activeIndex = steps.findIndex((step) => step.status === "running" || step.status === "queued");
      if (activeIndex >= 0 && steps[activeIndex].status === "queued") {
        steps[activeIndex] = {
          ...steps[activeIndex],
          status: "running",
          progress: Math.max(steps[activeIndex].progress, 18),
          startedAt: steps[activeIndex].startedAt === "Not started" ? "Now" : steps[activeIndex].startedAt,
          finishedAt: "In progress",
          duration: steps[activeIndex].duration === "--" ? "In progress" : steps[activeIndex].duration,
        };
      }
      append("Started the local execution simulator.");
      transitionHistory.push(
        createSyntheticTransition(control, state.lifecycleStatus, lifecycleStatus, "Local run started."),
      );
      break;
    }
    case "pause": {
      if (state.lifecycleStatus !== "running" && state.lifecycleStatus !== "warning") {
        return state;
      }

      lifecycleStatus = "paused";
      append("Paused the browser-local run state.");
      transitionHistory.push(
        createSyntheticTransition(control, state.lifecycleStatus, lifecycleStatus, "Paused locally."),
      );
      break;
    }
    case "resume": {
      if (state.lifecycleStatus !== "paused") {
        return state;
      }

      lifecycleStatus = "running";
      const activeIndex = steps.findIndex((step) => step.status === "running");
      if (activeIndex >= 0) {
        steps[activeIndex] = {
          ...steps[activeIndex],
          progress: Math.min(100, steps[activeIndex].progress + 12),
        };
      }
      append("Resumed the local run from pause.");
      transitionHistory.push(
        createSyntheticTransition(control, state.lifecycleStatus, lifecycleStatus, "Resumed locally."),
      );
      break;
    }
    case "cancel": {
      if (state.lifecycleStatus === "completed" || state.lifecycleStatus === "cancelled") {
        return state;
      }

      lifecycleStatus = "cancelled";
      ({ steps } = markCurrentStepCancelled(steps));
      append("Cancelled the local simulation.");
      transitionHistory.push(
        createSyntheticTransition(control, state.lifecycleStatus, lifecycleStatus, "Cancelled locally."),
      );
      break;
    }
    case "retry": {
      const baseState = createSimulatorState(scenario);
      lifecycleStatus = nextLifecycleStatusOnRetry(scenario.lifecycleStatus);
      steps = baseState.steps.map(cloneStep);
      if (lifecycleStatus === "running") {
        const activeIndex = steps.findIndex((step) => step.status === "queued" || step.status === "blocked");
        if (activeIndex >= 0) {
          steps[activeIndex] = {
            ...steps[activeIndex],
            status: "running",
            progress: Math.max(steps[activeIndex].progress, 25),
            startedAt: steps[activeIndex].startedAt === "Not started" ? "Now" : steps[activeIndex].startedAt,
            finishedAt: "In progress",
            duration: steps[activeIndex].duration === "--" ? "In progress" : steps[activeIndex].duration,
          };
        }
      }
      append("Retried the seeded scenario from local memory.");
      transitionHistory.push(
        createSyntheticTransition(control, state.lifecycleStatus, lifecycleStatus, "Retry applied locally."),
      );
      break;
    }
    case "advance-step": {
      if (state.lifecycleStatus !== "running" && state.lifecycleStatus !== "warning") {
        return state;
      }

      const result = advanceActiveStep(steps);
      steps = result.steps;
      lifecycleStatus =
        result.activeStepIndex === -1 && steps.every((step) => step.status === "completed")
          ? "completed"
          : state.lifecycleStatus === "warning"
            ? "warning"
            : "running";

      const activeIndex = result.activeStepIndex;
      const activeStep = activeIndex >= 0 ? steps[activeIndex] : undefined;
      append(
        activeStep
          ? `Advanced step progress locally for ${activeStep.title}.`
          : "Advanced the local run to completion.",
        activeStep?.id,
      );
      transitionHistory.push(
        createSyntheticTransition(
          control,
          state.lifecycleStatus,
          lifecycleStatus,
          activeStep
            ? `Advanced to ${activeStep.title}.`
            : "Local steps are complete.",
        ),
      );
      break;
    }
    case "reset": {
      const baseState = createSimulatorState(scenario);
      lifecycleStatus = scenario.lifecycleStatus === "completed" ? "idle" : scenario.lifecycleStatus;
      steps = baseState.steps.map(cloneStep);
      append("Reset the local simulator state.");
      transitionHistory.push(
        createSyntheticTransition(control, state.lifecycleStatus, lifecycleStatus, "Reset to seeded state."),
      );
      break;
    }
    default:
      return state;
  }

  return {
    scenarioId: state.scenarioId,
    lifecycleStatus,
    activeStepIndex: findActiveStepIndex(steps),
    lastAction,
    steps,
    logs,
    transitionHistory,
  };
}
