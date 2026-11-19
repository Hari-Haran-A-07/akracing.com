/**
 * Telemetry Ingestion Frame Validator
 * Ensures incoming 100Hz telemetry packets conform to GT3 sensor boundaries.
 */

export const validateTelemetryFrame = (frame) => {
  const errors = [];

  if (!frame || typeof frame !== 'object') {
    return { valid: false, errors: ['Frame payload must be an object'] };
  }

  // Speed bounds (0 to 360 km/h)
  if (typeof frame.speedKmh !== 'number' || frame.speedKmh < 0 || frame.speedKmh > 360) {
    errors.push('speedKmh must be a number between 0 and 360');
  }

  // Engine RPM (0 to 9500)
  if (typeof frame.rpm !== 'number' || frame.rpm < 0 || frame.rpm > 9500) {
    errors.push('rpm must be a number between 0 and 9500');
  }

  // Gear (-1 for R, 0 for N, 1-6)
  if (typeof frame.gear !== 'number' || frame.gear < -1 || frame.gear > 6) {
    errors.push('gear must be an integer between -1 and 6');
  }

  // Throttle & Brake (0 to 100%)
  if (typeof frame.throttlePct !== 'number' || frame.throttlePct < 0 || frame.throttlePct > 100) {
    errors.push('throttlePct must be between 0 and 100');
  }
  if (typeof frame.brakePct !== 'number' || frame.brakePct < 0 || frame.brakePct > 100) {
    errors.push('brakePct must be between 0 and 100');
  }

  // G-Force limits (-5.0 to +5.0)
  if (typeof frame.lateralG === 'number' && Math.abs(frame.lateralG) > 5.5) {
    errors.push('lateralG exceeds plausible limits (> 5.5G)');
  }
  if (typeof frame.longitudinalG === 'number' && Math.abs(frame.longitudinalG) > 5.5) {
    errors.push('longitudinalG exceeds plausible limits (> 5.5G)');
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitizedFrame: errors.length === 0 ? { ...frame, timestamp: frame.timestamp || Date.now() } : null,
  };
};

export default validateTelemetryFrame;
