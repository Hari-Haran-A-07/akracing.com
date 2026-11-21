import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive window dimension measurement with debounced resizing.
 */
export const useWindowSize = (throttleMs = 150) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
  });

  useEffect(() => {
    let timeoutId = null;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        setWindowSize({
          width: w,
          height: h,
          isMobile: w < 768,
          isTablet: w >= 768 && w < 1024,
          isDesktop: w >= 1024,
        });
      }, throttleMs);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [throttleMs]);

  return windowSize;
};

export default useWindowSize;
