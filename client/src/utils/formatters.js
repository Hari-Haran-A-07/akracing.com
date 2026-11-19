/**
 * Formatting Utilities for AKR Motorsport Platform
 */

// Formats milliseconds into racing lap time format 'm:ss.SSS'
export const formatLapTime = (timeMs) => {
  if (!timeMs || typeof timeMs !== 'number') return '--:--.---';
  const minutes = Math.floor(timeMs / 60000);
  const seconds = Math.floor((timeMs % 60000) / 1000);
  const millis = timeMs % 1000;
  return \:\.\;
};

// Formats speed in km/h or mph
export const formatSpeed = (speedKmh, unit = 'km/h') => {
  if (typeof speedKmh !== 'number') return '0 ' + unit;
  if (unit === 'mph') {
    return \ mph;
  }
  return \ km/h;
};

// Formats currency with motorsport precision
export const formatCurrency = (amount, currency = 'EUR', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Formats delta times with + / - prefixes
export const formatDelta = (deltaSec) => {
  if (typeof deltaSec !== 'number') return '0.000';
  const sign = deltaSec > 0 ? '+' : '';
  return \\s;
};

// Compact number formatting (e.g., 14.5k)
export const formatCompactNumber = (number) => {
  return new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(number);
};
