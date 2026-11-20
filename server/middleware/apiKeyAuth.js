/**
 * API Key Authentication Middleware
 * Secures high-throughput telemetry ingestion endpoints from on-board hardware transponders.
 */
export const requireApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  const configuredKeys = (process.env.TELEMETRY_API_KEYS || 'akr-transponder-key-2026,akr-partner-key-gt3').split(',');

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Missing required X-API-Key header',
    });
  }

  if (!configuredKeys.includes(apiKey.trim())) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Invalid API key credentials',
    });
  }

  req.apiClient = {
    key: apiKey.slice(0, 8) + '...',
    authenticatedAt: new Date().toISOString(),
  };

  next();
};

export default requireApiKey;
