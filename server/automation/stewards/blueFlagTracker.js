/**
 * FIA Blue Flag Transponder Tracking Flow
 * Detects closing deltas between lapped cars and race leaders to prevent impeding.
 */
export const evaluateBlueFlagCompliance = (gapToLeaderSec = 0.9, marshalPostsPassed = 2) => {
  const isWithinBlueFlagZone = gapToLeaderSec <= 1.2;
  let penaltyTriggered = false;

  if (isWithinBlueFlagZone && marshalPostsPassed >= 3) {
    penaltyTriggered = true;
  }

  return {
    gapToLeaderSec,
    marshalPostsPassed,
    blueFlagActive: isWithinBlueFlagZone,
    penaltyTriggered,
    directive: penaltyTriggered
      ? 'PENALTY: 5-second time penalty for ignoring 3 consecutive blue flag panels'
      : (isWithinBlueFlagZone ? 'BLUE FLAG: Yield position to approaching leader safely' : 'CLEAR'),
  };
};

export default evaluateBlueFlagCompliance;
