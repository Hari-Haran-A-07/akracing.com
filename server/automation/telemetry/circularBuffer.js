/**
 * High-Speed Circular Buffer for Telemetry Packets
 * Zero-memory re-allocation ring buffer storing recent 1000 frames.
 */
export class TelemetryCircularBuffer {
  constructor(capacity = 1000) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
    this.head = 0;
    this.count = 0;
  }

  push(frame) {
    this.buffer[this.head] = frame;
    this.head = (this.head + 1) % this.capacity;
    if (this.count < this.capacity) this.count++;
  }

  getLatest(n = 50) {
    const fetchCount = Math.min(n, this.count);
    const result = [];
    for (let i = 0; i < fetchCount; i++) {
      const idx = (this.head - 1 - i + this.capacity) % this.capacity;
      result.push(this.buffer[idx]);
    }
    return result;
  }
}

export default TelemetryCircularBuffer;
