import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const TelemetryContext = createContext();

export const TelemetryProvider = ({ children }) => {
  const [telemetry, setTelemetry] = useState({
    session: "12H SPA-FRANCORCHAMPS - LIVE RACE",
    driver: "AJITH KUMAR",
    car: "AKR GT3-01 (#9)",
    currentPosition: 2,
    currentLap: 84,
    totalLaps: 250,
    lapTime: "2:17.382",
    bestLap: "2:16.890",
    gapToLeader: "+2.418s",
    lastPitStop: "Lap 62 (Fuel + Tyres / 42.1s)",
    currentSpeed: 278,
    rpm: 8250,
    gear: 5,
    throttlePct: 98,
    brakePressureBar: 0,
    steeringAngleDeg: -2.4,
    lateralG: 2.8,
    longitudinalG: 0.9,
    tyrePressure: { fl: 2.05, fr: 2.08, rl: 2.02, rr: 2.04 },
    tyreTemp: { fl: 88, fr: 94, rl: 86, rr: 91 },
    brakeTemp: { fl: 540, fr: 560, rl: 480, rr: 495 },
    fuelRemainingLiters: 48.5,
    fuelPerLap: 3.42,
    sectors: {
      s1: { current: "41.820s", best: "41.650s", status: "purple" },
      s2: { current: "1:03.110s", best: "1:02.940s", status: "green" },
      s3: { current: "32.452s", best: "32.300s", status: "green" }
    }
  });

  const [isLive, setIsLive] = useState(true);

  // Poll live telemetry every 3.5 seconds
  useEffect(() => {
    let interval;
    const fetchLive = async () => {
      try {
        const res = await api.getLiveTelemetry();
        if (res.success && res.data) {
          setTelemetry(res.data);
        }
      } catch (err) {
        // Fallback local jitter
        setTelemetry(prev => ({
          ...prev,
          currentSpeed: Math.max(140, Math.min(312, prev.currentSpeed + Math.floor(Math.random() * 14 - 7))),
          rpm: Math.max(5200, Math.min(8550, prev.rpm + Math.floor(Math.random() * 200 - 100))),
          lateralG: (Math.random() * 2.8 + 0.8).toFixed(2),
          throttlePct: Math.floor(Math.random() * 20 + 80)
        }));
      }
    };

    fetchLive();
    interval = setInterval(fetchLive, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TelemetryContext.Provider value={{ telemetry, isLive, setIsLive }}>
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => useContext(TelemetryContext);
