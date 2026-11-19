# ðŸŽï¸ 100Hz Telemetry Pipeline & Sensor Specifications
## Ajith Kumar Racing (AKR) Engineering

This document outlines the high-frequency telemetry architecture for the **AKR GT3-01 SPEC** and Virtual Pit Wall interface.

---

### ðŸ“¡ Data Flow Topology

\\\
[ MoTeC M150 ECU / Bosch MS6 ]
               â”‚
               â–¼ (CAN Bus 2.0B @ 1 Mbps)
    [ On-Board Telemetry Gateway ]
               â”‚
               â–¼ (4G/5G Cellular Stream @ 100Hz)
  [ Google Cloud Pub/Sub Topic ]
               â”‚
      â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”
      â–¼                 â–¼
[ Live WebSocket ]  [ BigQuery Ingestion ]
(React Pit Wall)    (Partitioned Storage)
\\\

---

### ðŸ“Š Ingested Channels

| Sensor Channel | Description | Operating Range | Nominal Bounds |
|---|---|---|---|
| \speedKmh\ | Ground speed from wheel sensors | 0 â€“ 350 km/h | Dynamic |
| \pm\ | Crankshaft rotational speed | 0 â€“ 9,000 RPM | Redline @ 8,750 |
| \gear\ | Sequential 6-speed transmission | -1 to 6 | Gear matched |
| \	hrottlePct\ | Drive-by-wire pedal position | 0 â€“ 100% | Linear |
| \rakePct\ | Hydraulic brake pressure transducer | 0 â€“ 100% | Apex modulated |
| \steeringAngleDeg\ | Steering rack angle sensor | -450Â° to +450Â° | Dynamic |
| \lateralG\ | Tri-axial accelerometer (Lat) | -4.0G to +4.0G | Compound dependent |
| \longitudinalG\ | Tri-axial accelerometer (Long) | -4.5G (Braking) to +1.8G | Aero dependent |
| \rakeTempFL/FR\ | Infrared rotor thermal sensor | 200Â°C â€“ 950Â°C | Optimal 450Â°C â€“ 700Â°C |

---

### ðŸ›¡ï¸ Safety & Anomaly Detection

1. **Hydraulic Oil Pressure:** Immediate pit-board flag if pressure drops below 3.2 bar at > 6,000 RPM.
2. **Thermal Spike Warning:** Automated rearward brake bias modulation if rotor temperatures exceed 820Â°C.
3. **Friction Circle Limits:** Traction loss prediction when combined vector exceeds 3.8G.

---

Â© 2026 Ajith Kumar Racing. Confidential Motorsport Telemetry Specification.
