/**
 * Virtual Safety Car (VSC) Speed Buffer & Delta Adherence Calculator
 */
export const calculateVSCBuffer = (currentSectorTimeSec = 32.4, targetVscTimeSec = 36.8) => {
  const deltaSec = parseFloat((currentSectorTimeSec - targetVscTimeSec).toFixed(3));
  // Driver must stay positive (slower than target)
  const isDeltaInfraction = deltaSec < -0.1;

  return {
    currentSectorTimeSec,
    targetVscTimeSec,
    deltaSec,
    isDeltaInfraction,
    recommendedAction: isDeltaInfraction ? 'LIFT_IMMEDIATELY_NEGATIVE_DELTA' : 'DELTA_POSITIVE_MAINTAIN_PACE',
  };
};

export default calculateVSCBuffer;
