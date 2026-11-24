import React from 'react';

const BadgeDelta = ({ delta = 0, isPurple = false, unit = 's', className = '' }) => {
  const isNegative = delta < 0;
  const isZero = delta === 0;

  const getStyle = () => {
    if (isPurple) return 'bg-purple-900/40 text-purple-300 border-purple-500/50 shadow-purple-500/20';
    if (isNegative) return 'bg-emerald-900/40 text-emerald-300 border-emerald-500/50';
    if (isZero) return 'bg-gray-800 text-gray-300 border-gray-700';
    return 'bg-amber-900/40 text-amber-300 border-amber-500/50';
  };

  const formatted = isZero ? '0.000' : (isNegative ? delta.toFixed(3) : +\);

  return (
    <span
      className={inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold border shadow-sm \ \}
    >
      {formatted}{unit}
    </span>
  );
};

export default BadgeDelta;
