import { TireGrainingDetector } from '../automation/telemetry/tireGrainingDetector.js';

console.log('--- RUNNING TIRE GRAINING & BLISTERING TESTS ---');
const detector = new TireGrainingDetector();

const resNominal = detector.evaluateTireCondition(95, 105, 0.02);
console.assert(resNominal.status === 'NOMINAL', 'Tire should be nominal under normal sliding');

const resBlister = detector.evaluateTireCondition(110, 130, 0.05);
console.assert(resBlister.status === 'CRITICAL_BLISTERING', 'Tire should blister over 125C core');
console.assert(resBlister.gripMultiplier < 1.0, 'Blistering must reduce grip');

console.log('✓ Tire graining and blistering tests passed.');
