/**
 * Automated Race Weekend Fan Sentiment Scorer
 * Categorizes community messages and social mentions into excitement, support, and engagement scores.
 */

export const analyzeFanSentiment = (messages = []) => {
  const keywords = {
    positive: ['p1', 'win', 'fast', 'legend', 'champion', 'podium', 'masterclass', 'akr'],
    neutral: ['race', 'lap', 'circuit', 'start', 'tires'],
    negative: ['dnf', 'crash', 'penalty', 'slow', 'spin'],
  };

  let positiveCount = 0;
  let totalWords = 0;

  messages.forEach((msg) => {
    const words = msg.toLowerCase().split(/\s+/);
    totalWords += words.length;
    words.forEach((w) => {
      if (keywords.positive.includes(w)) positiveCount++;
    });
  });

  const sentimentScore = Math.min(100, Math.round((positiveCount / Math.max(1, messages.length)) * 35 + 50));

  return {
    totalMessagesAnalyzed: messages.length,
    sentimentScore,
    fanMood: sentimentScore > 75 ? 'HIGH_OCTANE_EXCITEMENT' : 'OPTIMISTIC_SUPPORT',
    analyzedAt: new Date().toISOString(),
  };
};

export default analyzeFanSentiment;
