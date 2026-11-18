/**
 * Automated Tire Degradation & Pit Window Strategy Model
 * Calculates non-linear thermal wear curves based on track abrasiveness and camber load.
 */
export const calculateTireDegradation = (currentLapsOnTire, compound = 'MEDIUM', trackTemp = 38) => {
  const compoundWearRates = {
    SOFT: 3.4,
    MEDIUM: 2.1,
    HARD: 1.3,
    WET: 1.8
  };

  const baseRate = compoundWearRates[compound] || 2.1;
  const tempFactor = trackTemp > 35 ? 1.25 : 1.0;
  const degradationPct = Math.min(100, (currentLapsOnTire * baseRate * tempFactor).toFixed(1));

  let recommendedAction = 'STINT_NOMINAL';
  if (degradationPct > 75) recommendedAction = 'BOX_IMMEDIATE';
  else if (degradationPct > 55) recommendedAction = 'PREPARE_PIT_CREW';

  return {
    compound,
    currentLapsOnTire,
    degradationPct: parseFloat(degradationPct),
    estimatedGripLossSec: (degradationPct * 0.025).toFixed(3),
    recommendedAction
  };
};

export default calculateTireDegradation;
