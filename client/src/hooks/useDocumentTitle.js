import { useEffect, useRef } from 'react';

/**
 * Hook to dynamically set the document title.
 * Restores the previous title on unmount.
 *
 * @param {string} title - Page title (will be appended with site name)
 * @param {boolean} restoreOnUnmount - Whether to restore previous title on unmount
 */
const useDocumentTitle = (title, restoreOnUnmount = true) => {
  const previousTitle = useRef(document.title);

  useEffect(() => {
    const fullTitle = title ? title + ' | Ajith Kumar Racing' : 'Ajith Kumar Racing';
    document.title = fullTitle;
  }, [title]);

  useEffect(() => {
    const prevTitle = previousTitle.current;
    return () => {
      if (restoreOnUnmount) {
        document.title = prevTitle;
      }
    };
  }, [restoreOnUnmount]);
};

export default useDocumentTitle;
