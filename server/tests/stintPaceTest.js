import { planStintPace } from '../automation/strategy/stintPacePlanner.js';

console.log('--- RUNNING STINT PACE TESTS ---');
const plan = planStintPace(20, 100.0, 0.1);
console.assert(plan.targetLaps === 20, 'Target laps must equal 20');
console.assert(plan.endOfStintPaceSec > 100.0, 'End pace must reflect tire wear');
console.log('✓ Stint pace planner tests passed.');
