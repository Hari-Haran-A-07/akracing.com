# 🏎️ CAN Bus Sensor Sampling & Filtering Topology

The Ajith Kumar Racing (AKR) GT3 platform utilizes a dual-channel high-speed ISO 11898-2 CAN 2.0B bus operating at 1 Mbps with real-time arbitration.

## Channel Allocation & Sampling Rates

| Sensor Channel | Bus ID | Sampling Rate | Filter Topology |
|---|---|---|---|
| Damper Potentiometers (FL, FR, RL, RR) | `0x320` - `0x323` | 1000 Hz | 2nd Order Butterworth (120 Hz cutoff) |
| Brake Disc Infrared Temp (3-Zone) | `0x410` - `0x413` | 100 Hz | Moving Exponential Average (alpha=0.25) |
| Wheel Speed Hall Effect Sensors | `0x200` | 200 Hz | Phase-locked digital loop |
| IMU 6-DOF Accelerometer / Gyro | `0x180` | 500 Hz | Kalman Filter sensor fusion with GPS |
| Turbo Boost Pressure / Wastegate Duty | `0x500` | 100 Hz | Median filter (3-sample window) |
