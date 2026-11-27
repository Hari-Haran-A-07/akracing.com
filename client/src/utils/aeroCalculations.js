/**
 * Aerodynamic Center of Pressure (CoP) & Downforce Distribution Calculations
 */

export const calculateCenterOfPressurePct = (frontDownforceKg, rearDownforceKg) => {
  const total = frontDownforceKg + rearDownforceKg;
  if (total <= 0) return 50.0;
  return parseFloat(((frontDownforceKg / total) * 100).toFixed(1));
};

export const calculateAeroDragForceN = (speedKmh, dragAreaCdA = 0.84) => {
  const velocityMs = speedKmh / 3.6;
  const airDensity = 1.225; // kg/m^3
  const dragForceN = 0.5 * airDensity * Math.pow(velocityMs, 2) * dragAreaCdA;
  return parseFloat(dragForceN.toFixed(1));
};

export default { calculateCenterOfPressurePct, calculateAeroDragForceN };
