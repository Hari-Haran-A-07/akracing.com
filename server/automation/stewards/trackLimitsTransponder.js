/**
 * GPS Track Limits Apex Cut Detection Algorithm
 */
export const auditTrackLimitsTransponder = (cornerApexGps, carGps, allowedMarginMeters = 0.15) => {
  // Distance from car coordinate to reference kerb apex
  const dx = carGps.x - cornerApexGps.x;
  const dy = carGps.y - cornerApexGps.y;
  const deviationMeters = Math.sqrt(dx * dx + dy * dy);

  const isCut = deviationMeters > allowedMarginMeters;

  return {
    deviationMeters: parseFloat(deviationMeters.toFixed(3)),
    allowedMarginMeters,
    isViolation: isCut,
    stewardAction: isCut ? 'DELETE_LAP_TIME_WARNING' : 'LEGAL_KERB_APEX',
  };
};

export default auditTrackLimitsTransponder;
