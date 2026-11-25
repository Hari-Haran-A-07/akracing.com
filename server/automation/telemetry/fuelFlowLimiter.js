/**
 * FIA 100 kg/h Ultrasonic Fuel Flow Limiter Model
 * Verifies instantaneous engine fuel flow compliance with strict endurance sporting regulations.
 */
export const checkFuelFlowCompliance = (fuelMassFlowKgPerHour = 98.4, maxLimitKgPerHour = 100.0) => {
  const isViolation = fuelMassFlowKgPerHour > maxLimitKgPerHour;
  const deltaKgPerHour = parseFloat((fuelMassFlowKgPerHour - maxLimitKgPerHour).toFixed(2));

  return {
    fuelMassFlowKgPerHour,
    maxLimitKgPerHour,
    isViolation,
    deltaKgPerHour,
    complianceStatus: isViolation ? 'ILLEGAL_OVERFLOW_EXCEEDANCE' : 'LEGAL_COMPLIANT',
  };
};

export default checkFuelFlowCompliance;
