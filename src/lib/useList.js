import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

// Lightweight data hook for listing entity records.
export function useList(entityName, sort = "-created_date", limit = 200) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await base44.entities[entityName].list(sort, limit);
      setData(items || []);
    } catch (e) {
      setError(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [entityName]);

  return { data, loading, error, reload: load };
}