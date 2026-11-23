/**
 * Undercut vs Overcut Strategy Delta Calculator
 * Computes exact gap needed to jump a rival car during pit stop sequences.
 */
export const calculateUndercutDelta = (gapToCarAheadSec = 2.4, outLapAdvantageSec = 1.8, pitDeltaSec = 22.0) => {
  const netDelta = outLapAdvantageSec - gapToCarAheadSec;
  const isUndercutViable = netDelta > 0.3;

  return {
    gapToCarAheadSec,
    outLapAdvantageSec,
    netAdvantageSec: parseFloat(netDelta.toFixed(2)),
    isUndercutViable,
    callOrder: isUndercutViable ? 'BOX_THIS_LAP_EXECUTE_UNDERCUT' : 'STAY_OUT_BUILD_TIRE_DELTA',
  };
};

export default calculateUndercutDelta;
