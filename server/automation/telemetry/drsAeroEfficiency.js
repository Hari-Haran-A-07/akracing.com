/**
 * DRS Aerodynamic Efficiency & Drag Reduction Calculator
 */
export const calculateDRSEfficiency = (speedKmh = 280, baseWingCdA = 0.88, openWingCdA = 0.62) => {
  const velocityMs = speedKmh / 3.6;
  const deltaCdA = baseWingCdA - openWingCdA;
  const dragReductionForceN = 0.5 * 1.225 * Math.pow(velocityMs, 2) * deltaCdA;
  const topSpeedDeltaKmh = parseFloat((deltaCdA * 34.0).toFixed(1));

  return {
    speedKmh,
    dragReductionForceN: parseFloat(dragReductionForceN.toFixed(1)),
    estimatedTopSpeedGainKmh: topSpeedDeltaKmh,
    efficiencyGainPct: parseFloat(((deltaCdA / baseWingCdA) * 100).toFixed(1)),
  };
};

export default calculateDRSEfficiency;
