import { useState, useEffect, useCallback } from 'react';

/**
 * Screen Wake Lock API hook preventing mobile and desktop display sleep
 * during prolonged pit wall telemetry monitoring stints.
 */
export const useWakeLock = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [wakeLock, setWakeLock] = useState(null);

  const requestLock = useCallback(async () => {
    if (typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
      try {
        const lock = await navigator.wakeLock.request('screen');
        setWakeLock(lock);
        setIsLocked(true);
        lock.addEventListener('release', () => setIsLocked(false));
      } catch (err) {
        setIsLocked(false);
      }
    }
  }, []);

  const releaseLock = useCallback(() => {
    if (wakeLock) {
      wakeLock.release();
      setWakeLock(null);
      setIsLocked(false);
    }
  }, [wakeLock]);

  useEffect(() => {
    return () => {
      if (wakeLock) wakeLock.release();
    };
  }, [wakeLock]);

  return { isLocked, requestLock, releaseLock };
};

export default useWakeLock;
