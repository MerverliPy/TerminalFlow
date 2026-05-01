import { notFound } from "next/navigation";

import { IntegrationProviderCatalog } from "@/components/settings/integration-provider-catalog";
import { MOCK_INTEGRATION_PROVIDERS } from "@/lib/domain/mock-data";

export default function SettingsIntegrationProviderPage({
  params,
}: {
  params: { providerId: string };
}) {
  const providerExists = MOCK_INTEGRATION_PROVIDERS.some((provider) => provider.id === params.providerId);

  if (!providerExists) {
    notFound();
  }

  return <IntegrationProviderCatalog activeProviderId={params.providerId} />;
}
