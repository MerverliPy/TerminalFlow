import type { NotificationPreferencePreview } from "@/lib/domain/types";

export function NotificationPreferencesPanel({
  preferences,
}: {
  preferences: NotificationPreferencePreview[];
}) {
  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Notification preferences</span>
        <span className="workspace-pill workspace-pill--accent">{preferences.length} preview rules</span>
      </div>

      <p className="surface-heading__copy">
        These preferences are preview metadata only. No delivery channels, jobs, or backend
        subscriptions are active.
      </p>

      <div className="settings-grid">
        {preferences.map((preference) => (
          <article className="settings-card" key={preference.id}>
            <span className="settings-card__label">{preference.enabled ? "Enabled preview" : "Disabled preview"}</span>
            <span className="settings-card__title">{preference.label}</span>
            <p className="card-copy">{preference.summary}</p>
            <div className="card-stack">
              <span className={`workspace-pill ${preference.enabled ? "workspace-pill--good" : "workspace-pill--warn"}`}>
                {preference.enabled ? "on" : "off"}
              </span>
              <p className="card-copy">{preference.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
