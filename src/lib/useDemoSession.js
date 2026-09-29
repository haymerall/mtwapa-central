import { useState, useEffect, useCallback } from "react";
import { getDemoSession, setDemoSession, clearDemoSession, DEMO_ACCOUNTS, ROLE_LABELS } from "@/lib/roles";

// React hook for the demo role session. In production this would be replaced
// by the real authenticated user and their assigned role/permissions.
export function useDemoSession() {
  const [session, setSession] = useState(() => getDemoSession());

  useEffect(() => {
    const onStorage = () => setSession(getDemoSession());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = useCallback((account) => {
    const sess = {
      role: account.role,
      name: account.name,
      email: account.email,
      label: ROLE_LABELS[account.role],
    };
    setDemoSession(sess);
    setSession(sess);
    return sess;
  }, []);

  const logout = useCallback(() => {
    clearDemoSession();
    setSession(null);
  }, []);

  return { session, login, logout, accounts: DEMO_ACCOUNTS };
}