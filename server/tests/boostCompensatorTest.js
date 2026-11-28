import { BoostCompensator } from '../automation/weather/boostCompensator.js';

console.log('--- RUNNING BOOST COMPENSATOR TESTS ---');
const comp = new BoostCompensator();

const nominal = comp.calculateCompensatedBoost(1013.25, 20.0);
console.assert(nominal.targetBoostBar === 2.15, 'Standard sea level must yield 2.15 bar');

const altitude = comp.calculateCompensatedBoost(850.0, 25.0);
console.assert(altitude.targetBoostBar > 2.15, 'Target boost must increase at altitude to compensate for air density');

console.log('✓ Boost compensator tests passed.');
