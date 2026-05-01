import type { ReadinessFinding } from "@/lib/domain/types";

const FINDING_CLASSES: Record<ReadinessFinding["severity"], string> = {
  info: "workspace-pill--accent",
  warn: "workspace-pill--warn",
  blocked: "workspace-pill--blocked",
};

export function ReadinessFindingCard({ finding }: { finding: ReadinessFinding }) {
  return (
    <article className="card readiness-finding-card">
      <div className="card__top">
        <span className="card-title">{finding.title}</span>
        <span className={`workspace-pill ${FINDING_CLASSES[finding.severity]}`}>{finding.severity}</span>
      </div>
      <p className="card-copy">{finding.detail}</p>
      <span className="readiness-finding-card__preview">{finding.preview}</span>
    </article>
  );
}
