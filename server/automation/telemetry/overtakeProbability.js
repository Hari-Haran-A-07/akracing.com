/**
 * Overtake Probability & DRS Closure Calculator
 * Calculates probability of executing a successful pass based on delta speed and braking zone length.
 */

export const calculateOvertakeProbability = ({
  speedDeltaKmh = 12,
  distanceMeters = 45,
  straightLengthMeters = 800,
  drsActive = true,
  tireGripDeltaPct = 5,
}) => {
  // Speed differential score (0-40)
  const speedScore = Math.min(40, (speedDeltaKmh / 20) * 40);

  // Proximity score (0-30)
  const proximityScore = Math.max(0, 30 - (distanceMeters / 100) * 30);

  // DRS bonus (15)
  const drsScore = drsActive ? 15 : 0;

  // Grip differential score (0-15)
  const gripScore = Math.min(15, (tireGripDeltaPct / 10) * 15);

  const totalScore = Math.min(99, Math.max(5, Math.round(speedScore + proximityScore + drsScore + gripScore)));

  return {
    overtakeProbabilityPct: totalScore,
    recommendedManeuver: totalScore > 75 ? 'DIVE_INSIDE_BRAKING_ZONE' : (totalScore > 50 ? 'SWITCHBACK_APEX_CUT' : 'HOLD_SLIPSTREAM'),
    closureRateMs: (speedDeltaKmh / 3.6).toFixed(1),
    evaluatedAt: new Date().toISOString(),
  };
};

export default calculateOvertakeProbability;
