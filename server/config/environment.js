// Environment configuration loader for AKR platform

const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',
  isProd: process.env.NODE_ENV === 'production',

  // Database
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/akr_motorsport',

  // Authentication
  jwtSecret: process.env.JWT_SECRET || 'akr_motorsport_super_secure_jwt_secret_2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',

  // Rate Limiting
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW, 10) || 15,
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,

  // Client
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
};

export const validateConfig = () => {
  const warnings = [];
  if (config.isProd && config.jwtSecret.includes('super_secure')) {
    warnings.push('WARNING: Using default JWT secret in production!');
  }
  if (config.isProd && !process.env.MONGODB_URI) {
    warnings.push('WARNING: No MONGODB_URI set for production environment');
  }
  warnings.forEach((w) => console.warn('[AKR Config]', w));
  return warnings.length === 0;
};

export default config;
