/**
 * Aerodynamic Downforce & Drag Simulation Model
 * Computes front and rear wing downforce vectors (kg) as a function of velocity.
 */

export const calculateAeroForces = (speedKmh, wingAngleDeg = 8, rakeAngleDeg = 1.2) => {
  const velocityMs = speedKmh / 3.6;
  const airDensity = 1.225; // kg/m^3 at sea level

  // Front splitter area and rear wing coefficients
  const frontClA = 1.15 + (rakeAngleDeg * 0.12);
  const rearClA = 1.85 + (wingAngleDeg * 0.08);
  const cdA = 0.82 + (wingAngleDeg * 0.03);

  const dynamicPressure = 0.5 * airDensity * Math.pow(velocityMs, 2);

  const downforceFrontKg = parseFloat(((dynamicPressure * frontClA) / 9.81).toFixed(1));
  const downforceRearKg = parseFloat(((dynamicPressure * rearClA) / 9.81).toFixed(1));
  const totalDownforceKg = parseFloat((downforceFrontKg + downforceRearKg).toFixed(1));
  const dragForceKg = parseFloat(((dynamicPressure * cdA) / 9.81).toFixed(1));

  return {
    speedKmh,
    downforceFrontKg,
    downforceRearKg,
    totalDownforceKg,
    dragForceKg,
    aeroBalanceFrontPct: parseFloat(((downforceFrontKg / totalDownforceKg) * 100).toFixed(1)),
    liftToDragRatio: parseFloat((totalDownforceKg / dragForceKg).toFixed(2)),
  };
};

export default calculateAeroForces;
