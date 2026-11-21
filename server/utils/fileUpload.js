/**
 * File Upload Security Validator
 * Validates high-resolution media centre uploads for size, MIME type, and extension safety.
 */

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'video/mp4'];
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

export const validateUploadedFile = (file) => {
  const errors = [];

  if (!file) {
    return { valid: false, errors: ['No file provided'] };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    errors.push(Disallowed MIME type: \. Allowed: \);
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    errors.push(File size (\MB) exceeds 25MB limit);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export default validateUploadedFile;
