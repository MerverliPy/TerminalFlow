import type { WorkspaceAccessReview } from "@/lib/auth/auth-types";

const FINDING_CLASSES: Record<WorkspaceAccessReview["findings"][number]["severity"], string> = {
  info: "workspace-pill--accent",
  warn: "workspace-pill--warn",
  blocked: "workspace-pill--good",
};

export function AccessReviewPanel({ review }: { review: WorkspaceAccessReview }) {
  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Access review</span>
        <span className="workspace-pill workspace-pill--accent">{review.reviewedAt}</span>
      </div>

      <p className="surface-heading__copy">
        {review.summary}
      </p>

      <div className="settings-grid">
        {review.findings.map((finding) => (
          <article className="settings-card" key={finding.id}>
            <span className="settings-card__label">Finding</span>
            <span className="settings-card__title">{finding.title}</span>
            <span className={`workspace-pill ${FINDING_CLASSES[finding.severity]}`}>{finding.severity}</span>
            <p className="card-copy">{finding.detail}</p>
          </article>
        ))}
      </div>

      <div className="settings-grid">
        {review.notes.map((note) => (
          <article className="settings-card" key={note.id}>
            <span className="settings-card__label">{note.title}</span>
            <p className="card-copy">{note.detail}</p>
          </article>
        ))}
      </div>

      <div className="settings-grid">
        {review.invites.map((invite) => (
          <article className="settings-card" key={invite.id}>
            <span className="settings-card__label">Invite preview</span>
            <span className="settings-card__title">{invite.email}</span>
            <div className="card-stack">
              <span className="workspace-pill workspace-pill--accent">{invite.role}</span>
              <span className="workspace-pill workspace-pill--warn">{invite.status}</span>
              <p className="card-copy">Group: {invite.groupId}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
