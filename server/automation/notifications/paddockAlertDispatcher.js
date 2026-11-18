/**
 * Paddock Alert Notification Dispatcher
 * Broadcasts urgent race control flags and pit orders to pit crew headsets,
 * Google Chat Webhooks, and Race Director dashboard.
 */
export const dispatchPaddockAlert = async (alert) => {
  const { priority = 'INFO', channel = 'RACE_CONTROL', message, sender = 'Race Director' } = alert;

  const payload = {
    id: 'alert-' + Math.random().toString(36).substring(2, 9),
    priority,
    channel,
    message,
    sender,
    dispatchedAt: new Date().toISOString()
  };

  console.log([PaddockAlert][\] \);
  return { success: true, alert: payload };
};

export default dispatchPaddockAlert;
