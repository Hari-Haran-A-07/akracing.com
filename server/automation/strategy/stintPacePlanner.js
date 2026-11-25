/**
 * Stint Pace Planner & Lap Target Calculator
 * Balances tire degradation slope against lap time target to achieve minimum total race duration.
 */
export const planStintPace = (targetLaps = 28, basePaceSec = 104.2, tireDegradePerLapSec = 0.08) => {
  const projectedLapTimes = [];
  let totalStintTimeSec = 0;

  for (let lap = 1; lap <= targetLaps; lap++) {
    const projectedLap = basePaceSec + (lap - 1) * tireDegradePerLapSec;
    projectedLapTimes.push(parseFloat(projectedLap.toFixed(3)));
    totalStintTimeSec += projectedLap;
  }

  return {
    targetLaps,
    averagePaceSec: parseFloat((totalStintTimeSec / targetLaps).toFixed(3)),
    totalStintTimeSec: parseFloat(totalStintTimeSec.toFixed(2)),
    endOfStintPaceSec: projectedLapTimes[projectedLapTimes.length - 1],
  };
};

export default planStintPace;
