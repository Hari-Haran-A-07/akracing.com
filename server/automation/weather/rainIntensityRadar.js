/**
 * Circuit Rain Intensity Radar & Crossover Predictor
 * Predicts crossover lap between slick, intermediate, and full-wet tire compounds.
 */
export const evaluateRainCrossover = (rainfallMmPerHour = 0.8, standingWaterDepthMm = 0.5) => {
  let recommendedTire = 'SLICK';
  let aquaplaningRisk = 'LOW';

  if (rainfallMmPerHour > 4.5 || standingWaterDepthMm > 3.0) {
    recommendedTire = 'FULL_WET';
    aquaplaningRisk = 'SEVERE';
  } else if (rainfallMmPerHour > 1.2 || standingWaterDepthMm > 0.8) {
    recommendedTire = 'INTERMEDIATE';
    aquaplaningRisk = 'MODERATE';
  }

  return {
    rainfallMmPerHour,
    standingWaterDepthMm,
    recommendedTire,
    aquaplaningRisk,
    crossoverConfidence: 0.91,
    boxCallAdvised: recommendedTire !== 'SLICK',
  };
};

export default evaluateRainCrossover;
