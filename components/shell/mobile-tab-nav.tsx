"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { TAB_NAV_ITEMS } from "@/lib/navigation/routes";

export function MobileTabNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-tab-nav" aria-label="Primary">
      <div className="mobile-tab-nav__inner">
        {TAB_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-tab-nav__link"
              aria-current={isActive ? "page" : undefined}
            >
              <span className={`dot ${isActive ? "dot--accent" : ""}`} />
              <span className="mobile-tab-nav__label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
