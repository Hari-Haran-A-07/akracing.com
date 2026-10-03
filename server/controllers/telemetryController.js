import { store } from '../utils/store.js';

export const getLiveTelemetry = async (req, res) => {
  try {
    const base = store.get('telemetry').liveStatus;
    
    // Add micro-fluctuations to simulate live onboard telemetry
    const jitterSpeed = Math.floor(Math.random() * 15) - 7;
    const jitterRpm = Math.floor(Math.random() * 300) - 150;
    const jitterG = (Math.random() * 0.4 - 0.2).toFixed(2);
    
    const liveSnapshot = {
      ...base,
      currentSpeed: Math.max(120, Math.min(310, base.currentSpeed + jitterSpeed)),
      rpm: Math.max(5000, Math.min(8600, base.rpm + jitterRpm)),
      lateralG: Math.max(0.5, (parseFloat(base.lateralG) + parseFloat(jitterG)).toFixed(2)),
      throttlePct: Math.floor(Math.random() * 15 + 85),
      timestamp: new Date().toISOString()
    };

    res.json({ success: true, data: liveSnapshot });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTelemetry = async (req, res) => {
  try {
    const updated = store.update('telemetry', 'liveStatus', req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
