/**
 * Automated Yellow Flag Delta Enforcer
 * Validates that driver reduced speed by at least 15% in marshaling sector under yellow flag.
 */
export const verifyYellowFlagDelta = (normalSectorSpeedKmh = 220, currentSectorSpeedKmh = 175) => {
  const speedReductionPct = parseFloat((((normalSectorSpeedKmh - currentSectorSpeedKmh) / normalSectorSpeedKmh) * 100).toFixed(1));
  const isCompliant = speedReductionPct >= 15.0;

  return {
    speedReductionPct,
    isCompliant,
    stewardNote: isCompliant ? 'LEGAL: Driver lifted and showed safe speed reduction' : 'VIOLATION: Insufficient lift under yellow flag conditions',
  };
};

export default verifyYellowFlagDelta;
