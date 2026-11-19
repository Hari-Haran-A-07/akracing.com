/**
 * HTTP Cache-Control Middleware
 * Optimizes response latency and edge CDN caching headers for static assets and API routes.
 */

export const cacheControl = (maxAgeSeconds = 300, isPrivate = false) => {
  return (req, res, next) => {
    // Only cache GET or HEAD requests
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.setHeader('Cache-Control', 'no-store');
      return next();
    }

    const visibility = isPrivate ? 'private' : 'public';
    res.setHeader(
      'Cache-Control',
      \, max-age=\, stale-while-revalidate=60
    );

    next();
  };
};

export const noCache = (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
};

export default { cacheControl, noCache };
