/**
 * Tire Thermal Rubber Degradation Kinetics (Arrhenius Rate Equation)
 */
export const calculateRubberKineticDegradation = (surfaceTempC = 96, compound = 'HARD') => {
  const baseActivationTempC = 85;
  const tempExcess = Math.max(0, surfaceTempC - baseActivationTempC);
  // Exponential blistering acceleration above 105C
  const blisterRate = Math.exp(tempExcess / 12);
  const degradationPctPerHour = parseFloat((blisterRate * 3.4).toFixed(2));

  return {
    surfaceTempC,
    compound,
    degradationPctPerHour,
    thermalWearState: surfaceTempC > 110 ? 'BLISTERING_SEVERE' : (surfaceTempC > 100 ? 'THERMAL_GRAINING' : 'OPTIMAL_ELASTOMER'),
  };
};

export default calculateRubberKineticDegradation;
