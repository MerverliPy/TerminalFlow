import type { ReactNode } from "react";

import { MobileTabNav } from "@/components/shell/mobile-tab-nav";

export default function TabsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="shell">
      <div className="shell__frame">
        <header className="shell__bar">
          <div className="brand">
            <span className="brand__eyebrow">TerminalFlow</span>
            <span className="brand__name">Static workspace control plane</span>
          </div>
          <div className="status">Local data only</div>
        </header>

        {children}
      </div>

      <MobileTabNav />
    </div>
  );
}
