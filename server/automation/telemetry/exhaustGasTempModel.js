/**
 * Exhaust Gas Temperature (EGT) & Lambda Combustion Model
 */
export const evaluateExhaustCombustion = (egtC = 875, lambda = 0.88, rpm = 8200) => {
  const isTooLean = lambda > 0.95 && rpm > 7000;
  const isOverEgtLimit = egtC > 960;

  let engineProtectionStatus = 'NOMINAL';
  if (isOverEgtLimit) engineProtectionStatus = 'CRITICAL_EGT_EXCEEDED';
  else if (isTooLean) engineProtectionStatus = 'WARNING_LEAN_MIXTURE';

  return {
    egtC,
    lambda,
    engineProtectionStatus,
    recommendedFuelEnrichmentPct: isOverEgtLimit ? 4.5 : (isTooLean ? 2.5 : 0),
  };
};

export default evaluateExhaustCombustion;
