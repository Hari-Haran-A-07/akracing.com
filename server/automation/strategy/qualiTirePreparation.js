/**
 * Qualifying Out-Lap Tire Thermal Preparation Model
 * Models tire core vs surface temperature heating on the warm-up lap.
 */
export const calculateQualiTirePrep = (outLapSpeedKmh = 140, weavingIntensity = 3, targetTempC = 90) => {
  const currentTempC = 55 + (outLapSpeedKmh / 20) + (weavingIntensity * 7.5);
  const tempDelta = targetTempC - currentTempC;
  const isReadyForFlyingLap = Math.abs(tempDelta) <= 4;

  return {
    estimatedSurfaceTempC: parseFloat(currentTempC.toFixed(1)),
    targetTempC,
    tempDelta: parseFloat(tempDelta.toFixed(1)),
    isReadyForFlyingLap,
    driverInstruction: isReadyForFlyingLap
      ? 'TIRES IN OPTIMAL WINDOW - PUSH TO START FLYING LAP'
      : (tempDelta > 0 ? 'INCREASE WEAVING IN SECTOR 3 TO BUILD REAR CORE TEMP' : 'OVERHEATED - ROLL OFF APEXES'),
  };
};

export default calculateQualiTirePrep;
