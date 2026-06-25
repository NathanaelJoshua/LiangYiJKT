import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "./api";
import type { CmsData } from "./cms";

interface AdminDataValue {
  data: CmsData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const AdminDataContext = createContext<AdminDataValue | null>(null);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CmsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const d = await api.bootstrap();
      setData(d);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AdminDataContext.Provider value={{ data, loading, error, refresh }}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useCms() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useCms must be used within AdminDataProvider");
  return ctx;
}
