"use client";

import { useState } from "react";

import { clearLocalStoreSnapshot, resetLocalStoreSnapshot } from "@/lib/storage/local-store";

export function ResetDemoDataPanel() {
  const [lastAction, setLastAction] = useState("Demo data is ready.");

  const handleRestore = () => {
    resetLocalStoreSnapshot();
    setLastAction("Demo data restored locally on this device.");
  };

  const handleClear = () => {
    clearLocalStoreSnapshot();
    setLastAction("Local storage cleared on this device.");
  };

  return (
    <section className="shell__section session-panel storage-panel">
      <div className="session-panel__header">
        <span className="section-note">Reset and demo data</span>
        <span className="workspace-pill workspace-pill--accent">Local only</span>
      </div>

      <p className="surface-heading__copy">
        Resetting or restoring demo data only touches browser storage on this device. No backend or cloud data is used.
      </p>

      <div className="composer__actions storage-actions">
        <button className="composer__button composer__button--primary" type="button" onClick={handleRestore}>
          Restore demo data
        </button>
        <button className="composer__button" type="button" onClick={handleClear}>
          Clear local storage
        </button>
      </div>

      <p className="composer__hint">{lastAction}</p>
    </section>
  );
}
