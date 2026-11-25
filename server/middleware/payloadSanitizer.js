/**
 * Payload Sanitization & Injection Prevention Middleware
 */
export const sanitizePayload = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    for (const key of Object.keys(req.body)) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].replace(/[<>]/g, '').trim();
      }
    }
  }
  next();
};

export default sanitizePayload;
