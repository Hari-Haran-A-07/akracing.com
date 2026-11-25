import defaultCircuitBreaker from '../middleware/circuitBreaker.js';

console.log('--- RUNNING CIRCUIT BREAKER TESTS ---');
console.assert(defaultCircuitBreaker.canExecute() === true, 'Initial circuit breaker state must allow execution');
defaultCircuitBreaker.recordFailure();
defaultCircuitBreaker.recordSuccess();
console.assert(defaultCircuitBreaker.state === 'CLOSED', 'Successful call must reset state to CLOSED');
console.log('✓ Circuit breaker resilience tests passed.');
