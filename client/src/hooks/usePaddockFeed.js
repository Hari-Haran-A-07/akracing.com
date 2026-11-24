import { useState, useEffect } from 'react';

export const usePaddockFeed = (endpoint = '/api/telemetry/live-feed') => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let eventSource = null;
    try {
      eventSource = new EventSource(endpoint);
      eventSource.onopen = () => setIsConnected(true);
      eventSource.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setMessages((prev) => [data, ...prev.slice(0, 49)]);
      };
      eventSource.onerror = () => setIsConnected(false);
    } catch (err) {
      setIsConnected(false);
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, [endpoint]);

  return { messages, isConnected };
};

export default usePaddockFeed;
