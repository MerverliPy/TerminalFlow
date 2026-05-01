export type WorkspaceRole = "owner" | "admin" | "member" | "viewer";

export interface UserProfile {
  displayName: string;
  email: string;
  title: string;
  avatarLabel: string;
}

export interface User {
  id: string;
  profile: UserProfile;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  summary: string;
  root: string;
  boundaryNote: string;
}

export interface WorkspaceMembership {
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
  joinedAt: string;
}

export interface MockAuthSession {
  userId: string;
  activeWorkspaceId: string;
  signedInAt: string;
}

export interface WorkspaceSelection {
  workspaceId: string;
  workspaceName: string;
  role: WorkspaceRole;
}

export interface AuthState {
  status: "signedOut" | "signedIn";
  session: MockAuthSession | null;
  selection: WorkspaceSelection | null;
}
