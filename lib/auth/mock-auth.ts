"use client";

import { useEffect, useSyncExternalStore } from "react";

import {
  MOCK_AUTH_SESSION,
  MOCK_USERS,
  MOCK_WORKSPACES,
  MOCK_WORKSPACE_MEMBERSHIPS,
} from "@/lib/domain/mock-data";
import type {
  AuthState,
  MockAuthSession,
  WorkspaceSelection,
} from "@/lib/auth/auth-types";

const AUTH_STORE_KEY = "terminalflow.mock-auth.v1";
const AUTH_CHANGE_EVENT = "terminalflow-mock-auth-changed";

const DEFAULT_STATE: AuthState = {
  status: "signedOut",
  session: null,
  selection: null,
};

function hasBrowserStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function resolveSelection(session: MockAuthSession | null): WorkspaceSelection | null {
  if (!session) {
    return null;
  }

  const workspace = MOCK_WORKSPACES.find((item) => item.id === session.activeWorkspaceId);
  if (!workspace) {
    return null;
  }

  const membership = MOCK_WORKSPACE_MEMBERSHIPS.find(
    (item) => item.userId === session.userId && item.workspaceId === workspace.id,
  );

  return {
    workspaceId: workspace.id,
    workspaceName: workspace.name,
    role: membership?.role ?? "viewer",
  };
}

function normalizeState(raw: Partial<AuthState> | null): AuthState {
  if (!raw?.session) {
    return DEFAULT_STATE;
  }

  return {
    status: "signedIn",
    session: raw.session,
    selection: resolveSelection(raw.session),
  };
}

function readRawAuthState(): AuthState {
  if (!hasBrowserStorage()) {
    return DEFAULT_STATE;
  }

  try {
    const raw = window.localStorage.getItem(AUTH_STORE_KEY);
    if (!raw) {
      return DEFAULT_STATE;
    }

    return normalizeState(JSON.parse(raw) as Partial<AuthState>);
  } catch {
    return DEFAULT_STATE;
  }
}

function writeRawAuthState(state: AuthState) {
  if (!hasBrowserStorage()) {
    return;
  }

  window.localStorage.setItem(AUTH_STORE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function getMockAuthState() {
  return readRawAuthState();
}

export function getMockUser(userId: string | null) {
  return MOCK_USERS.find((user) => user.id === userId) ?? null;
}

export function getMockWorkspace(workspaceId: string | null) {
  return MOCK_WORKSPACES.find((workspace) => workspace.id === workspaceId) ?? null;
}

export function getMockWorkspaceMembership(
  userId: string | null,
  workspaceId: string | null,
) {
  if (!userId || !workspaceId) {
    return null;
  }

  return (
    MOCK_WORKSPACE_MEMBERSHIPS.find(
      (membership) => membership.userId === userId && membership.workspaceId === workspaceId,
    ) ?? null
  );
}

export function getMockWorkspaceSelection(state: AuthState) {
  if (!state.session) {
    return null;
  }

  return state.selection;
}

export function createMockSignedInState(
  userId: string = MOCK_AUTH_SESSION.userId,
  workspaceId: string = MOCK_AUTH_SESSION.activeWorkspaceId,
): AuthState {
  const signedInAt = new Date().toISOString();
  return {
    status: "signedIn",
    session: {
      userId,
      activeWorkspaceId: workspaceId,
      signedInAt,
    },
    selection: resolveSelection({
      userId,
      activeWorkspaceId: workspaceId,
      signedInAt,
    }),
  };
}

export function signInMockUser(
  userId: string = MOCK_AUTH_SESSION.userId,
  workspaceId: string = MOCK_AUTH_SESSION.activeWorkspaceId,
) {
  const nextState = createMockSignedInState(userId, workspaceId);
  writeRawAuthState(nextState);
  return nextState;
}

export function signOutMockUser() {
  writeRawAuthState(DEFAULT_STATE);
  return DEFAULT_STATE;
}

export function selectMockWorkspace(workspaceId: string) {
  const currentState = readRawAuthState();
  if (currentState.status === "signedOut" || !currentState.session) {
    return currentState;
  }

  const nextSession: MockAuthSession = {
    ...currentState.session,
    activeWorkspaceId: workspaceId,
  };
  const nextState: AuthState = {
    status: "signedIn",
    session: nextSession,
    selection: resolveSelection(nextSession),
  };

  writeRawAuthState(nextState);
  return nextState;
}

export function subscribeToMockAuthChanges(listener: () => void) {
  if (!hasBrowserStorage()) {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === AUTH_STORE_KEY) {
      listener();
    }
  };

  const handleCustomChange = () => listener();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(AUTH_CHANGE_EVENT, handleCustomChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(AUTH_CHANGE_EVENT, handleCustomChange);
  };
}

export function useMockAuthState() {
  const state = useSyncExternalStore(subscribeToMockAuthChanges, getMockAuthState, () => DEFAULT_STATE);

  useEffect(() => {
    if (state.status === "signedIn" && state.session) {
      const workspace = getMockWorkspace(state.session.activeWorkspaceId);
      const selection = workspace
        ? {
            workspaceId: workspace.id,
            workspaceName: workspace.name,
            role:
              getMockWorkspaceMembership(state.session.userId, workspace.id)?.role ?? "viewer",
          }
        : null;

      if (
        !state.selection ||
        state.selection.workspaceId !== selection?.workspaceId ||
        state.selection.role !== selection?.role
      ) {
        writeRawAuthState({
          status: "signedIn",
          session: state.session,
          selection,
        });
      }
    }
  }, [state]);

  return state;
}
