export const ROUTES = {
  root: "/",
  signIn: "/sign-in",
  workspace: "/workspace",
  hub: "/hub",
  health: "/health",
  projects: "/projects",
  sessions: "/sessions",
  hosts: "/hosts",
  workflows: "/workflows",
  notifications: "/notifications",
  settings: "/settings",
  settingsPermissions: "/settings/permissions",
  settingsSecrets: "/settings/secrets",
  settingsIntegrations: "/settings/integrations",
} as const;

export const DEFAULT_ROUTE = ROUTES.hub;

export const TAB_ROUTES = [
  ROUTES.hub,
  ROUTES.health,
  ROUTES.projects,
  ROUTES.sessions,
  ROUTES.hosts,
  ROUTES.workflows,
  ROUTES.notifications,
  ROUTES.settings,
] as const;

export const TAB_NAV_ITEMS = [
  { label: "Hub", href: ROUTES.hub },
  { label: "Health", href: ROUTES.health },
  { label: "Projects", href: ROUTES.projects },
  { label: "Sessions", href: ROUTES.sessions },
  { label: "Hosts", href: ROUTES.hosts },
  { label: "Workflows", href: ROUTES.workflows },
  { label: "Notifications", href: ROUTES.notifications },
  { label: "Settings", href: ROUTES.settings },
] as const;

export const SESSION_DETAIL_ROUTE = "/sessions/[sessionId]";

export const sessionDetailRoute = (sessionId: string) =>
  `${ROUTES.sessions}/${sessionId}`;

export const HOST_DETAIL_ROUTE = "/hosts/[hostId]";

export const hostDetailRoute = (hostId: string) => `${ROUTES.hosts}/${hostId}`;

export const WORKFLOW_DETAIL_ROUTE = "/workflows/[workflowId]";
export const WORKFLOW_RUNS_ROUTE = "/workflows/[workflowId]/runs";
export const WORKFLOW_RUN_DETAIL_ROUTE = "/workflows/[workflowId]/runs/[runId]";

export const workflowDetailRoute = (workflowId: string) =>
  `${ROUTES.workflows}/${workflowId}`;

export const workflowRunsRoute = (workflowId: string) =>
  `${workflowDetailRoute(workflowId)}/runs`;

export const workflowRunDetailRoute = (workflowId: string, runId: string) =>
  `${workflowRunsRoute(workflowId)}/${runId}`;

export const notificationDetailRoute = (notificationId: string) =>
  `${ROUTES.notifications}/${notificationId}`;
export const settingsIntegrationDetailRoute = (providerId: string) =>
  `${ROUTES.settingsIntegrations}/${providerId}`;
