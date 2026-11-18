import express from 'express';
import pubsub from '../automation/events/pubsubEventBus.js';

const router = express.Router();

// POST /api/webhooks/pubsub - Google Cloud Pub/Sub Push Subscription receiver
router.post('/pubsub', (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.data) {
      return res.status(400).json({ success: false, message: 'Invalid Pub/Sub message payload' });
    }

    const decodedData = Buffer.from(message.data, 'base64').toString('utf-8');
    const parsedPayload = JSON.parse(decodedData);

    pubsub.publish('google-cloud-push-events', parsedPayload, message.attributes || {});

    res.status(204).end();
  } catch (error) {
    console.error('[PubSub Webhook Error]', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
