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

export type WorkspacePermissionState = "allowed" | "review" | "blocked";

export interface WorkspacePermission {
  id: string;
  key: string;
  label: string;
  summary: string;
  state: WorkspacePermissionState;
}

export interface WorkspacePermissionGroup {
  id: string;
  workspaceId: string;
  title: string;
  summary: string;
  role: WorkspaceRole;
  permissions: WorkspacePermission[];
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  displayName: string;
  email: string;
  role: WorkspaceRole;
  status: "active" | "invited" | "suspended";
  joinedAt: string;
  lastSeenAt: string;
  permissionGroupIds: string[];
}

export type WorkspaceAccessSeverity = "info" | "warn" | "blocked";

export interface WorkspaceAccessFinding {
  id: string;
  title: string;
  detail: string;
  severity: WorkspaceAccessSeverity;
}

export interface WorkspaceAuditNote {
  id: string;
  title: string;
  detail: string;
}

export interface WorkspaceInvitePreview {
  id: string;
  email: string;
  role: WorkspaceRole;
  groupId: string;
  status: "draft" | "disabled";
}

export interface WorkspaceAccessReview {
  id: string;
  workspaceId: string;
  reviewedAt: string;
  reviewedBy: string;
  summary: string;
  findings: WorkspaceAccessFinding[];
  notes: WorkspaceAuditNote[];
  invites: WorkspaceInvitePreview[];
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
