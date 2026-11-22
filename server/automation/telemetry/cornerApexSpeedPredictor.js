/**
 * Corner Apex Speed & Lateral Load Predictor
 * Computes maximum theoretical cornering velocity given vehicle mass and aerodynamic grip.
 */

export const predictApexSpeed = (cornerRadiusMeters = 65, bankedAngleDeg = 2, totalDownforceKg = 420) => {
  const carMassKg = 1260; // AKR GT3-01 minimum weight
  const frictionCoefficient = 1.65; // Slick tire grip coefficient

  const effectiveDownforceN = totalDownforceKg * 9.81;
  const gravityForceN = carMassKg * 9.81;
  const totalVerticalForceN = gravityForceN + effectiveDownforceN;

  const maxLateralForceN = totalVerticalForceN * frictionCoefficient;
  const maxVelocityMs = Math.sqrt((maxLateralForceN * cornerRadiusMeters) / carMassKg);
  const maxVelocityKmh = parseFloat((maxVelocityMs * 3.6).toFixed(1));

  return {
    cornerRadiusMeters,
    maxVelocityKmh,
    lateralGForce: parseFloat(((Math.pow(maxVelocityMs, 2) / cornerRadiusMeters) / 9.81).toFixed(2)),
    predictedGripLimitPct: 98.5,
  };
};

export default predictApexSpeed;
