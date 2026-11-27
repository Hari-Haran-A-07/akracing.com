import { useState, useEffect } from 'react';

export const useOnlinePing = (pingUrl = '/api/health', intervalMs = 5000) => {
  const [latencyMs, setLatencyMs] = useState(12);

  useEffect(() => {
    let active = true;
    const checkPing = async () => {
      const start = performance.now();
      try {
        await fetch(pingUrl, { method: 'HEAD', cache: 'no-store' });
        if (active) {
          setLatencyMs(Math.round(performance.now() - start));
        }
      } catch (e) {
        if (active) setLatencyMs(-1);
      }
    };

    checkPing();
    const timer = setInterval(checkPing, intervalMs);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [pingUrl, intervalMs]);

  return latencyMs;
};

export default useOnlinePing;
