/**
 * G-Force & Friction Circle Vector Calculator
 * Computes combined traction force, lateral grip utilization, and trail-braking vectors.
 */

export const calculateCombinedG = (lateralG = 0, longitudinalG = 0) => {
  const combined = Math.sqrt(Math.pow(lateralG, 2) + Math.pow(longitudinalG, 2));
  return parseFloat(combined.toFixed(3));
};

export const calculateTractionGripUsage = (lateralG = 0, longitudinalG = 0, maxTireG = 3.8) => {
  const combined = calculateCombinedG(lateralG, longitudinalG);
  const percentage = Math.min(100, (combined / maxTireG) * 100);
  return {
    combinedG: combined,
    maxTireG,
    gripUsagePercentage: parseFloat(percentage.toFixed(1)),
    isOverLimit: combined > maxTireG,
  };
};

export const classifyCornerPhase = (throttlePct, brakePct, steeringAngleDeg) => {
  if (brakePct > 20 && Math.abs(steeringAngleDeg) < 5) return 'STRAIGHT_BRAKING';
  if (brakePct > 10 && Math.abs(steeringAngleDeg) >= 5) return 'TRAIL_BRAKING';
  if (brakePct < 5 && throttlePct < 15 && Math.abs(steeringAngleDeg) >= 10) return 'APEX_ROLLING';
  if (throttlePct > 20 && Math.abs(steeringAngleDeg) >= 5) return 'CORNER_EXIT';
  return 'STRAIGHT_ACCELERATION';
};

export default { calculateCombinedG, calculateTractionGripUsage, classifyCornerPhase };
