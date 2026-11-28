/**
 * Ajith Kumar Racing - Atmospheric Pressure & Turbo Boost Compensator
 */
export class BoostCompensator {
    constructor() {
        this.standardAtmosphereHpa = 1013.25;
        this.standardTempC = 20.0;
        this.baseBoostTargetBar = 2.15;
    }

    calculateCompensatedBoost(ambientPressureHpa, ambientTempC) {
        const pressureRatio = this.standardAtmosphereHpa / ambientPressureHpa;
        const tempRatio = (ambientTempC + 273.15) / (this.standardTempC + 273.15);
        const airDensityCorrection = pressureRatio * Math.sqrt(tempRatio);

        const compensatedBoostBar = Math.min(2.55, this.baseBoostTargetBar * airDensityCorrection);

        return {
            ambientPressureHpa,
            ambientTempC,
            airDensityCorrection: parseFloat(airDensityCorrection.toFixed(3)),
            targetBoostBar: parseFloat(compensatedBoostBar.toFixed(2)),
            wastegateDutyCycleTargetPct: parseFloat(Math.min(95, 62 * airDensityCorrection).toFixed(1))
        };
    }
}
