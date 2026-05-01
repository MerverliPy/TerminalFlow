export function SecretsSafetyNote() {
  return (
    <aside className="session-safety-note" role="note">
      <span className="session-safety-note__title">Vault note</span>
      <p className="session-safety-note__copy">
        Secrets vault is metadata-only in this phase. No secret values, tokens, passwords, SSH keys, private keys, encryption, or backend vault storage are active.
      </p>
    </aside>
  );
}
