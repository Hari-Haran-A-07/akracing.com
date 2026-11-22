/**
 * Telemetry CSV Export Utility
 * Converts telemetry lap and sensor batches into standard CSV records for engineer export.
 */

export const exportLapsToCSV = (laps = []) => {
  const headers = ['LapNumber', 'Driver', 'LapTimeMs', 'Sector1Ms', 'Sector2Ms', 'Sector3Ms', 'TopSpeedKmh', 'FuelUsedLiters'];
  const rows = laps.map((lap) => [
    lap.lapNumber,
    lap.driver || 'Ajith Kumar',
    lap.lapTimeMs,
    lap.sector1Ms,
    lap.sector2Ms,
    lap.sector3Ms,
    lap.topSpeedKmh,
    lap.fuelUsedLiters || 3.8,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
};

export default exportLapsToCSV;
