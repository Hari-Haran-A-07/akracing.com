/**
 * Hybrid ERS / KERS Energy Recovery & Deployment State-of-Charge Model
 * Models regenerative braking harvest (MJ) and electric boost deployment curves.
 */
export const modelEnergyRecovery = (currentSocPct = 68, brakePressureBar = 60, speedKmh = 220, deployBoost = false) => {
  const isRegenBraking = brakePressureBar > 15 && speedKmh > 80;
  let nextSoc = currentSocPct;
  let harvestRateKwh = 0;
  let deployRateKwh = 0;

  if (isRegenBraking) {
    harvestRateKwh = (brakePressureBar / 100) * (speedKmh / 250) * 120; // Up to 120kW harvest
    nextSoc = Math.min(100, nextSoc + (harvestRateKwh / 3600) * 2.5);
  }

  if (deployBoost && nextSoc > 10) {
    deployRateKwh = 160; // 160kW MGU-K electric kick
    nextSoc = Math.max(0, nextSoc - (deployRateKwh / 3600) * 2.0);
  }

  return {
    socPct: parseFloat(nextSoc.toFixed(1)),
    harvestRateKwh: parseFloat(harvestRateKwh.toFixed(1)),
    deployRateKwh: parseFloat(deployRateKwh.toFixed(1)),
    status: deployBoost ? 'BOOST_DEPLOYING' : (isRegenBraking ? 'REGEN_HARVESTING' : 'IDLE'),
  };
};

export default modelEnergyRecovery;
