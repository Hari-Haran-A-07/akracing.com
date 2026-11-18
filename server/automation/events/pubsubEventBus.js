/**
 * AKR EventFlow: Google Cloud Pub/Sub Simulator & Event Bus
 * Provides decoupled publish-subscribe message routing for telemetry, paddock alerts,
 * and automated logistics events across microservices.
 */
import { EventEmitter } from 'events';

class PubSubEventBus extends EventEmitter {
  constructor() {
    super();
    this.topics = new Map();
  }

  createTopic(topicName) {
    if (!this.topics.has(topicName)) {
      this.topics.set(topicName, {
        subscribers: [],
        messageCount: 0
      });
    }
    return this.topics.get(topicName);
  }

  publish(topicName, data, attributes = {}) {
    const topic = this.createTopic(topicName);
    topic.messageCount++;

    const message = {
      id: 'msg-' + Math.random().toString(36).substring(2, 10),
      data,
      attributes: {
        ...attributes,
        timestamp: new Date().toISOString(),
        publishedAt: Date.now()
      }
    };

    this.emit(topicName, message);
    return message;
  }

  subscribe(topicName, handler) {
    this.createTopic(topicName);
    this.on(topicName, handler);
    return () => this.off(topicName, handler);
  }

  getTopicMetrics() {
    const stats = {};
    for (const [name, meta] of this.topics.entries()) {
      stats[name] = {
        totalMessages: meta.messageCount,
        listenerCount: this.listenerCount(name)
      };
    }
    return stats;
  }
}

export const pubsub = new PubSubEventBus();
export default pubsub;
