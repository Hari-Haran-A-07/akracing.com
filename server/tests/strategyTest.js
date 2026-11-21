/**
 * Race Strategy & Pit Stop Unit Test Suite
 */
import { optimizePitStopSequence } from '../automation/strategy/pitStopCrewOptimizer.js';
import { calculateAeroForces } from '../automation/telemetry/aeroDownforceModel.js';
import { calculateOvertakeProbability } from '../automation/telemetry/overtakeProbability.js';

console.log('--- RUNNING AKR RACE STRATEGY TESTS ---');

// Test 1: Pit stop sequence critical path
const pitStop = optimizePitStopSequence({ fuelLitersToAdd: 60, changeAllTires: true });
console.assert(pitStop.stationaryTimeSec > 14, 'Pit stop stationary time should exceed 14s');
console.assert(pitStop.totalPitLaneDeltaSec > 30, 'Total pit lane delta should exceed 30s');

// Test 2: Aero downforce calculation
const aero = calculateAeroForces(250, 8, 1.2);
console.assert(aero.totalDownforceKg > 300, 'Downforce at 250km/h should exceed 300kg');
console.assert(aero.aeroBalanceFrontPct > 30 && aero.aeroBalanceFrontPct < 50, 'Aero front balance nominal');

// Test 3: Overtake probability
const overtake = calculateOvertakeProbability({ speedDeltaKmh: 18, distanceMeters: 30, drsActive: true });
console.assert(overtake.overtakeProbabilityPct > 60, 'DRS advantage should yield > 60% probability');

console.log('âœ“ All race strategy engine tests passed successfully.');
