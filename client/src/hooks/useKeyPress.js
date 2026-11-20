import { useEffect, useCallback } from 'react';

/**
 * Custom hook for listening to single or combination keyboard hotkeys.
 * Enables pit wall hotkeys (e.g. Space to pause stream, 'M' to mute radio).
 */
export const useKeyPress = (targetKey, handler, modifier = null) => {
  const handleKeyDown = useCallback(
    (event) => {
      const matchModifier = modifier ? event[modifier + 'Key'] : true;
      if (event.key.toLowerCase() === targetKey.toLowerCase() && matchModifier) {
        event.preventDefault();
        handler(event);
      }
    },
    [targetKey, handler, modifier]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

export default useKeyPress;
