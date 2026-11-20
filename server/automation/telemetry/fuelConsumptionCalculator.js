/**
 * Fuel Stint & Consumption Automation Model
 * Calculates fuel burn rate per lap, target lift-and-coast delta, and maximum stint length.
 */
export const calculateFuelStint = (fuelCapacityLiters = 120, fuelRemainingLiters = 45, consumptionPerLapLiters = 3.85, lapsRemaining = 15) => {
  const lapsToEmpty = (fuelRemainingLiters / consumptionPerLapLiters).toFixed(1);
  const fuelDeficit = (lapsRemaining * consumptionPerLapLiters) - fuelRemainingLiters;
  const isStintCritical = fuelDeficit > 0;

  // Lift-and-coast fuel saving factor (saving up to 0.4L/lap at cost of ~0.3s/lap)
  const targetSavingPerLap = isStintCritical ? Math.min(0.5, fuelDeficit / lapsRemaining).toFixed(2) : 0;

  return {
    fuelCapacityLiters,
    fuelRemainingLiters,
    consumptionPerLapLiters,
    lapsToEmpty: parseFloat(lapsToEmpty),
    lapsRemaining,
    isStintCritical,
    fuelDeficitLiters: Math.max(0, parseFloat(fuelDeficit.toFixed(2))),
    strategyAdvice: isStintCritical
      ? TARGET FUEL SAVE: Lift-and-coast \L per lap to avoid splash-and-dash
      : 'FUEL ON TARGET: Maximum engine map authorized',
    calculatedAt: new Date().toISOString(),
  };
};

export default calculateFuelStint;
