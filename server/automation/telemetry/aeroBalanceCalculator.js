/**
 * Ajith Kumar Racing - Aero Balance Migration & Center of Pressure Calculator
 */
export class AeroBalanceCalculator {
    calculateBalance(frontRideHeightMm, rearRideHeightMm, wingAngleDeg) {
        // Base front downforce percentage at nominal ride height
        const baseFrontBiasPct = 42.5;

        // Rake increases front diffuser suction
        const rakeBonus = (rearRideHeightMm - frontRideHeightMm) * 0.18;
        // Rear wing shifts balance backwards
        const wingPenalty = wingAngleDeg * 0.32;

        const effectiveFrontPct = baseFrontBiasPct + rakeBonus - wingPenalty;

        return {
            frontRideHeightMm,
            rearRideHeightMm,
            frontDownforcePct: parseFloat(effectiveFrontPct.toFixed(2)),
            rearDownforcePct: parseFloat((100.0 - effectiveFrontPct).toFixed(2)),
            balanceCharacteristics: effectiveFrontPct > 44.0 ? 'OVERSTEER_BIASED_HIGH_TURN_IN' : 'UNDERSTEER_STABLE_HIGH_SPEED'
        };
    }
}
