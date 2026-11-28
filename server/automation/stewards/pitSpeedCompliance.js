/**
 * Ajith Kumar Racing - Pit Speed Limiter & Unsafe Release Auditor
 */
export class PitSpeedAuditor {
    constructor(limitKmh = 60.0) {
        this.pitLimitKmh = limitKmh;
    }

    verifySpeed(currentSpeedKmh) {
        const delta = currentSpeedKmh - this.pitLimitKmh;
        const speeding = delta > 0.5; // 0.5 km/h tolerance margin

        return {
            speedKmh: currentSpeedKmh,
            limitKmh: this.pitLimitKmh,
            deltaKmh: parseFloat(delta.toFixed(1)),
            compliant: !speeding,
            verdict: speeding ? 'DRIVE_THROUGH_PENALTY_SPEEDING' : 'LEGAL'
        };
    }

    evaluateReleaseSafety(incomingCarGapMeters, incomingCarSpeedKmh) {
        const timeToBoxSec = incomingCarGapMeters / (incomingCarSpeedKmh / 3.6);
        const isUnsafe = timeToBoxSec < 2.5;

        return {
            incomingCarGapMeters,
            timeToArrivalSec: parseFloat(timeToBoxSec.toFixed(2)),
            releaseApproved: !isUnsafe,
            verdict: isUnsafe ? 'HOLD_CAR_UNSAFE_RELEASE' : 'CLEAR_TO_RELEASE'
        };
    }
}
