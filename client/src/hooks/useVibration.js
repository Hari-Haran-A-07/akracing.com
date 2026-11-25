import { useCallback } from 'react';

/**
 * Navigator Vibration API hook providing haptic alerts for mobile pit crew.
 */
export const useVibration = () => {
  const vibrateShift = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([40]);
    }
  }, []);

  const vibrateWarning = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([80, 50, 80]);
    }
  }, []);

  const vibrateCritical = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([150, 80, 150, 80, 200]);
    }
  }, []);

  return { vibrateShift, vibrateWarning, vibrateCritical };
};

export default useVibration;
