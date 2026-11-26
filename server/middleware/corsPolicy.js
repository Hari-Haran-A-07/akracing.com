/**
 * Granular Dynamic CORS Policy Middleware
 */
const allowedOrigins = [
  /^https?:\/\/localhost(:\d+)?$/,
  /^https:\/\/(www\.)?ajithkumarracing\.com$/,
  /^https:\/\/.*\.akracing\.com$/,
];

export const dynamicCorsPolicy = (req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.some((regex) => regex.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key, X-Request-ID');
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
};

export default dynamicCorsPolicy;
