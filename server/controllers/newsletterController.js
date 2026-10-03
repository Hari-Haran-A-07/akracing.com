import { store } from '../utils/store.js';

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email address is required' });
    }

    const subscribers = store.get('subscribers');
    const existing = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.json({ success: true, message: 'You are already registered on the AKR Paddock Grid.' });
    }

    subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
      active: true
    });

    res.status(201).json({
      success: true,
      message: 'Subscription confirmed. Welcome to the Ajith Kumar Racing telemetry inner circle.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = store.get('subscribers');
    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
