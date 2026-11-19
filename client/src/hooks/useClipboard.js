import { useState, useCallback } from 'react';

/**
 * Custom hook for copying text to clipboard with auto-reverting feedback.
 * @param {number} timeout - Reset duration in milliseconds (default: 2000)
 */
export const useClipboard = (timeout = 2000) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const copy = useCallback(
    async (text) => {
      if (!navigator?.clipboard) {
        setError(new Error('Clipboard API not supported on this browser'));
        return false;
      }
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        setTimeout(() => setCopied(false), timeout);
        return true;
      } catch (err) {
        setError(err);
        setCopied(false);
        return false;
      }
    },
    [timeout]
  );

  return { copy, copied, error };
};

export default useClipboard;
