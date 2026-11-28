# 📜 Changelog - Ajith Kumar Racing Ecosystem

## [3.2.0-championship] - 2026-11-28

### 🏎️ Telemetry & Vehicle Dynamics Enhancements
- **Tire Graining & Blistering Detector (`server/automation/telemetry/tireGrainingDetector.js`)**: Real-time evaluation of surface-to-core thermal gradient.
- **EPS Torque Feedback Analyzer (`server/automation/telemetry/epsTorqueAnalyzer.js`)**: Pinion torque calculation and rack force estimation.
- **Cylinder EGT Balancing (`server/automation/telemetry/cylinderEgtMonitor.js`)**: Exhaust gas temp distribution monitor across all 6 cylinders.
- **Aero Balance Migration (`server/automation/telemetry/aeroBalanceCalculator.js`)**: Dynamic center of pressure calculation based on rake angle and wing angle.

### 🧠 Race Strategy & Race Control
- **Wet-to-Dry Crossover Predictor (`server/automation/strategy/crossoverPredictor.js`)**: Optimal switchover lap predictor from rain tires to slicks.
- **Undercut Probability Matrix (`server/automation/strategy/undercutMatrix.js`)**: Solves out-lap warm-up delta vs opponent stint degradation.
- **Track Limits Violation Auditor (`server/automation/stewards/trackLimitsDetector.js`)**: Microsector boundary GPS enforcement.
- **Pit Lane Speed Limiter Monitor (`server/automation/stewards/pitSpeedCompliance.js`)**: Speed compliance and unsafe release safety auditor.

### 🌤️ Weather, Inventory & AI
- **Atmospheric Boost Compensator (`server/automation/weather/boostCompensator.js`)**: Air density turbocharger pressure correction.
- **Brake Disc Fatigue Tracker (`server/automation/inventory/brakeDiscWearTracker.js`)**: Carbon-ceramic disc thickness wear tracking.
- **Dog-Ring Gearbox Engagement Auditor (`server/automation/inventory/gearboxEngagementTracker.js`)**: Shift cut and dog wear tracking.
- **Radio Transcript Stress Classifier (`server/automation/ai/radioStressClassifier.js`)**: Acoustic pitch and cadence stress assessment.
- **Neural Stint Pace Estimator (`server/automation/ai/neuralStintPredictor.js`)**: Stint progression and tire compound degradation curves.

### 🧪 Automated Tests & Documentation
- **Automated Unit Test Suites (`server/tests/`)**: Testing tire graining, crossover predictions, track limits, and boost compensation.
- **Technical Handbooks (`docs/`)**: CAN bus sampling topology guide, endurance pit timing manual, and aerodynamic rake matrix.
