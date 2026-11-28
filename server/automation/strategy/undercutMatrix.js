/**
 * Ajith Kumar Racing - Undercut Window Probability Matrix
 */
export class UndercutMatrix {
    constructor(pitLaneLossSec = 22.8) {
        this.pitLaneLossSec = pitLaneLossSec;
        this.outlapWarmupPenaltySec = 1.6; // Cold slick tires on out-lap
    }

    calculateUndercutAdvantage(gapToOpponentSec, opponentTireAgeLaps, freshTireDeltaPerLapSec) {
        const opponentDegradationDelta = opponentTireAgeLaps * 0.11;
        const netOutlapAdvantageSec = (freshTireDeltaPerLapSec + opponentDegradationDelta) - this.outlapWarmupPenaltySec;
        const undercutViable = (gapToOpponentSec - netOutlapAdvantageSec) < 0;

        return {
            gapToOpponentSec,
            netOutlapAdvantageSec: parseFloat(netOutlapAdvantageSec.toFixed(2)),
            undercutSuccessProbabilityPct: undercutViable ? Math.min(98, 50 + (netOutlapAdvantageSec - gapToOpponentSec) * 25) : 15,
            action: undercutViable ? 'BOX_TO_UNDERCUT' : 'OVERCUT_OPTIMAL'
        };
    }
}
