import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const positions = {
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    classes: 'right-0 top-0 bottom-0 max-w-md w-full',
  },
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    classes: 'left-0 top-0 bottom-0 max-w-md w-full',
  },
  bottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
    classes: 'bottom-0 left-0 right-0 max-h-[80vh] w-full',
  },
};

const Drawer = ({ isOpen, onClose, title, children, position = 'right' }) => {
  const pos = positions[position] || positions.right;

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className=\"fixed inset-0 z-50 flex overflow-hidden\">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className=\"fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity\"
          />

          <motion.div
            initial={pos.initial}
            animate={pos.animate}
            exit={pos.exit}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={ixed bg-gray-900 border-l border-gray-800 p-6 flex flex-col shadow-2xl z-50 \}
          >
            <div className=\"flex items-center justify-between pb-4 border-b border-gray-800 mb-6\">
              <h3 className=\"text-lg font-bold font-mono tracking-wider text-white uppercase\">
                {title}
              </h3>
              <button
                onClick={onClose}
                className=\"w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors\"
              >
                âœ•
              </button>
            </div>
            <div className=\"flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-800\">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
