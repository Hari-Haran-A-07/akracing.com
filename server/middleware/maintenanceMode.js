/**
 * Maintenance Mode Interceptor Middleware
 * Allows graceful offline servicing of the platform while allowing paddock engineers bypass via secret header.
 */

export const maintenanceMode = (req, res, next) => {
  const isMaintenanceActive = process.env.MAINTENANCE_MODE === 'true';
  const bypassKey = req.headers['x-maintenance-bypass'];

  if (isMaintenanceActive && bypassKey !== process.env.MAINTENANCE_BYPASS_KEY) {
    return res.status(503).json({
      success: false,
      status: 'MAINTENANCE_IN_PROGRESS',
      message: 'AKR Motorsport Platform undergoing scheduled telemetry maintenance. Please check back shortly.',
      retryAfterSeconds: 300,
    });
  }

  next();
};

export default maintenanceMode;
