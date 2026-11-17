import { useState, useEffect, useCallback } from 'react';

/**
 * Countdown timer hook for race countdowns and limited-time offers.
 * @param {Date|string|number} targetDate - The target date to count down to
 * @returns {{ days, hours, minutes, seconds, isExpired, formatted }}
 */
const useCountdown = (targetDate) => {
  const calculateTimeLeft = useCallback(() => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const pad = (n) => String(n).padStart(2, '0');
  const formatted = timeLeft.isExpired
    ? '00:00:00:00'
    : pad(timeLeft.days) + ':' + pad(timeLeft.hours) + ':' + pad(timeLeft.minutes) + ':' + pad(timeLeft.seconds);

  return { ...timeLeft, formatted };
};

export default useCountdown;
