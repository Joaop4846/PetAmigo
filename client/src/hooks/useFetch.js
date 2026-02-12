import { useState, useEffect, useCallback } from 'react';

export default function useFetch(fetchFn, params = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramsKey = JSON.stringify(params);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFn(JSON.parse(paramsKey));
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [fetchFn, paramsKey]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
