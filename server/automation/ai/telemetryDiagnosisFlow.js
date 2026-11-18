/**
 * Automated Vehicle Telemetry Anomaly Diagnosis Flow
 * Utilizes Vertex AI tabular anomaly detection heuristics to flag sub-surface mechanical degradation.
 */
export const diagnoseTelemetryAnomaly = (telemetryFrame) => {
  const diagnostics = [];
  let severityScore = 0; // 0 (nominal) to 100 (critical)

  const {
    waterTemp = 92,
    oilTemp = 105,
    boostPressure = 1.85,
    rpm = 8400,
    downforceFrontKg = 310
  } = telemetryFrame;

  if (waterTemp > 108) {
    diagnostics.push({
      component: 'COOLING_SYSTEM',
      issue: 'Engine water jacket temperature above operating ceiling',
      recommendation: 'Instruct driver to pull out of slipstream for clean cooling air.',
      severity: 'WARNING'
    });
    severityScore += 35;
  }

  if (boostPressure < 1.65 && rpm > 7000) {
    diagnostics.push({
      component: 'TURBO_CHARGER',
      issue: 'Wastegate pressure leak detected under full throttle load',
      recommendation: 'Switch engine map to Map 3 (Rich/Conservative spool).',
      severity: 'CRITICAL'
    });
    severityScore += 50;
  }

  return {
    status: diagnostics.length === 0 ? 'HEALTHY' : 'ANOMALY_DETECTED',
    severityScore: Math.min(severityScore, 100),
    anomalyCount: diagnostics.length,
    diagnostics,
    inspectedAt: new Date().toISOString()
  };
};

export default diagnoseTelemetryAnomaly;
