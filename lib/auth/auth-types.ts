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

export type SecretRiskLevel = "low" | "medium" | "high";
export type SecretRotationState = "fresh" | "due" | "stale";
export type SecretProvider = "manual" | "mock-managed" | "local-note";
export type SecretScope = "workspace" | "project" | "host-profile";

export interface SecretCategory {
  id: string;
  title: string;
  summary: string;
  provider: SecretProvider;
  scope: SecretScope;
}

export interface SecretMetadata {
  id: string;
  label: string;
  categoryId: string;
  provider: SecretProvider;
  scope: SecretScope;
  riskLevel: SecretRiskLevel;
  rotationState: SecretRotationState;
  lastReviewedAt: string;
  lastUpdatedAt: string;
  redactedValue: string;
  owner: string;
}

export interface SecretAccessFinding {
  id: string;
  title: string;
  detail: string;
  severity: "info" | "warn" | "blocked";
}

export interface SecretAccessPolicy {
  id: string;
  workspaceId: string;
  title: string;
  summary: string;
  allowedRoles: WorkspaceRole[];
  findings: SecretAccessFinding[];
}

export interface SecretActivityEvent {
  id: string;
  time: string;
  kind: "review" | "policy" | "redaction" | "rotation";
  title: string;
  detail: string;
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
