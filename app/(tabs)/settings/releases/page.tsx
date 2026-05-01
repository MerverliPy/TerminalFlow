import { ReleaseNotesDashboard } from "@/components/releases/release-notes-dashboard";
import {
  MOCK_RELEASE_NOTES,
  MOCK_RELEASE_STORAGE_STATUS,
} from "@/lib/domain/mock-data";

export default function SettingsReleasesPage() {
  return (
    <ReleaseNotesDashboard
      releases={MOCK_RELEASE_NOTES}
      storageStatus={MOCK_RELEASE_STORAGE_STATUS}
    />
  );
}
