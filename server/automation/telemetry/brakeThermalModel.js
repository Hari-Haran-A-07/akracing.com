/**
 * Carbon-Ceramic Brake Thermal Dissipation Model
 * Simulates brake rotor temperature spike during heavy deceleration and airflow cooling recovery.
 */

export const simulateBrakeThermalStep = (currentTempC, speedKmh, brakePressureBar, ambientTempC = 25) => {
  const isBraking = brakePressureBar > 5;
  let nextTempC = currentTempC;

  if (isBraking) {
    // Kinetic energy converted to heat
    const heatInputRate = (speedKmh / 300) * (brakePressureBar / 100) * 45;
    nextTempC += heatInputRate;
  } else {
    // Airflow convective cooling through brake ducts
    const coolingRate = ((speedKmh / 200) * 0.8 + 0.1) * (currentTempC - ambientTempC) * 0.02;
    nextTempC = Math.max(ambientTempC, nextTempC - coolingRate);
  }

  const isGlazed = nextTempC > 850;
  const isColdBite = nextTempC < 300;

  return {
    rotorTempC: parseFloat(nextTempC.toFixed(1)),
    thermalStatus: isGlazed ? 'THERMAL_OVERHEAT_GLAZING' : (isColdBite ? 'COLD_ROTOR_LOW_BITE' : 'OPTIMAL_OPERATING_RANGE'),
    frictionEfficiencyPct: isGlazed ? 78 : (isColdBite ? 85 : 100),
  };
};

export default simulateBrakeThermalStep;
