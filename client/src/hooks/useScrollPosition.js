import { useState, useEffect } from 'react';

/**
 * Hook to track scroll position and direction.
 * Useful for sticky headers, parallax effects, and scroll-based animations.
 */
const useScrollPosition = () => {
  const [scrollData, setScrollData] = useState({
    y: 0,
    lastY: 0,
    direction: 'none',
    isAtTop: true,
    isAtBottom: false,
    progress: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollData((prev) => ({
        y,
        lastY: prev.y,
        direction: y > prev.y ? 'down' : y < prev.y ? 'up' : prev.direction,
        isAtTop: y <= 10,
        isAtBottom: y >= maxScroll - 10,
        progress: maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0,
      }));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollData;
};

export default useScrollPosition;
