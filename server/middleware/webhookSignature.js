/**
 * Cross-Repository Webhook HMAC Signature Verifier
 * Verifies authenticity of webhook payloads emitted from GitHub repositories and CI runners.
 */
import crypto from 'crypto';

export const verifyWebhookSignature = (secretKey) => {
  return (req, res, next) => {
    const signature = req.headers['x-akr-signature'] || req.headers['x-hub-signature-256'];
    if (!signature) {
      return res.status(401).json({ success: false, message: 'Missing webhook signature' });
    }

    const hmac = crypto.createHmac('sha256', secretKey || 'akr-ecosystem-secret-2026');
    const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');

    if (signature !== digest) {
      return res.status(403).json({ success: false, message: 'Invalid webhook HMAC signature' });
    }

    next();
  };
};

export default verifyWebhookSignature;
