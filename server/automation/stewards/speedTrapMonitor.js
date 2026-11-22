/**
 * Pit Lane Speed Trap Monitor & Penalty Assessor
 * Detects pit lane speeding violations above the 60 km/h or 80 km/h FIA limit.
 */

export const monitorSpeedTrap = (measuredSpeedKmh, speedLimitKmh = 60) => {
  const deltaKmh = measuredSpeedKmh - speedLimitKmh;
  const isSpeeding = deltaKmh > 0.5;

  let penalty = 'NO_INFRACTION';
  let fineEur = 0;

  if (isSpeeding) {
    if (deltaKmh < 5) {
      penalty = 'OFFICIAL_REPRIMAND';
      fineEur = 250;
    } else if (deltaKmh < 15) {
      penalty = '5_SECOND_PIT_STOP_PENALTY';
      fineEur = 1000;
    } else {
      penalty = 'DRIVE_THROUGH_PENALTY';
      fineEur = 2500;
    }
  }

  return {
    measuredSpeedKmh,
    speedLimitKmh,
    deltaKmh: parseFloat(deltaKmh.toFixed(1)),
    isSpeeding,
    penalty,
    fineEur,
    timestamp: new Date().toISOString(),
  };
};

export default monitorSpeedTrap;
