/**
 * Dry-Sump Multi-Stage Scavenge Oil Pressure Diagnostic Monitor
 */
export const diagnoseDrySumpOilPressure = (oilPressureBar = 4.8, engineRpm = 7800, lateralG = 3.2) => {
  // Sustained high G turns can cause oil surge
  const minRequiredPressureBar = 1.5 + (engineRpm / 2000);
  const isSurgeDetected = oilPressureBar < minRequiredPressureBar && Math.abs(lateralG) > 2.5;

  return {
    oilPressureBar,
    minRequiredPressureBar: parseFloat(minRequiredPressureBar.toFixed(2)),
    isSurgeDetected,
    status: isSurgeDetected ? 'CRITICAL_OIL_SURGE_DETECTED' : 'NOMINAL_SCAVENGE_PRESSURE',
    scavengeEfficiencyPct: isSurgeDetected ? 74.0 : 99.2,
  };
};

export default diagnoseDrySumpOilPressure;
