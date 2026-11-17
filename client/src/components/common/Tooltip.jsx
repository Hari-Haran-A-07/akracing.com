import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const positions = {
  top: { anchor: 'bottom-full left-1/2 -translate-x-1/2 mb-2', arrow: 'top-full left-1/2 -translate-x-1/2 border-t-gray-800' },
  bottom: { anchor: 'top-full left-1/2 -translate-x-1/2 mt-2', arrow: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-800' },
  left: { anchor: 'right-full top-1/2 -translate-y-1/2 mr-2', arrow: 'left-full top-1/2 -translate-y-1/2 border-l-gray-800' },
  right: { anchor: 'left-full top-1/2 -translate-y-1/2 ml-2', arrow: 'right-full top-1/2 -translate-y-1/2 border-r-gray-800' },
};

const Tooltip = ({ children, content, position = 'top', delay = 200 }) => {
  const [visible, setVisible] = useState(false);
  let timeout;

  const show = () => { timeout = setTimeout(() => setVisible(true), delay); };
  const hide = () => { clearTimeout(timeout); setVisible(false); };
  const pos = positions[position] || positions.top;

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      <AnimatePresence>
        {visible && content && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            role="tooltip"
            className={'absolute z-50 px-3 py-1.5 text-xs font-medium text-white bg-gray-800 rounded-lg shadow-lg whitespace-nowrap pointer-events-none ' + pos.anchor}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
