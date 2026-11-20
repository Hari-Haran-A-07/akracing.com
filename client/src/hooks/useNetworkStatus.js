import { useState, useEffect } from 'react';

/**
 * Custom hook to monitor client network connectivity and connection speed.
 * Essential for auto-degrading telemetry stream fidelity during bandwidth drops.
 */
export const useNetworkStatus = () => {
  const [status, setStatus] = useState({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    effectiveType: typeof navigator !== 'undefined' && navigator.connection ? navigator.connection.effectiveType : '4g',
    downlink: typeof navigator !== 'undefined' && navigator.connection ? navigator.connection.downlink : 10,
    rtt: typeof navigator !== 'undefined' && navigator.connection ? navigator.connection.rtt : 50,
  });

  useEffect(() => {
    const handleOnline = () => setStatus((prev) => ({ ...prev, isOnline: true }));
    const handleOffline = () => setStatus((prev) => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const connection = navigator.connection;
    const handleConnectionChange = () => {
      if (connection) {
        setStatus({
          isOnline: navigator.onLine,
          effectiveType: connection.effectiveType || '4g',
          downlink: connection.downlink || 10,
          rtt: connection.rtt || 50,
        });
      }
    };

    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return status;
};

export default useNetworkStatus;
