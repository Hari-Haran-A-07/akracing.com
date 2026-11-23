/**
 * Protobuf Serializer / Deserializer Helpers
 * Encodes telemetry batches into ultra-compact binary byte buffers for polyglot mesh.
 */
export const encodeTelemetryFrameBinary = (frame) => {
  const buffer = Buffer.alloc(24);
  buffer.writeDoubleBE(frame.speedKmh || 0, 0);
  buffer.writeInt32BE(frame.rpm || 0, 8);
  buffer.writeInt8(frame.gear || 0, 12);
  buffer.writeFloatBE(frame.throttlePct || 0, 13);
  buffer.writeFloatBE(frame.brakePct || 0, 17);
  return buffer;
};

export const decodeTelemetryFrameBinary = (buffer) => {
  return {
    speedKmh: buffer.readDoubleBE(0),
    rpm: buffer.readInt32BE(8),
    gear: buffer.readInt8(12),
    throttlePct: buffer.readFloatBE(13),
    brakePct: buffer.readFloatBE(17),
  };
};

export default { encodeTelemetryFrameBinary, decodeTelemetryFrameBinary };
