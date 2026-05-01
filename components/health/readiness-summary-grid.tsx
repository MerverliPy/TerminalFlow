import type { ReadinessScore } from "@/lib/domain/types";

import { ReadinessScoreCard } from "@/components/health/readiness-score-card";

export function ReadinessSummaryGrid({ scores }: { scores: ReadinessScore[] }) {
  return (
    <section className="shell__section">
      <div className="card-stack">
        <span className="section-note">Readiness scorecards</span>
        <div className="stats-grid readiness-summary-grid">
          {scores.map((score) => (
            <ReadinessScoreCard key={score.id} score={score} />
          ))}
        </div>
      </div>
    </section>
  );
}
