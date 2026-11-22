import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationBanner = ({ message, linkText, linkUrl, type = 'live', onDismiss }) => {
  const [dismissed, setDismissed] = useState(false);

  const colors = {
    live: 'bg-red-600 text-white',
    warning: 'bg-amber-600 text-white',
    info: 'bg-blue-600 text-white',
  };

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) onDismiss();
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className={px-4 py-2.5 text-xs font-mono font-semibold flex items-center justify-between shadow-lg relative z-40 \}
        >
          <div className=\"flex items-center gap-2 max-w-5xl mx-auto flex-1 justify-center text-center\">
            <span className=\"w-2 h-2 rounded-full bg-white animate-ping mr-1\" />
            <span>{message}</span>
            {linkText && linkUrl && (
              <a
                href={linkUrl}
                className=\"underline uppercase font-bold ml-2 hover:opacity-80 transition-opacity\"
              >
                {linkText} â†’
              </a>
            )}
          </div>
          <button
            onClick={handleDismiss}
            className=\"text-white/80 hover:text-white text-base leading-none ml-4\"
          >
            âœ•
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationBanner;
