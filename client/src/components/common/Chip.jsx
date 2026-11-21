import React from 'react';

const Chip = ({ label, active = false, onClick, onRemove, icon, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span
      onClick={onClick}
      className={inline-flex items-center gap-1.5 rounded-full font-mono font-semibold uppercase tracking-wider transition-all select-none \ \ \ \}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className=\"ml-1 hover:text-red-300 transition-colors\"
        >
          âœ•
        </button>
      )}
    </span>
  );
};

export default Chip;
