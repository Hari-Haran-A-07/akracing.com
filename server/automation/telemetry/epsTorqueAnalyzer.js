/**
 * Ajith Kumar Racing - Electronic Power Steering (EPS) Torque & Rack Force Analyzer
 */
export class EpsTorqueAnalyzer {
    constructor() {
        this.maxAssistanceNm = 12.5; // Max assist torque
        this.rackRatio = 14.2; // Steering ratio
    }

    calculateFeedback(pinionAngleDeg, lateralG, vehicleSpeedKmh) {
        const baseForceN = Math.abs(lateralG) * 4200.0;
        const speedDamping = Math.min(1.5, vehicleSpeedKmh / 120.0);
        const driverTorqueNm = (baseForceN / (this.rackRatio * 100)) * speedDamping;
        const assistTorqueNm = Math.min(this.maxAssistanceNm, driverTorqueNm * 0.45);

        return {
            pinionAngleDeg,
            rackForceNewtons: parseFloat(baseForceN.toFixed(1)),
            effectiveDriverTorqueNm: parseFloat((driverTorqueNm - assistTorqueNm).toFixed(2)),
            assistTorqueNm: parseFloat(assistTorqueNm.toFixed(2)),
            steeringFeel: vehicleSpeedKmh > 200 ? 'HIGH_SPEED_FIRM' : 'AGILE_ASSIST'
        };
    }
}
