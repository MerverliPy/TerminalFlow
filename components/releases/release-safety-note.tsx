export function ReleaseSafetyNote() {
  return (
    <aside className="release-safety-note" role="note">
      <span className="session-safety-note__title">Local release note</span>
      <p className="session-safety-note__copy">
        Release notes and milestone review are mocked locally in this phase. No GitHub release, changelog automation, publishing, deployment, backend jobs, queues, workers, provider sync, or telemetry are active.
      </p>
      <p className="card-copy">
        Publish, export, share, create GitHub release, refresh changelog, and deploy controls render as inert previews only.
      </p>
    </aside>
  );
}
