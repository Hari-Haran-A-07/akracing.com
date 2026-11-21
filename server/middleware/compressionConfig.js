/**
 * Payload Compression & Gzip Configuration
 * Configures thresholds and filtering for high-volume API responses.
 */

export const compressionFilter = (req, res) => {
  if (req.headers['x-no-compression']) {
    return false;
  }
  // Do not compress Server-Sent Events (SSE) live streams
  if (res.getHeader('Content-Type') === 'text/event-stream') {
    return false;
  }
  return true;
};

export const compressionConfig = {
  level: 6,
  threshold: 1024, // only compress responses above 1KB
  filter: compressionFilter,
};

export default compressionConfig;
