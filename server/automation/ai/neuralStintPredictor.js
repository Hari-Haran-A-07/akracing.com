/**
 * Ajith Kumar Racing - Neural Stint Pace & Lap Delta Estimator
 */
export class NeuralStintPredictor {
    predictLapTimes(startingLapTimeSec, stintTotalLaps, trackTempC, tireCompound = 'MEDIUM') {
        const compoundFactors = {
            SOFT: { baseAdvantage: -0.65, degSlope: 0.14 },
            MEDIUM: { baseAdvantage: 0.0, degSlope: 0.085 },
            HARD: { baseAdvantage: 0.55, degSlope: 0.045 }
        };

        const factor = compoundFactors[tireCompound] || compoundFactors.MEDIUM;
        const tempDegFactor = 1.0 + Math.max(0, (trackTempC - 35) * 0.015);

        const trajectory = [];
        for (let lap = 1; lap <= stintTotalLaps; lap++) {
            const fuelBurnWeightAdvantageSec = -((stintTotalLaps - lap) * 0.035);
            const tireWearPenaltySec = Math.pow(lap, 1.25) * factor.degSlope * tempDegFactor;
            const projectedLapSec = startingLapTimeSec + factor.baseAdvantage + fuelBurnWeightAdvantageSec + tireWearPenaltySec;
            trajectory.push({
                lap,
                projectedTimeSec: parseFloat(projectedLapSec.toFixed(3))
            });
        }

        return {
            compound: tireCompound,
            trackTempC,
            stintLaps: stintTotalLaps,
            trajectory
        };
    }
}
