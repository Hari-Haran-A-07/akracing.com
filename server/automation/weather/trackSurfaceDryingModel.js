/**
 * Post-Rain Track Surface Drying Line Model
 * Models evaporation rate of standing water driven by vehicle draft and sun radiation.
 */
export const estimateTrackDryingMinutes = (waterDepthMm = 2.5, ambientTempC = 26, trackCarsCount = 24) => {
  // Each car lap clears approx 0.04mm of surface water
  const naturalEvapRateMmPerMin = (ambientTempC / 30) * 0.05;
  const carDraftClearingRateMmPerMin = (trackCarsCount / 20) * 0.12;
  const totalClearRate = naturalEvapRateMmPerMin + carDraftClearingRateMmPerMin;

  const minutesToDry = Math.ceil(waterDepthMm / totalClearRate);

  return {
    waterDepthMm,
    minutesToDry,
    slickCrossoverMinute: Math.ceil(minutesToDry * 0.75),
    recommendedPreparation: 'STAGE_SLICK_TIRES_IN_PIT',
  };
};

export default estimateTrackDryingMinutes;
