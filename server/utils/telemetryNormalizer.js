/**
 * Telemetry Stream Normalizer
 * Ingests divergent logger outputs (MoTeC, Bosch Motorsport, Cosworth) into unified AKR telemetry format.
 */
export const normalizeTelemetryFrame = (rawFrame, loggerBrand = 'MOTEC') => {
  if (loggerBrand === 'BOSCH') {
    return {
      speedKmh: rawFrame.v_wheel || 0,
      rpm: rawFrame.nmot || 0,
      gear: rawFrame.gear_act || 0,
      throttlePct: (rawFrame.ath || 0) * 100,
      brakePct: (rawFrame.p_brake_f || 0) * 0.8,
    };
  }

  // Default MoTeC M150 normalization
  return {
    speedKmh: rawFrame.Ground_Speed || rawFrame.speedKmh || 0,
    rpm: rawFrame.Engine_RPM || rawFrame.rpm || 0,
    gear: rawFrame.Gear || rawFrame.gear || 0,
    throttlePct: rawFrame.Throttle_Pos || rawFrame.throttlePct || 0,
    brakePct: rawFrame.Brake_Press_F || rawFrame.brakePct || 0,
  };
};

export default normalizeTelemetryFrame;
