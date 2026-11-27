/**
 * Density Altitude and Air Density Calculator for Engine Power Optimization
 */
export const calculateAirDensity = (ambientTempC = 30, baroPressureHpa = 1013.25, humidityPct = 50) => {
  const tempKelvin = ambientTempC + 273.15;
  // Dry air density equation
  const densityKgM3 = (baroPressureHpa * 100) / (287.05 * tempKelvin);
  const powerLossPct = parseFloat(((1 - (densityKgM3 / 1.225)) * 100).toFixed(1));

  return {
    ambientTempC,
    baroPressureHpa,
    airDensityKgM3: parseFloat(densityKgM3.toFixed(3)),
    enginePowerDeltaPct: -powerLossPct,
  };
};

export default calculateAirDensity;
