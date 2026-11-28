/**
 * Ajith Kumar Racing - Carbon Ceramic Brake Disc Fatigue & Thickness Tracker
 */
export class BrakeDiscWearTracker {
    constructor(initialThicknessMm = 35.0, minThicknessMm = 32.0) {
        this.currentThicknessMm = initialThicknessMm;
        this.minThicknessMm = minThicknessMm;
        this.thermalCyclesOver800C = 0;
    }

    logStintBraking(heavyBrakingEvents, avgPeakTempC) {
        const wearIncrementMm = heavyBrakingEvents * 0.00045;
        if (avgPeakTempC > 800) {
            this.thermalCyclesOver800C += Math.round(heavyBrakingEvents * 0.3);
        }

        this.currentThicknessMm = Math.max(this.minThicknessMm - 0.5, this.currentThicknessMm - wearIncrementMm);

        const remainingPct = ((this.currentThicknessMm - this.minThicknessMm) / (35.0 - this.minThicknessMm)) * 100;

        return {
            currentThicknessMm: parseFloat(this.currentThicknessMm.toFixed(3)),
            remainingPct: parseFloat(Math.max(0, remainingPct).toFixed(1)),
            thermalCyclesOver800C: this.thermalCyclesOver800C,
            serviceStatus: remainingPct < 15 ? 'REPLACE_ROTOR_BEFORE_NEXT_STINT' : 'HEALTHY'
        };
    }
}
