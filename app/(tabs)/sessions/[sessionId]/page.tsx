import { notFound } from "next/navigation";

import { CommandComposer } from "@/components/session/command-composer";
import { SessionCommandHistory } from "@/components/session/session-command-history";
import { SessionDetailHeader } from "@/components/session/session-detail-header";
import { SessionHostPanel } from "@/components/session/session-host-panel";
import { SessionSafetyNote } from "@/components/session/session-safety-note";
import {
  MOCK_COMMAND_ENTRIES,
  MOCK_HOST_CONNECTIONS,
  MOCK_PROJECTS,
  MOCK_SESSIONS,
} from "@/lib/domain/mock-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return MOCK_SESSIONS.map((session) => ({ sessionId: session.id }));
}

export default function SessionDetailPage({
  params,
}: {
  params: { sessionId: string };
}) {
  const session = MOCK_SESSIONS.find(({ id }) => id === params.sessionId);

  if (!session) {
    notFound();
  }

  const project = MOCK_PROJECTS.find(({ id }) => id === session.projectId);
  const host = MOCK_HOST_CONNECTIONS.find(({ id }) => id === session.hostId);

  if (!project || !host) {
    notFound();
  }

  const commandEntries = MOCK_COMMAND_ENTRIES.filter(
    (entry) => entry.sessionId === session.id,
  );

  return (
    <main className="shell__panel">
      <SessionDetailHeader session={session} project={project} host={host} />
      <SessionHostPanel session={session} project={project} host={host} />
      <SessionCommandHistory entries={commandEntries} />
      <CommandComposer session={session} />
      <SessionSafetyNote />
    </main>
  );
}
