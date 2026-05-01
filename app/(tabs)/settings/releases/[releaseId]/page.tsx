import { notFound } from "next/navigation";

import { ReleaseDetail } from "@/components/releases/release-detail";
import { MOCK_RELEASE_NOTES } from "@/lib/domain/mock-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return MOCK_RELEASE_NOTES.map((release) => ({ releaseId: release.id }));
}

export default async function SettingsReleaseDetailPage({
  params,
}: {
  params: Promise<{ releaseId: string }>;
}) {
  const { releaseId } = await params;

  const releaseExists = MOCK_RELEASE_NOTES.some((release) => release.id === releaseId);

  if (!releaseExists) {
    notFound();
  }

  return <ReleaseDetail releaseId={releaseId} />;
}
