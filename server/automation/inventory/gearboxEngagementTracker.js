/**
 * Ajith Kumar Racing - Sequential Dog-Ring Gearbox Engagement & Shift Cut Auditor
 */
export class GearboxEngagementTracker {
    constructor() {
        this.misShiftCount = 0;
        this.dogRingLifeRemainingPct = 100.0;
    }

    recordShiftEvent(shiftCutMs, isSuccessful) {
        if (!isSuccessful || shiftCutMs < 30 || shiftCutMs > 75) {
            this.misShiftCount++;
            this.dogRingLifeRemainingPct = Math.max(0, this.dogRingLifeRemainingPct - 0.45);
        } else {
            this.dogRingLifeRemainingPct = Math.max(0, this.dogRingLifeRemainingPct - 0.008);
        }

        return {
            misShiftCount: this.misShiftCount,
            dogRingLifeRemainingPct: parseFloat(this.dogRingLifeRemainingPct.toFixed(2)),
            gearboxStatus: this.dogRingLifeRemainingPct < 25 ? 'SERVICE_RECOMMENDED' : 'OPTIMAL'
        };
    }
}
