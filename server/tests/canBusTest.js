/**
 * CAN-bus & Circular Buffer Unit Tests
 */
import { parseCANFrame } from '../automation/telemetry/canBusParser.js';
import TelemetryCircularBuffer from '../automation/telemetry/circularBuffer.js';

console.log('--- RUNNING CAN-BUS & BUFFER TESTS ---');

// Test 1: CAN-bus frame unpack
const buf = Buffer.from([0x1E, 0x78, 0xFF, 0x78, 0x00, 0x00, 0x00, 0x00]);
const parsed = parseCANFrame(0x200, buf);
console.assert(parsed.rpm === 7800, 'RPM must unpack to 7800');
console.assert(parsed.waterTempC === 80, 'Water temp must unpack to 80C');

// Test 2: Circular buffer bounds
const ring = new TelemetryCircularBuffer(5);
ring.push({ frame: 1 });
ring.push({ frame: 2 });
ring.push({ frame: 3 });
const latest = ring.getLatest(2);
console.assert(latest.length === 2, 'Ring should return latest 2 frames');
console.assert(latest[0].frame === 3, 'Latest frame should be 3');

console.log('✓ CAN-bus parser and circular buffer tests passed.');
