import { useState, useEffect, useCallback } from 'react';
import automationService from '../services/automationService';

export const useWorkflowExecution = (pollInterval = 4000) => {
  const [executions, setExecutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExecutions = useCallback(async () => {
    try {
      const res = await automationService.getExecutions();
      if (res && res.executions) {
        setExecutions(res.executions);
      }
    } catch (err) {
      setError(err.message || 'Failed to poll executions');
    }
  }, []);

  const trigger = async (workflowName, payload) => {
    setLoading(true);
    try {
      const res = await automationService.triggerWorkflow(workflowName, payload);
      await fetchExecutions();
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExecutions();
    const timer = setInterval(fetchExecutions, pollInterval);
    return () => clearInterval(timer);
  }, [fetchExecutions, pollInterval]);

  return { executions, loading, error, trigger, refresh: fetchExecutions };
};

export default useWorkflowExecution;
