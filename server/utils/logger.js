// Structured logging utility for AKR Motorsport API

const LOG_LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const currentLevel = LOG_LEVELS[process.env.LOG_LEVEL] ?? LOG_LEVELS.info;

const formatTimestamp = () => new Date().toISOString();

const colorize = (level) => {
  const colors = { error: '\x1b[31m', warn: '\x1b[33m', info: '\x1b[36m', debug: '\x1b[90m' };
  return (colors[level] || '') + level.toUpperCase() + '\x1b[0m';
};

const log = (level, message, meta = {}) => {
  if (LOG_LEVELS[level] > currentLevel) return;

  const entry = {
    timestamp: formatTimestamp(),
    level,
    service: 'akr-api',
    message,
    ...meta,
  };

  if (process.env.NODE_ENV === 'production') {
    console[level === 'error' ? 'error' : 'log'](JSON.stringify(entry));
  } else {
    const metaStr = Object.keys(meta).length ? ' ' + JSON.stringify(meta) : '';
    console[level === 'error' ? 'error' : 'log'](
      '[' + formatTimestamp() + '] ' + colorize(level) + ' [AKR] ' + message + metaStr
    );
  }
};

const logger = {
  error: (msg, meta) => log('error', msg, meta),
  warn: (msg, meta) => log('warn', msg, meta),
  info: (msg, meta) => log('info', msg, meta),
  debug: (msg, meta) => log('debug', msg, meta),
};

export default logger;
