/**
 * Monte Carlo Pit Strategy Unit Tests
 */
import { runMonteCarloStintSimulation } from '../automation/strategy/monteCarloSimulator.js';
import { calculateUndercutDelta } from '../automation/strategy/undercutCalculator.js';

console.log('--- RUNNING MONTE CARLO STRATEGY TESTS ---');

// Test 1: Monte Carlo run
const result = runMonteCarloStintSimulation(2, 50, 500);
console.assert(result.iterations === 500, 'Must run 500 iterations');
console.assert(result.podiumProbabilityPct > 0, 'Podium probability must be positive');

// Test 2: Undercut viable
const underViable = calculateUndercutDelta(1.2, 1.8);
console.assert(underViable.isUndercutViable === true, '1.8s out-lap should undercut 1.2s gap');

console.log('✓ Monte Carlo and undercut strategy tests passed.');
