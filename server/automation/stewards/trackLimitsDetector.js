/**
 * Ajith Kumar Racing - Track Limits & Sausage Curb Strike Detector
 */
export class TrackLimitsDetector {
    constructor() {
        this.offTrackViolations = [];
        this.sausageCurbMaxImpulseG = 3.8;
    }

    recordSensorTelemetry(turnNumber, gpsLateralOffsetM, verticalImpulseG) {
        const isOffTrack = Math.abs(gpsLateralOffsetM) > 2.05; // Outer boundary 2.05m
        const isViolentCurbStrike = verticalImpulseG > this.sausageCurbMaxImpulseG;

        if (isOffTrack) {
            this.offTrackViolations.push({
                turn: turnNumber,
                timestamp: Date.now(),
                lateralOffsetM: gpsLateralOffsetM,
                curbStrike: isViolentCurbStrike
            });
        }

        return {
            turnNumber,
            isOffTrack,
            isViolentCurbStrike,
            totalViolations: this.offTrackViolations.length,
            penaltyWarning: this.offTrackViolations.length >= 3
        };
    }
}
