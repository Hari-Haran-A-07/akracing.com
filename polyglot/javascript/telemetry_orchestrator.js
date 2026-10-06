/**
 * AJITH KUMAR RACING (AKR) — POLYGLOT MOTORSPORT PLATFORM
 * JavaScript Event Stream Orchestrator & Live Audio Synthesizer
 * Language: JavaScript (ES6+ / Node.js)
 */

export class AKROrchestrator {
  constructor() {
    this.listeners = new Map();
    this.streamActive = false;
    this.packetCount = 0;
    this.sampleRate = 60; // 60 Hz telemetry
  }

  on(event, handler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(handler);
    return () => this.off(event, handler);
  }

  off(event, handler) {
    if (!this.listeners.has(event)) return;
    const list = this.listeners.get(event).filter(h => h !== handler);
    this.listeners.set(event, list);
  }

  emit(event, data) {
    const handlers = this.listeners.get(event) || [];
    for (const fn of handlers) {
      try {
        fn(data);
      } catch (err) {
        console.error(`Error in event handler for ${event}:`, err);
      }
    }
  }

  generateSyntheticPacket(baseSpeed = 265, baseRpm = 7800) {
    this.packetCount++;
    const speed = Math.max(80, Math.min(315, baseSpeed + (Math.sin(this.packetCount * 0.1) * 35)));
    const rpm = Math.max(4000, Math.min(8800, baseRpm + (Math.cos(this.packetCount * 0.15) * 600)));
    const lateralG = (Math.sin(this.packetCount * 0.08) * 3.4).toFixed(2);
    const throttle = speed > 220 ? 100 : Math.max(20, Math.floor(Math.random() * 60 + 40));
    
    return {
      id: this.packetCount,
      timestamp: new Date().toISOString(),
      vehicle: 'AKR GT3-01 SPEC',
      driver: 'Ajith Kumar',
      speedKmh: Math.round(speed),
      rpm: Math.round(rpm),
      gear: speed > 250 ? 6 : speed > 200 ? 5 : speed > 150 ? 4 : speed > 100 ? 3 : 2,
      lateralG: parseFloat(lateralG),
      throttlePct: throttle,
      brakeBar: throttle > 80 ? 0 : Math.floor(Math.random() * 45 + 10),
      oilTempC: 98.4 + Math.sin(this.packetCount * 0.02) * 2.1,
      waterTempC: 89.1 + Math.cos(this.packetCount * 0.02) * 1.5,
      tireTemps: {
        frontLeft: Math.round(92 + Math.random() * 4),
        frontRight: Math.round(96 + Math.random() * 4),
        rearLeft: Math.round(94 + Math.random() * 4),
        rearRight: Math.round(98 + Math.random() * 4)
      }
    };
  }

  runStreamSimulation(durationSeconds = 5, onPacket) {
    this.streamActive = true;
    const intervalMs = Math.round(1000 / this.sampleRate);
    let elapsed = 0;
    
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (elapsed >= durationSeconds * 1000) {
          clearInterval(interval);
          this.streamActive = false;
          resolve({ packetsGenerated: this.packetCount, durationSeconds });
          return;
        }
        
        const packet = this.generateSyntheticPacket();
        if (onPacket) onPacket(packet);
        this.emit('telemetry', packet);
        elapsed += intervalMs;
      }, intervalMs);
    });
  }
}
