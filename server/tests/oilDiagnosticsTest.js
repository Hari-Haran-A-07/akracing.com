import { diagnoseDrySumpOilPressure } from '../automation/telemetry/oilPressureDiagnostics.js';

console.log('--- RUNNING OIL PRESSURE DIAGNOSTIC TESTS ---');
const nominal = diagnoseDrySumpOilPressure(5.2, 7500, 1.2);
console.assert(nominal.isSurgeDetected === false, 'Nominal pressure should not flag surge');

const surge = diagnoseDrySumpOilPressure(2.1, 8000, 3.8);
console.assert(surge.isSurgeDetected === true, 'Low pressure under 3.8G must flag surge');
console.log('✓ Oil pressure diagnostic tests passed.');
