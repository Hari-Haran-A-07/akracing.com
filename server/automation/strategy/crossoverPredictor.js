/**
 * Ajith Kumar Racing - Wet-to-Dry Crossover Lap Predictor
 * Identifies the exact lap when slicks outperform wet/intermediate tires.
 */
export class CrossoverPredictor {
    constructor() {
        this.trackDryLineThresholdPct = 68.0; // Dry racing line %
    }

    predictCrossover(dryLineCoveragePct, wetPaceSec, slickPaceDrySec) {
        // Calculate estimated slick pace on current damp condition
        const dampPenalty = Math.max(0, (100.0 - dryLineCoveragePct) * 0.42);
        const estimatedSlickPaceSec = slickPaceDrySec + dampPenalty;
        const timeAdvantageSec = wetPaceSec - estimatedSlickPaceSec;
        const shouldBoxForSlicks = dryLineCoveragePct >= this.trackDryLineThresholdPct && timeAdvantageSec > 1.2;

        return {
            dryLineCoveragePct,
            wetPaceSec,
            estimatedSlickPaceSec: parseFloat(estimatedSlickPaceSec.toFixed(2)),
            timeAdvantageSec: parseFloat(timeAdvantageSec.toFixed(2)),
            boxThisLap: shouldBoxForSlicks,
            recommendation: shouldBoxForSlicks ? 'BOX_NOW_FOR_SLICKS' : 'STAY_OUT_ON_WETS'
        };
    }
}
