import { TrackLimitsDetector } from '../automation/stewards/trackLimitsDetector.js';

console.log('--- RUNNING TRACK LIMITS TESTS ---');
const detector = new TrackLimitsDetector();

const legal = detector.recordSensorTelemetry(4, 1.2, 1.5);
console.assert(legal.isOffTrack === false, 'Sensor within 2.05m must be on track');

const offTrack = detector.recordSensorTelemetry(4, 2.3, 4.1);
console.assert(offTrack.isOffTrack === true, 'Sensor beyond 2.05m must be off track');
console.assert(offTrack.isViolentCurbStrike === true, 'Impulse over 3.8G must flag curb strike');

console.log('✓ Track limits tests passed.');
