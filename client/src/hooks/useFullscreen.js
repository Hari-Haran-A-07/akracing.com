import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for toggling browser fullscreen mode on Virtual Pit Wall displays.
 */
export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(
    typeof document !== 'undefined' ? Boolean(document.fullscreenElement) : false
  );

  const toggle = useCallback(async () => {
    if (!document) return;
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('[AKR Fullscreen Error]', err);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return { isFullscreen, toggle };
};

export default useFullscreen;
