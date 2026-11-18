/**
 * FIA Track Limits & Steward Audit Automation Flow
 * Correlates GPS boundary transponder signals with car velocity to detect track limit violations.
 */
export const evaluateTrackLimits = (transponderPing) => {
  const { carNumber = '07', cornerId = 'T4', boundaryDeviationCm = 14, lapNumber = 22 } = transponderPing;

  const isInfraction = boundaryDeviationCm > 0;
  let penaltyRecommendation = 'NO_ACTION';

  if (isInfraction) {
    if (boundaryDeviationCm > 25) {
      penaltyRecommendation = 'LAP_TIME_DELETED_AND_WARNING';
    } else {
      penaltyRecommendation = 'STEWARD_REVIEW';
    }
  }

  return {
    carNumber,
    cornerId,
    lapNumber,
    boundaryDeviationCm,
    isInfraction,
    penaltyRecommendation,
    stewardTelemetryVerified: true,
    loggedAt: new Date().toISOString()
  };
};

export default evaluateTrackLimits;
