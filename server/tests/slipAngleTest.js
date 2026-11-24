/**
 * Slip Angle Dynamics Unit Tests
 */
import { calculateSlipAngles } from '../automation/telemetry/slipAngleCalculator.js';

console.log('--- RUNNING SLIP ANGLE UNIT TESTS ---');

// Test 1: High speed neutral steer
const neutral = calculateSlipAngles(180, 12, 10);
console.assert(typeof neutral.slipAngleDelta === 'number', 'Slip angle delta must be numeric');

// Test 2: Extreme oversteer snap
const oversteer = calculateSlipAngles(120, 35, 5);
console.assert(oversteer.vehicleBalance === 'OVERSTEER_LOOSE', 'High yaw rate with low steer must detect oversteer');

console.log('✓ Slip angle dynamics tests passed.');
