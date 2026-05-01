import type { LocalReleaseMilestone } from "@/lib/domain/types";

import { MilestoneStatusCard } from "@/components/releases/milestone-status-card";

export function MilestoneReviewDashboard({ milestones }: { milestones: LocalReleaseMilestone[] }) {
  const completeCount = milestones.filter((milestone) => milestone.status === "complete").length;

  return (
    <section className="shell__section session-panel">
      <div className="session-panel__header">
        <span className="section-note">Milestone review</span>
        <span className="workspace-pill workspace-pill--accent">
          {completeCount}/{milestones.length} complete
        </span>
      </div>

      <p className="surface-heading__copy">
        Milestones are static local records that describe the release desk rollout and not a live publishing workflow.
      </p>

      <div className="release-milestone-grid">
        {milestones.map((milestone) => (
          <MilestoneStatusCard key={milestone.id} milestone={milestone} />
        ))}
      </div>
    </section>
  );
}
