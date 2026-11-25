/**
 * Cross-Axle Differential Grip & Wheel-Spin Analyzer
 */
export const analyzeDifferentialGrip = (wheelSpeedLeftKmh, wheelSpeedRightKmh) => {
  const speedDelta = Math.abs(wheelSpeedLeftKmh - wheelSpeedRightKmh);
  const isSpinning = speedDelta > 8.0;

  return {
    wheelSpeedLeftKmh,
    wheelSpeedRightKmh,
    speedDelta: parseFloat(speedDelta.toFixed(1)),
    isWheelSpinDetected: isSpinning,
    recommendedTractionControlMap: isSpinning ? 'INCREASE_TC_LEVEL_1' : 'NOMINAL',
  };
};

export default analyzeDifferentialGrip;
