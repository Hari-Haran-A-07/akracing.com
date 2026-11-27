/**
 * High-Stress Component Mileage and Fatigue Lifespan Tracker
 */
const LIFESPAN_LIMITS_KM = {
  DRIVESHAFT_LEFT: 3500,
  DRIVESHAFT_RIGHT: 3500,
  BRAKE_DISC_CARBON: 1200,
  TURBOCHARGER_CORE: 5000,
  WISHBONE_FL: 7500,
};

export const checkComponentLifespan = (componentName, currentKm) => {
  const limit = LIFESPAN_LIMITS_KM[componentName] || 3000;
  const remainingKm = limit - currentKm;
  const usagePct = parseFloat(((currentKm / limit) * 100).toFixed(1));

  return {
    componentName,
    currentKm,
    limitKm: limit,
    remainingKm,
    usagePct,
    serviceRequired: remainingKm <= 200,
  };
};

export default checkComponentLifespan;
