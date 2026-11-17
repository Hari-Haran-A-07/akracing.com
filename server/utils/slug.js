// URL slug generation and parsing utilities for AKR platform

/**
 * Converts a string into a URL-friendly slug.
 * @param {string} text - The text to slugify
 * @returns {string} URL-safe slug
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/**
 * Converts a slug back into a readable title.
 * @param {string} slug - The slug to convert
 * @returns {string} Human-readable title
 */
export const deslugify = (slug) => {
  return slug
    .replace(/-and-/g, ' & ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

/**
 * Generates a unique slug by appending a numeric suffix if needed.
 * @param {string} text - Base text
 * @param {string[]} existing - Array of existing slugs
 * @returns {string} Unique slug
 */
export const uniqueSlug = (text, existing = []) => {
  let slug = slugify(text);
  let counter = 1;
  let candidate = slug;
  while (existing.includes(candidate)) {
    candidate = slug + '-' + counter;
    counter++;
  }
  return candidate;
};
