/**
 * Starting Grid Launch & Turn 1 Bottleneck Simulator
 */
export const simulateGridLaunch = (gridPosition = 3, reactionTimeSec = 0.28, clutchBiteEfficiencyPct = 94) => {
  const launchRating = clutchBiteEfficiencyPct > 90 && reactionTimeSec < 0.32 ? 'EXCELLENT_HOLESHOT' : 'AVERAGE';
  const turn1Position = launchRating === 'EXCELLENT_HOLESHOT' ? Math.max(1, gridPosition - 1) : gridPosition;

  return {
    gridPosition,
    reactionTimeSec,
    clutchBiteEfficiencyPct,
    launchRating,
    predictedTurn1Position: turn1Position,
  };
};

export default simulateGridLaunch;
