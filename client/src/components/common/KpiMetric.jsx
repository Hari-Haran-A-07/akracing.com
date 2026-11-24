import React from 'react';

const KpiMetric = ({ label, value, unit, status = 'nominal', subtext, className = '' }) => {
  const statusStyles = {
    nominal: 'text-white',
    warning: 'text-amber-400',
    critical: 'text-red-500 animate-pulse',
    good: 'text-emerald-400',
  };

  return (
    <div className={p-4 rounded-xl bg-gray-900/50 border border-gray-800 font-mono \}>
      <span className=\"text-[10px] text-gray-400 uppercase tracking-widest block mb-1 font-semibold\">
        {label}
      </span>
      <div className=\"flex items-baseline gap-1.5\">
        <span className={	ext-2xl font-black tracking-tight \}>
          {value}
        </span>
        {unit && <span className=\"text-xs text-gray-400 font-bold\">{unit}</span>}
      </div>
      {subtext && <span className=\"text-[10px] text-gray-500 block mt-1\">{subtext}</span>}
    </div>
  );
};

export default KpiMetric;
