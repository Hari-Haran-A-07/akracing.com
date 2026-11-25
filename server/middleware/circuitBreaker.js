/**
 * Microservice Resilience Circuit Breaker Middleware
 * Protects platform against lagging remote telemetry endpoints with auto-recovery trip states.
 */
class CircuitBreaker {
  constructor(failureThreshold = 5, recoveryTimeoutMs = 15000) {
    this.failureThreshold = failureThreshold;
    this.recoveryTimeoutMs = recoveryTimeoutMs;
    this.failures = 0;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }

  recordSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  recordFailure() {
    this.failures++;
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.recoveryTimeoutMs;
    }
  }

  canExecute() {
    if (this.state === 'CLOSED') return true;
    if (this.state === 'OPEN' && Date.now() >= this.nextAttempt) {
      this.state = 'HALF_OPEN';
      return true;
    }
    return false;
  }
}

export const defaultCircuitBreaker = new CircuitBreaker();
export default defaultCircuitBreaker;
