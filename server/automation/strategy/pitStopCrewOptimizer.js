/**
 * Pit Stop Crew Task Scheduling Optimizer
 * Allocates simultaneous pit crew roles (front/rear wheel guns, fuel bowser, lollipop director).
 */

export const optimizePitStopSequence = ({
  fuelLitersToAdd = 45,
  changeAllTires = true,
  adjustFrontWingClicks = 2,
}) => {
  // Parallel task durations in seconds
  const tireChangeTimeSec = changeAllTires ? 14.5 : 0;
  const refuelingRateLitersPerSec = 2.8;
  const refuelingTimeSec = parseFloat((fuelLitersToAdd / refuelingRateLitersPerSec).toFixed(1));
  const wingAdjustmentTimeSec = adjustFrontWingClicks > 0 ? 3.0 : 0;

  // The critical path is dominated by either tire change or fueling
  const stationaryTimeSec = Math.max(tireChangeTimeSec, refuelingTimeSec);
  const totalPitLaneDeltaSec = stationaryTimeSec + 22.0; // 22s pit lane speed limiter transit

  return {
    stationaryTimeSec,
    totalPitLaneDeltaSec,
    criticalPath: refuelingTimeSec > tireChangeTimeSec ? 'REFUELING' : 'TIRE_CHANGE',
    crewAllocations: [
      { role: 'Left Front Gunner', task: 'Tire swap FL', duration: 12.0 },
      { role: 'Right Front Gunner', task: 'Tire swap FR + Wing click', duration: 13.5 },
      { role: 'Left Rear Gunner', task: 'Tire swap RL', duration: 12.5 },
      { role: 'Right Rear Gunner', task: 'Tire swap RR', duration: 13.0 },
      { role: 'Fuel Bowser', task: Inject \L fuel, duration: refuelingTimeSec },
      { role: 'Lollipop Controller', task: 'Traffic release clearance', duration: stationaryTimeSec },
    ],
  };
};

export default optimizePitStopSequence;
