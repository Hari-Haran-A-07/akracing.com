import React from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch = ({ checked = false, onChange, label, disabled = false, size = 'md' }) => {
  const sizes = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 16 },
    md: { track: 'w-11 h-6', thumb: 'w-4 h-4', translate: 20 },
    lg: { track: 'w-14 h-8', thumb: 'w-6 h-6', translate: 24 },
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <label className={inline-flex items-center gap-3 select-none \}>
      <div
        onClick={() => !disabled && onChange && onChange(!checked)}
        className={elative rounded-full transition-colors duration-200 \ \}
      >
        <motion.div
          animate={{ x: checked ? currentSize.translate : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={bsolute top-1 rounded-full bg-white shadow-md \}
        />
      </div>
      {label && <span className=\"text-xs font-mono uppercase tracking-wider text-gray-300\">{label}</span>}
    </label>
  );
};

export default ToggleSwitch;
