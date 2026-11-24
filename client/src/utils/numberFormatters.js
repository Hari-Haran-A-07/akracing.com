/**
 * Engineering and Telemetry Number Formatting Helpers
 */

export const formatFrequency = (hz) => {
  if (hz >= 1000) return \ kHz;
  return \ Hz;
};

export const formatPressure = (bar, targetUnit = 'bar') => {
  if (targetUnit === 'psi') {
    return \ PSI;
  }
  return \ Bar;
};

export const formatPower = (bhp, targetUnit = 'bhp') => {
  if (targetUnit === 'kw') {
    return \ kW;
  }
  return \ BHP;
};

export const formatTorque = (nm, targetUnit = 'nm') => {
  if (targetUnit === 'lbft') {
    return \ lb-ft;
  }
  return \ Nm;
};

export default { formatFrequency, formatPressure, formatPower, formatTorque };
