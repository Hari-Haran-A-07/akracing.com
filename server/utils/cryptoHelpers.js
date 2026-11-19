/**
 * Cryptographic & Checksum Utilities
 * Used for telemetry payload integrity verification and order signature generation.
 */
import { createHash, randomBytes } from 'crypto';

export const computeChecksum = (data) => {
  const serialized = typeof data === 'string' ? data : JSON.stringify(data);
  return createHash('sha256').update(serialized).digest('hex');
};

export const verifyChecksum = (data, expectedChecksum) => {
  return computeChecksum(data) === expectedChecksum;
};

export const generateSecureToken = (bytes = 32) => {
  return randomBytes(bytes).toString('hex');
};

export const generateOrderReference = (prefix = 'AKR') => {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomSuffix = randomBytes(3).toString('hex').toUpperCase();
  return \-\-\;
};

export default { computeChecksum, verifyChecksum, generateSecureToken, generateOrderReference };
