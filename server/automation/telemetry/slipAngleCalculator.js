/**
 * Tire Slip Angle & Vehicle Attitude Dynamics Calculator
 * Determines oversteer and understeer gradients based on yaw rate and steering angle.
 */
export const calculateSlipAngles = (speedKmh, yawRateDegPerSec, steeringAngleDeg, wheelbaseMeters = 2.45) => {
  const speedMs = Math.max(1, speedKmh / 3.6);
  const yawRateRad = (yawRateDegPerSec * Math.PI) / 180;
  const steerRad = (steeringAngleDeg * Math.PI) / 180;

  // Linear bicycle model approximation
  const frontSlipAngleDeg = parseFloat(((steerRad - (yawRateRad * (wheelbaseMeters / 2)) / speedMs) * (180 / Math.PI)).toFixed(2));
  const rearSlipAngleDeg = parseFloat((((yawRateRad * (wheelbaseMeters / 2)) / speedMs) * (180 / Math.PI)).toFixed(2));
  const slipAngleDelta = frontSlipAngleDeg - rearSlipAngleDeg;

  let balance = 'NEUTRAL';
  if (slipAngleDelta > 1.2) balance = 'UNDERSTEER_PUSH';
  else if (slipAngleDelta < -1.2) balance = 'OVERSTEER_LOOSE';

  return {
    frontSlipAngleDeg,
    rearSlipAngleDeg,
    slipAngleDelta: parseFloat(slipAngleDelta.toFixed(2)),
    vehicleBalance: balance,
  };
};

export default calculateSlipAngles;
