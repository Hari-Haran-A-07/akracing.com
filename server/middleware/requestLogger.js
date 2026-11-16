// Request logging middleware for API monitoring
const colors = {
  GET: '\x1b[32m',
  POST: '\x1b[33m',
  PUT: '\x1b[34m',
  DELETE: '\x1b[31m',
  PATCH: '\x1b[35m',
  reset: '\x1b[0m',
};

export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const method = req.method;
  const url = req.originalUrl;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const color = colors[method] || colors.reset;
    const statusColor = status >= 400 ? '\x1b[31m' : '\x1b[32m';

    console.log(
      [AKR]    - ms
    );
  });

  next();
};
