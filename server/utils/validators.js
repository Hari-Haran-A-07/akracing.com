// Input validation utilities for AKR API

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (fields, body) => {
  const missing = [];
  for (const field of fields) {
    if (!body[field] || (typeof body[field] === 'string' && body[field].trim() === '')) {
      missing.push(field);
    }
  }
  return missing;
};

export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim();
};

export const validatePagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

export const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};
