import { CrossoverPredictor } from '../automation/strategy/crossoverPredictor.js';

console.log('--- RUNNING CROSSOVER PREDICTOR TESTS ---');
const predictor = new CrossoverPredictor();

const wetDominant = predictor.predictCrossover(40, 108.0, 95.0);
console.assert(wetDominant.boxThisLap === false, 'Should stay out on wets when track is 40% dry');

const slickDominant = predictor.predictCrossover(75, 108.0, 95.0);
console.assert(slickDominant.boxThisLap === true, 'Should box for slicks when dry line exceeds 68%');

console.log('✓ Crossover predictor tests passed.');
