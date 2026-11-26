/**
 * Tire Mechanics & Rotational Geometry Calculations
 */

export const calculateTireRollRadiusMm = (wheelRimInches = 18, tireWidthMm = 300, aspectPct = 68) => {
  const sidewallHeightMm = tireWidthMm * (aspectPct / 100);
  const rimRadiusMm = (wheelRimInches * 25.4) / 2;
  return parseFloat((rimRadiusMm + sidewallHeightMm).toFixed(1));
};

export const calculateWheelRpsFromSpeed = (speedKmh, rollRadiusMm) => {
  const speedMs = speedKmh / 3.6;
  const circumferenceM = (2 * Math.PI * rollRadiusMm) / 1000;
  return parseFloat((speedMs / circumferenceM).toFixed(2));
};

export default { calculateTireRollRadiusMm, calculateWheelRpsFromSpeed };
