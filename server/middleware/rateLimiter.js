// Rate limiting configuration for AKR API endpoints
const rateLimitStore = new Map();

export const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    maxRequests = 100,
    message = 'Too many requests from this IP, please try again later.',
  } = options;

  return (req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;

    if (!rateLimitStore.has(clientIp)) {
      rateLimitStore.set(clientIp, []);
    }

    const requests = rateLimitStore.get(clientIp).filter((t) => t > windowStart);
    rateLimitStore.set(clientIp, requests);

    if (requests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message,
        retryAfter: Math.ceil(windowMs / 1000),
      });
    }

    requests.push(now);
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', maxRequests - requests.length);
    next();
  };
};

// Cleanup stale entries every 30 minutes
setInterval(() => {
  const cutoff = Date.now() - 30 * 60 * 1000;
  for (const [ip, times] of rateLimitStore.entries()) {
    const filtered = times.filter((t) => t > cutoff);
    if (filtered.length === 0) rateLimitStore.delete(ip);
    else rateLimitStore.set(ip, filtered);
  }
}, 30 * 60 * 1000);
