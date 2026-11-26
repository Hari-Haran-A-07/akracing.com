/**
 * Paddock Tire Blanket Warmer Thermal Saturation Model
 */
export const calculateTireBlanketStatus = (bakingMinutes = 60, targetTempC = 90) => {
  // Asymptotic thermal saturation curve
  const currentTempC = 20 + (targetTempC - 20) * (1 - Math.exp(-bakingMinutes / 25));
  const isFullyBaked = bakingMinutes >= 75;

  return {
    bakingMinutes,
    currentTempC: parseFloat(currentTempC.toFixed(1)),
    targetTempC,
    isReadyForMounting: currentTempC >= (targetTempC - 5),
    isFullyBaked,
  };
};

export default calculateTireBlanketStatus;
