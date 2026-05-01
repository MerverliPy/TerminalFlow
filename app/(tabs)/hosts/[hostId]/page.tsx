import { notFound } from "next/navigation";

import { HostConnectionPanel } from "@/components/hosts/host-connection-panel";
import { HostDisabledActions } from "@/components/hosts/host-disabled-actions";
import { HostDetailHeader } from "@/components/hosts/host-detail-header";
import { HostSafetyChecklist } from "@/components/hosts/host-safety-checklist";
import { MOCK_HOST_CONNECTIONS } from "@/lib/domain/mock-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return MOCK_HOST_CONNECTIONS.map((host) => ({ hostId: host.id }));
}

export default function HostDetailPage({
  params,
}: {
  params: { hostId: string };
}) {
  const host = MOCK_HOST_CONNECTIONS.find(({ id }) => id === params.hostId);

  if (!host) {
    notFound();
  }

  return (
    <main className="shell__panel">
      <HostDetailHeader host={host} />
      <HostConnectionPanel host={host} />
      <HostSafetyChecklist checks={host.safetyChecks} />
      <HostDisabledActions />
    </main>
  );
}
