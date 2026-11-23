import { useState, useEffect, useCallback } from 'react';
import ecosystemService from '../services/ecosystemService';

export const useEcosystemStatus = (pollIntervalMs = 5000) => {
  const [data, setData] = useState({ repositories: [], totalRepositories: 0, loading: true });

  const fetchStatus = useCallback(async () => {
    try {
      const res = await ecosystemService.getEcosystemHealth();
      if (res && res.repositories) {
        setData({ repositories: res.repositories, totalRepositories: res.totalRepositories, loading: false });
      }
    } catch (e) {
      setData((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, pollIntervalMs);
    return () => clearInterval(interval);
  }, [fetchStatus, pollIntervalMs]);

  return data;
};

export default useEcosystemStatus;
