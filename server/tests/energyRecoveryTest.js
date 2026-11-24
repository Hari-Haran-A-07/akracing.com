/**
 * Energy Recovery & ERS Unit Tests
 */
import { modelEnergyRecovery } from '../automation/telemetry/energyRecoveryModel.js';

console.log('--- RUNNING ERS & REGEN UNIT TESTS ---');

// Test 1: Heavy braking harvest
const harvest = modelEnergyRecovery(50, 75, 240, false);
console.assert(harvest.socPct > 50, 'Regen braking should increase battery SOC');
console.assert(harvest.status === 'REGEN_HARVESTING', 'Status must be REGEN_HARVESTING');

// Test 2: Boost deployment
const deploy = modelEnergyRecovery(50, 0, 200, true);
console.assert(deploy.socPct < 50, 'Electric boost deployment should decrease battery SOC');
console.assert(deploy.status === 'BOOST_DEPLOYING', 'Status must be BOOST_DEPLOYING');

console.log('✓ Energy recovery & ERS tests passed.');
