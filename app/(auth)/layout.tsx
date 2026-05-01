import type { ReactNode } from "react";

export default function AuthLayout({
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
            <span className="brand__name">Local auth boundary</span>
          </div>
          <div className="status">Mock sign-in only</div>
        </header>

        {children}
      </div>
    </div>
  );
}
