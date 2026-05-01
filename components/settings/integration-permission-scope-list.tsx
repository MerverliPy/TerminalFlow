import type { IntegrationPermissionScope } from "@/lib/domain/types";

export function IntegrationPermissionScopeList({ scopes }: { scopes: IntegrationPermissionScope[] }) {
  return (
    <section className="shell__section auth-panel">
      <div className="session-panel__header">
        <span className="section-note">Permission scopes</span>
        <span className="workspace-pill workspace-pill--accent">{scopes.length} preview scopes</span>
      </div>

      <div className="permission-group-list">
        {scopes.map((scope) => (
          <article className="permission-chip" key={scope.id}>
            <div className="card-kv">
              <span className="card-kv__label">{scope.key}</span>
              <span className="card-kv__value">{scope.label}</span>
            </div>
            <span className="workspace-pill workspace-pill--warn">{scope.preview}</span>
            <p className="card-copy">{scope.summary}</p>
            <p className="card-copy">{scope.riskNote}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
