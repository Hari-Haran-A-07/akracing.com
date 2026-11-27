/**
 * Grid Transponder Jump Start Detection Algorithm
 */
export const detectJumpStart = (wheelSpeedKmh = 0, lightsOutTimestampMs, movementTimestampMs) => {
  const deltaMs = movementTimestampMs - lightsOutTimestampMs;
  const isJumpStart = deltaMs < 0 || (deltaMs < 150 && wheelSpeedKmh > 2.0);

  return {
    reactionTimeMs: deltaMs,
    isJumpStart,
    stewardAction: isJumpStart ? 'INVESTIGATION_DRIVE_THROUGH_PENALTY' : 'LEGAL_CLEAN_START',
  };
};

export default detectJumpStart;
