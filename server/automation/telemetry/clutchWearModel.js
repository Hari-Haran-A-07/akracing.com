/**
 * Multi-Plate Carbon Clutch Thermal & Wear Degradation Model
 */
export const calculateClutchSlipHeat = (engineRpm = 6800, transmissionRpm = 4500, slipDurationSec = 0.45) => {
  const deltaRpm = Math.abs(engineRpm - transmissionRpm);
  // Energy dissipated as heat (Joules)
  const heatGeneratedJoules = deltaRpm * slipDurationSec * 14.2;
  const estimatedPlateTempC = 80 + (heatGeneratedJoules / 220);
  const isOverheated = estimatedPlateTempC > 450;

  return {
    deltaRpm,
    slipDurationSec,
    heatGeneratedJoules: parseFloat(heatGeneratedJoules.toFixed(1)),
    estimatedPlateTempC: parseFloat(estimatedPlateTempC.toFixed(1)),
    isOverheated,
    biteQuality: isOverheated ? 'FADED_GLAZED' : 'OPTIMAL_BITE',
  };
};

export default calculateClutchSlipHeat;
