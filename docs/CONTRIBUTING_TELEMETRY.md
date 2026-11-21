# ðŸ› ï¸ Contributing to AKR Telemetry & Analytics Engine

Welcome! We welcome contributions to the **AKR Telemetry & Strategy Engine**.

## Sensor Pipeline Conventions

1. **Units of Measurement:**
   - Velocity: km/h (\speedKmh\)
   - Rotational Speed: RPM (\pm\)
   - Pressure: Bar / PSI (\oilPressureBar\, \	irePsi\)
   - Temperature: Degrees Celsius (\	empC\)
   - Acceleration: Standard gravity (\lateralG\, \longitudinalG\)

2. **Code Standards:**
   - Telemetry math algorithms must be purely functional and deterministic.
   - Sensor inputs must be checked against physical bounds using \	elemetryValidator.js\.
   - All new mathematical models must include assertions in \server/tests/\.

3. **Submitting Changes:**
   - Create a feature branch: \git checkout -b feature/telemetry-channel\
   - Verify unit tests: \
ode server/tests/telemetryTest.js\
   - Open a PR with detailed test logs.

---

Â© 2026 Ajith Kumar Racing. Open Engineering Initiative.
