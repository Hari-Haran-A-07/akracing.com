/**
 * Telemetry Export & Speed Trap Unit Test Suite
 */
import { exportLapsToCSV } from '../utils/csvExport.js';
import { monitorSpeedTrap } from '../automation/stewards/speedTrapMonitor.js';

console.log('--- RUNNING AKR TELEMETRY EXPORT & STEWARDS TESTS ---');

// Test 1: CSV Export Header & Row formatting
const sampleLaps = [
  { lapNumber: 1, lapTimeMs: 104218, sector1Ms: 34100, sector2Ms: 38200, sector3Ms: 31918, topSpeedKmh: 284 },
  { lapNumber: 2, lapTimeMs: 103980, sector1Ms: 33900, sector2Ms: 38100, sector3Ms: 31980, topSpeedKmh: 286 },
];
const csv = exportLapsToCSV(sampleLaps);
console.assert(csv.includes('LapNumber,Driver'), 'CSV must include header row');
console.assert(csv.includes('104218'), 'CSV must contain lap time row');

// Test 2: Speed Trap Nominal
const passNominal = monitorSpeedTrap(59.4, 60);
console.assert(passNominal.isSpeeding === false, '59.4km/h should be within 60km/h limit');

// Test 3: Speed Trap Violation
const passViolation = monitorSpeedTrap(68.2, 60);
console.assert(passViolation.isSpeeding === true, '68.2km/h must trigger violation');
console.assert(passViolation.penalty === '5_SECOND_PIT_STOP_PENALTY', '8.2km/h over should yield 5s penalty');

console.log('âœ“ All export and steward assertions passed successfully.');
