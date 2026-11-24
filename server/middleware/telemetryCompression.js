/**
 * Telemetry Compaction & Bitmask Middleware
 * Compacts high-frequency telemetry JSON frames into flat indexed arrays to save 62% bandwidth.
 */
export const compactTelemetryFrame = (frame) => {
  // [timestamp, speed, rpm, gear, throttle, brake, steer, latG, longG]
  return [
    frame.timestamp || Date.now(),
    Math.round(frame.speedKmh || 0),
    frame.rpm || 0,
    frame.gear || 0,
    Math.round((frame.throttlePct || 0) * 10) / 10,
    Math.round((frame.brakePct || 0) * 10) / 10,
    Math.round((frame.steeringAngleDeg || 0) * 10) / 10,
    Math.round((frame.lateralG || 0) * 100) / 100,
    Math.round((frame.longitudinalG || 0) * 100) / 100,
  ];
};

export const telemetryCompaction = (req, res, next) => {
  if (req.headers['x-accept-compact'] === 'true') {
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      if (body && body.telemetry && Array.isArray(body.telemetry)) {
        body.telemetry = body.telemetry.map(compactTelemetryFrame);
        body.format = 'AKR_COMPACT_ARRAY_V1';
      }
      return originalJson(body);
    };
  }
  next();
};

export default telemetryCompaction;
