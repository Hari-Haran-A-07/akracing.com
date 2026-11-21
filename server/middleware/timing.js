/**
 * Server-Timing Header Middleware
 * Injects W3C Server-Timing headers for observability across database and microservice queries.
 */

export const serverTiming = (req, res, next) => {
  const start = process.hrtime();
  const metrics = [];

  req.addServerTiming = (name, durationMs, description = '') => {
    metrics.push(\;dur=\;desc=\"\\");
  };

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const totalMs = seconds * 1000 + nanoseconds / 1000000;
    metrics.push(	otal;dur=\;desc=\"Total Request Time\");
    res.setHeader('Server-Timing', metrics.join(', '));
  });

  next();
};

export default serverTiming;
