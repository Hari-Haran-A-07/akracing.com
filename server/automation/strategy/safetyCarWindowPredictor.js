/**
 * Safety Car Pit Window Strategy Model
 * Calculates time delta advantage of pitting during Virtual Safety Car (VSC) or Full Safety Car (SC).
 */

export const calculateSafetyCarPitAdvantage = (normalPitDeltaSec = 22.5, scPaceDeltaReductionPct = 40) => {
  // During SC/VSC, cars on track run 40% slower, so time lost in pit lane is reduced
  const effectivePitLossSec = parseFloat((normalPitDeltaSec * (1 - scPaceDeltaReductionPct / 100)).toFixed(1));
  const timeSavedSec = parseFloat((normalPitDeltaSec - effectivePitLossSec).toFixed(1));

  return {
    normalPitDeltaSec,
    effectivePitLossSec,
    timeSavedSec,
    strategyRecommendation: timeSavedSec > 7.0 ? 'CALL_BOX_IMMEDIATELY_CHEAP_STOP' : 'STAY_OUT_TRACK_POSITION_PRIORITY',
    windowCalculatedAt: new Date().toISOString(),
  };
};

export default calculateSafetyCarPitAdvantage;
