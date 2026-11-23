import { useState, useCallback } from 'react';
import cfdEngineBridge from '../services/cfdEngineBridge';

export const useCFDSimulation = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const simulate = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await cfdEngineBridge.runAirflowSimulation(params);
      setResult(res);
      return res;
    } catch (e) {
      console.warn('[CFD Solver]', e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { simulate, result, loading };
};

export default useCFDSimulation;
