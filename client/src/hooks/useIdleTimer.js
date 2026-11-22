import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to detect user inactivity.
 * Automatically throttles high-frequency WebGL 3D render loops when user is idle.
 */
export const useIdleTimer = (idleTimeoutMs = 60000) => {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    setIsIdle(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsIdle(true), idleTimeoutMs);
  }, [idleTimeoutMs]);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach((evt) => window.addEventListener(evt, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer]);

  return isIdle;
};

export default useIdleTimer;
