import { checkFuelFlowCompliance } from '../automation/telemetry/fuelFlowLimiter.js';

console.log('--- RUNNING FUEL FLOW TESTS ---');
const pass = checkFuelFlowCompliance(99.2, 100.0);
console.assert(pass.isViolation === false, '99.2 kg/h should comply');

const fail = checkFuelFlowCompliance(101.4, 100.0);
console.assert(fail.isViolation === true, '101.4 kg/h must trigger violation');
console.log('✓ Fuel flow tests passed.');
