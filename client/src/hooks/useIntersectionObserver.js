import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook detecting when an element enters or leaves the viewport.
 * Perfect for lazy telemetry rendering, infinite scrolling, and reveal animations.
 */
export const useIntersectionObserver = (options = {}) => {
  const { threshold = 0.1, root = null, rootMargin = '0px', triggerOnce = false } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const node = targetRef.current;
    if (!node || (triggerOnce && hasTriggered)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);
        if (isElementIntersecting && triggerOnce) {
          setHasTriggered(true);
          observer.unobserve(node);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, root, rootMargin, triggerOnce, hasTriggered]);

  return [targetRef, isIntersecting];
};

export default useIntersectionObserver;
