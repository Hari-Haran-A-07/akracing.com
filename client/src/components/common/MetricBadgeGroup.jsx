import React from 'react';

const MetricBadgeGroup = ({ metrics = [] }) => {
  return (
    <div className=\"flex flex-wrap items-center gap-2 font-mono\">
      {metrics.map((m, idx) => (
        <div
          key={m.label || idx}
          className=\"px-3 py-1.5 rounded-lg bg-gray-900/80 border border-gray-800 flex items-center gap-2\"
        >
          <span className=\"text-[10px] text-gray-500 uppercase font-bold\">{m.label}</span>
          <span className=\"text-xs font-black text-white\">{m.value}</span>
          {m.unit && <span className=\"text-[10px] text-red-500 font-bold\">{m.unit}</span>}
        </div>
      ))}
    </div>
  );
};

export default MetricBadgeGroup;
