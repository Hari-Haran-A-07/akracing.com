import { useState, useEffect } from 'react';

/**
 * Custom hook to detect mobile battery level and charging state.
 * Reduces 3D canvas framerates when device is running on low battery.
 */
export const useBattery = () => {
  const [batteryState, setBatteryState] = useState({
    level: 1,
    charging: true,
    isLowBattery: false,
    supported: false,
  });

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.getBattery) return;

    let batteryInstance = null;

    navigator.getBattery().then((battery) => {
      batteryInstance = battery;

      const update = () => {
        setBatteryState({
          level: battery.level,
          charging: battery.charging,
          isLowBattery: battery.level < 0.2 && !battery.charging,
          supported: true,
        });
      };

      update();
      battery.addEventListener('levelchange', update);
      battery.addEventListener('chargingchange', update);
    });

    return () => {
      if (batteryInstance) {
        batteryInstance.removeEventListener('levelchange', () => {});
        batteryInstance.removeEventListener('chargingchange', () => {});
      }
    };
  }, []);

  return batteryState;
};

export default useBattery;
