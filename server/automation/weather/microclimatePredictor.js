/**
 * Circuit Microclimate & Asphalt Temperature Predictor
 * Predicts track surface grip evolution based on solar radiation, cloud coverage, and wind vector.
 */

export const predictTrackConditions = (ambientTempC, solarRadiationWm2 = 650, cloudCoverPct = 20) => {
  // Asphalt absorption index
  const solarHeatingFactor = (solarRadiationWm2 / 1000) * (1 - (cloudCoverPct / 100)) * 22;
  const predictedTrackTempC = parseFloat((ambientTempC + solarHeatingFactor).toFixed(1));

  let trackGripRating = 'EXCELLENT';
  if (predictedTrackTempC > 48) trackGripRating = 'GREASY_OVERHEATED';
  else if (predictedTrackTempC < 18) trackGripRating = 'LOW_GRIP_COLD';

  return {
    ambientTempC,
    predictedTrackTempC,
    solarHeatingOffset: parseFloat(solarHeatingFactor.toFixed(1)),
    trackGripRating,
    idealTireOperatingWindow: predictedTrackTempC > 40 ? 'HARD_SLICK' : 'MEDIUM_SLICK',
  };
};

export default predictTrackConditions;
