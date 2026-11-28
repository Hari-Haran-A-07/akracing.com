/**
 * Ajith Kumar Racing - Individual Cylinder Exhaust Gas Temperature (EGT) Monitor
 */
export class CylinderEgtMonitor {
    constructor() {
        this.maxSafeEgtC = 960.0;
        this.maxCylinderSpreadDeltaC = 45.0; // Max temp variation between cylinders
    }

    analyzeCylinders(cylinderTempsArray) {
        // cylinderTempsArray: [C1, C2, C3, C4, C5, C6]
        const maxTemp = Math.max(...cylinderTempsArray);
        const minTemp = Math.min(...cylinderTempsArray);
        const spread = maxTemp - minTemp;
        const avg = cylinderTempsArray.reduce((a, b) => a + b, 0) / cylinderTempsArray.length;

        const overTemp = maxTemp > this.maxSafeEgtC;
        const imbalance = spread > this.maxCylinderSpreadDeltaC;

        return {
            cylinders: cylinderTempsArray,
            averageEgtC: parseFloat(avg.toFixed(1)),
            spreadC: parseFloat(spread.toFixed(1)),
            isSafe: !overTemp && !imbalance,
            alert: overTemp ? 'OVER_TEMP_CRITICAL' : (imbalance ? 'CYLINDER_MIXTURE_IMBALANCE' : 'BALANCED')
        };
    }
}
