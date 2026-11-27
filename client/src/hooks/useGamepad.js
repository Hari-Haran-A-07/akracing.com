import { useState, useEffect, useCallback } from 'react';

/**
 * HTML5 Gamepad API hook supporting steering wheels and pedal sets (Logitech, Fanatec, Thrustmaster).
 */
export const useGamepad = () => {
  const [gamepadState, setGamepadState] = useState({
    connected: false,
    id: null,
    steeringAxis: 0,
    throttleAxis: 0,
    brakeAxis: 0,
  });

  const pollGamepad = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.getGamepads) return;
    const gamepads = navigator.getGamepads();
    const gp = gamepads[0];

    if (gp) {
      setGamepadState({
        connected: true,
        id: gp.id,
        steeringAxis: gp.axes[0] ? parseFloat(gp.axes[0].toFixed(3)) : 0,
        throttleAxis: gp.axes[1] ? parseFloat(gp.axes[1].toFixed(3)) : 0,
        brakeAxis: gp.axes[2] ? parseFloat(gp.axes[2].toFixed(3)) : 0,
      });
    } else {
      setGamepadState((prev) => (prev.connected ? { ...prev, connected: false } : prev));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(pollGamepad, 50);
    return () => clearInterval(timer);
  }, [pollGamepad]);

  return gamepadState;
};

export default useGamepad;
