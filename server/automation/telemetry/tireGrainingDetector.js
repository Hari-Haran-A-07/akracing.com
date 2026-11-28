/**
 * Ajith Kumar Racing - Real-time Tire Graining & Thermal Blistering Detector
 * Analyzes the delta between tire surface temperature and carcass core temperature.
 */
export class TireGrainingDetector {
    constructor() {
        this.grainingThresholdDelta = 22.0; // °C surface cooler than core under sliding
        this.blisteringThresholdCore = 125.0; // °C core overheating
    }

    evaluateTireCondition(surfaceTempC, coreTempC, slipRatio) {
        const tempDelta = coreTempC - surfaceTempC;
        const isGraining = tempDelta > this.grainingThresholdDelta && Math.abs(slipRatio) > 0.08;
        const isBlistering = coreTempC > this.blisteringThresholdCore;

        let status = 'NOMINAL';
        if (isBlistering) {
            status = 'CRITICAL_BLISTERING';
        } else if (isGraining) {
            status = 'GRAINING_DETECTED';
        }

        return {
            surfaceTempC,
            coreTempC,
            tempDelta: parseFloat(tempDelta.toFixed(1)),
            status,
            gripMultiplier: isBlistering ? 0.82 : (isGraining ? 0.91 : 1.0)
        };
    }
}
