/**
 * AKR Telemetry Engine Bridge (akr-telemetry-engine connector)
 * Connects directly to high-performance Rust WebSocket telemetry stream.
 */
class TelemetryEngineBridge {
  constructor(endpoint = 'wss://telemetry.ajithkumarracing.com/ws') {
    this.endpoint = endpoint;
    this.ws = null;
    this.listeners = new Set();
    this.connected = false;
  }

  connect() {
    try {
      this.ws = new WebSocket(this.endpoint);
      this.ws.onopen = () => {
        this.connected = true;
        console.log('[TelemetryBridge] Connected to akr-telemetry-engine');
      };
      this.ws.onmessage = (event) => {
        const frame = JSON.parse(event.data);
        this.listeners.forEach((listener) => listener(frame));
      };
      this.ws.onclose = () => {
        this.connected = false;
        setTimeout(() => this.connect(), 3000);
      };
    } catch (e) {
      this.connected = false;
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  disconnect() {
    if (this.ws) this.ws.close();
  }
}

export const telemetryEngineBridge = new TelemetryEngineBridge();
export default telemetryEngineBridge;
