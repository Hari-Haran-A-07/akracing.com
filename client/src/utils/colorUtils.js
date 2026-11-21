/**
 * Telemetry Color Interpolation & Delta Utilities
 */

// Returns color hex for tire temperature (Optimal ~90Â°C)
export const getTireTempColor = (tempC) => {
  if (tempC < 70) return '#3b82f6'; // Cold (Blue)
  if (tempC <= 100) return '#10b981'; // Optimal (Green)
  if (tempC <= 115) return '#f59e0b'; // Overheating (Amber)
  return '#ef4444'; // Blistering (Red)
};

// Returns color hex for sector delta times
export const getSectorDeltaColor = (deltaSec, isPurple = false) => {
  if (isPurple) return '#a855f7'; // Purple (Session fastest)
  if (deltaSec < 0) return '#10b981'; // Green (Personal best)
  return '#eab308'; // Yellow (Slower than PB)
};

export default { getTireTempColor, getSectorDeltaColor };
