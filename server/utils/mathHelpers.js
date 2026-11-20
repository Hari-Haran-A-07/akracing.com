/**
 * Motorsport Statistical and Mathematical Utilities
 */

// Calculates mean (average) of an array of numbers
export const calculateMean = (numbers = []) => {
  if (!numbers.length) return 0;
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
};

// Calculates standard deviation (driver lap consistency metric)
export const calculateStdDev = (lapTimesMs = []) => {
  if (lapTimesMs.length <= 1) return 0;
  const mean = calculateMean(lapTimesMs);
  const variance = lapTimesMs.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (lapTimesMs.length - 1);
  return parseFloat(Math.sqrt(variance).toFixed(3));
};

// Computes exponential rolling average for smooth telemetry graphs
export const computeRollingAverage = (previousAvg, currentVal, smoothingFactor = 0.2) => {
  if (previousAvg === null || previousAvg === undefined) return currentVal;
  return parseFloat((smoothingFactor * currentVal + (1 - smoothingFactor) * previousAvg).toFixed(2));
};

// Clamp value within bounds
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export default { calculateMean, calculateStdDev, computeRollingAverage, clamp };
