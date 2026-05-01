import Link from "next/link";
import type { ReactNode } from "react";

import { ROUTES } from "@/lib/navigation/routes";

const NAV_ITEMS = [
  {
    label: "Hub",
    href: ROUTES.hub,
  },
] as const;

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
            <span className="brand__name">Mobile control plane</span>
          </div>
          <div className="status">Local shell ready</div>
        </header>

        {children}

        <nav className="shell__dock" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              className="dock-link dock-link--active"
              href={item.href}
              aria-current="page"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
