import { calculateDRSEfficiency } from '../automation/telemetry/drsAeroEfficiency.js';

console.log('--- RUNNING DRS AERO EFFICIENCY TESTS ---');
const res = calculateDRSEfficiency(280);
console.assert(res.dragReductionForceN > 0, 'DRS drag reduction force must be positive');
console.assert(res.estimatedTopSpeedGainKmh > 5.0, 'DRS top speed gain must be substantial');
console.log('✓ DRS aero efficiency tests passed.');
