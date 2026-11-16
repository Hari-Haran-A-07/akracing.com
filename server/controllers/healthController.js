// Health check controller for monitoring and uptime verification
export const healthCheck = (req, res) => {
  const uptime = process.uptime();
  const timestamp = new Date().toISOString();

  res.status(200).json({
    success: true,
    status: 'operational',
    service: 'AKR Motorsport API',
    version: '1.0.0',
    uptime: Math.floor(uptime),
    timestamp,
    environment: process.env.NODE_ENV || 'development',
    checks: {
      server: 'healthy',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
      },
    },
  });
};

export const readiness = (req, res) => {
  res.status(200).json({
    success: true,
    ready: true,
    timestamp: new Date().toISOString(),
  });
};
