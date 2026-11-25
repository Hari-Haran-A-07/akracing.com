import { estimateTrackDryingMinutes } from '../automation/weather/trackSurfaceDryingModel.js';

console.log('--- RUNNING TRACK DRYING TESTS ---');
const drying = estimateTrackDryingMinutes(2.0, 25, 20);
console.assert(drying.minutesToDry > 0, 'Drying duration must be positive');
console.assert(drying.slickCrossoverMinute < drying.minutesToDry, 'Crossover must occur before dry track');
console.log('✓ Track drying tests passed.');
