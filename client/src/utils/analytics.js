/**
 * Lightweight Client-Side Analytics Tracker
 * Dispatches anonymous interaction events to Google Analytics 4 / custom telemetry endpoint.
 */

export const trackEvent = (eventName, params = {}) => {
  const payload = {
    event: eventName,
    ...params,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
  };

  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(payload);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log([AKR Analytics] \, params);
  }
};

export const trackPageView = (pagePath) => {
  trackEvent('page_view', { page_path: pagePath });
};

export default { trackEvent, trackPageView };
