/**
 * Rate Limiting Exemption Middleware for On-Board Telemetry Transponders
 */
export const rateLimitExempt = (req, res, next) => {
  const isTransponder = req.headers['x-transponder-device'] === 'akr-onboard-m150';
  if (isTransponder) {
    req.isRateLimitExempt = true;
  }
  next();
};

export default rateLimitExempt;
