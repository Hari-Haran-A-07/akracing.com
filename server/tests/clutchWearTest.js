import { calculateClutchSlipHeat } from '../automation/telemetry/clutchWearModel.js';

console.log('--- RUNNING CLUTCH WEAR TESTS ---');
const nominalLaunch = calculateClutchSlipHeat(6500, 5200, 0.35);
console.assert(nominalLaunch.isOverheated === false, 'Nominal launch clutch should not overheat');

const severeSlip = calculateClutchSlipHeat(8000, 1000, 2.5);
console.assert(severeSlip.isOverheated === true, 'Excessive slip must trigger overheat condition');
console.log('✓ Clutch wear tests passed.');
