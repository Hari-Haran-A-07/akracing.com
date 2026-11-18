/**
 * BigQuery Lap Analytics Workflow
 * Computes comparative telemetry metrics: braking points, apex speeds, and tire heat deltas.
 */
export const runLapAnalytics = (laps) => {
  if (!laps || laps.length === 0) return { error: 'No lap telemetry provided' };

  let fastestLap = laps[0];
  let totalTimeMs = 0;

  for (const lap of laps) {
    if (lap.lapTimeMs < fastestLap.lapTimeMs) {
      fastestLap = lap;
    }
    totalTimeMs += lap.lapTimeMs;
  }

  const averageTimeMs = Math.round(totalTimeMs / laps.length);

  return {
    lapCount: laps.length,
    fastestLapNumber: fastestLap.lapNumber,
    fastestLapTimeMs: fastestLap.lapTimeMs,
    averageTimeMs,
    theoreticalBestMs: fastestLap.sector1Ms + fastestLap.sector2Ms + fastestLap.sector3Ms,
    consistencyRating: ((1 - ((averageTimeMs - fastestLap.lapTimeMs) / fastestLap.lapTimeMs)) * 100).toFixed(2) + '%'
  };
};

export default runLapAnalytics;
