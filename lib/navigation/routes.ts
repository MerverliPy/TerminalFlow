export const ROUTES = {
  root: "/",
  hub: "/hub",
  projects: "/projects",
  sessions: "/sessions",
  workflows: "/workflows",
  settings: "/settings",
} as const;

export const DEFAULT_ROUTE = ROUTES.hub;

export const TAB_ROUTES = [
  ROUTES.hub,
  ROUTES.projects,
  ROUTES.sessions,
  ROUTES.workflows,
  ROUTES.settings,
] as const;

export const TAB_NAV_ITEMS = [
  { label: "Hub", href: ROUTES.hub },
  { label: "Projects", href: ROUTES.projects },
  { label: "Sessions", href: ROUTES.sessions },
  { label: "Workflows", href: ROUTES.workflows },
  { label: "Settings", href: ROUTES.settings },
] as const;
