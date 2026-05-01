import { ProjectHealthDashboard } from "@/components/health/project-health-dashboard";
import {
  MOCK_HEALTH_DASHBOARD_METRICS,
  MOCK_PROJECT_HEALTH_SUMMARY,
  MOCK_READINESS_ACTION_PREVIEWS,
  MOCK_READINESS_CATEGORIES,
  MOCK_READINESS_FINDINGS,
  MOCK_READINESS_REVIEW,
  MOCK_READINESS_SCORES,
  MOCK_WORKSPACE_READINESS_SNAPSHOT,
} from "@/lib/domain/mock-data";

export default function HealthPage() {
  return (
    <ProjectHealthDashboard
      actions={MOCK_READINESS_ACTION_PREVIEWS}
      categories={MOCK_READINESS_CATEGORIES}
      findings={MOCK_READINESS_FINDINGS}
      metrics={MOCK_HEALTH_DASHBOARD_METRICS}
      review={MOCK_READINESS_REVIEW}
      scores={MOCK_READINESS_SCORES}
      snapshot={MOCK_WORKSPACE_READINESS_SNAPSHOT}
      summary={MOCK_PROJECT_HEALTH_SUMMARY}
    />
  );
}
