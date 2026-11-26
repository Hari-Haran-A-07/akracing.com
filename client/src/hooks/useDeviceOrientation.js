import { useState, useEffect } from 'react';

/**
 * DeviceOrientation API hook for mobile steering tilt telemetry simulation.
 */
export const useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0, supported: false });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.DeviceOrientationEvent) return;

    const handleOrientation = (e) => {
      setOrientation({
        alpha: e.alpha ? parseFloat(e.alpha.toFixed(1)) : 0,
        beta: e.beta ? parseFloat(e.beta.toFixed(1)) : 0,
        gamma: e.gamma ? parseFloat(e.gamma.toFixed(1)) : 0,
        supported: true,
      });
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return orientation;
};

export default useDeviceOrientation;
