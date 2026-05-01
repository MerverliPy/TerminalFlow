import { HostCard } from "@/components/hosts/host-card";
import { MOCK_HOST_CONNECTIONS } from "@/lib/domain/mock-data";

export default function HostsPage() {
  return (
    <main className="shell__panel">
      <section className="surface-heading">
        <span className="surface-heading__eyebrow">Hosts</span>
        <h1 className="surface-heading__title">Static host connections</h1>
        <p className="surface-heading__copy">
          Hosts are represented as local connection profiles. The cards are
          browseable from mobile navigation and lead to static setup surfaces
          only.
        </p>
      </section>

      <section className="shell__section">
        <div className="card-grid">
          {MOCK_HOST_CONNECTIONS.map((host) => (
            <HostCard key={host.id} host={host} />
          ))}
        </div>
      </section>
    </main>
  );
}
