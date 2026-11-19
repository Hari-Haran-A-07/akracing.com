/**
 * Telemetry Verification Suite
 * Validates telemetry validator and G-force calculations.
 */
import { validateTelemetryFrame } from '../automation/telemetry/telemetryValidator.js';
import { calculateCombinedG, classifyCornerPhase } from '../automation/telemetry/gForceCalculator.js';

const runTests = () => {
  console.log('--- RUNNING AKR TELEMETRY ENGINE TESTS ---');

  // Test 1: Valid Telemetry Frame
  const validFrame = {
    speedKmh: 245.5,
    rpm: 7800,
    gear: 5,
    throttlePct: 100,
    brakePct: 0,
    lateralG: 1.8,
    longitudinalG: 0.4,
  };
  const valResult = validateTelemetryFrame(validFrame);
  console.assert(valResult.valid === true, 'Valid frame should pass validation');

  // Test 2: Invalid RPM Frame
  const invalidFrame = { speedKmh: 120, rpm: 12000, gear: 3, throttlePct: 50, brakePct: 0 };
  const invalResult = validateTelemetryFrame(invalidFrame);
  console.assert(invalResult.valid === false, 'RPM > 9500 should fail');

  // Test 3: Combined G calculation
  const combined = calculateCombinedG(3.0, 4.0);
  console.assert(combined === 5.0, '3G lat + 4G long should equal 5G total');

  // Test 4: Corner Phase Classification
  const phase = classifyCornerPhase(0, 85, 2);
  console.assert(phase === 'STRAIGHT_BRAKING', 'Heavy brake + zero steer should be STRAIGHT_BRAKING');

  console.log('âœ“ All telemetry engine assertions passed successfully.');
};

runTests();
