/**
 * Client DOM & Viewport Utility Helpers
 */

// Smoothly scrolls to target element by query selector with offset
export const scrollToElement = (selector, offsetPx = 80) => {
  const element = document.querySelector(selector);
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.scrollY - offsetPx;
  window.scrollTo({ top, behavior: 'smooth' });
};

// Returns percentage of document scrolled
export const getScrollPercentage = () => {
  const h = document.documentElement;
  const b = document.body;
  const st = 'scrollTop';
  const sh = 'scrollHeight';
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
};

export default { scrollToElement, getScrollPercentage };
