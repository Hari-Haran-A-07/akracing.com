import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AccordionItem = ({ title, children, isOpen, onToggle, id }) => {
  return (
    <div className=\"border border-gray-800 rounded-xl overflow-hidden bg-gray-900/40 mb-3 transition-colors hover:border-gray-700\">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={ccordion-content-\}
        className=\"w-full px-6 py-4 flex items-center justify-between text-left font-mono text-sm uppercase tracking-wider text-white transition-colors\"
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className=\"text-red-500 font-bold ml-4\"
        >
          â–¼
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={ccordion-content-\}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className=\"px-6 pb-5 pt-1 text-gray-400 text-sm border-t border-gray-800/60 leading-relaxed font-sans\">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion = ({ items = [], allowMultiple = false }) => {
  const [openIndices, setOpenIndices] = useState([0]);

  const toggle = (idx) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(idx) ? [] : [idx]));
    }
  };

  return (
    <div className=\"w-full\">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          id={idx}
          title={item.title}
          isOpen={openIndices.includes(idx)}
          onToggle={() => toggle(idx)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
