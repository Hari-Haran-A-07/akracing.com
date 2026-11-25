import React from 'react';

const LinearGauge = ({ value = 50, max = 100, label = 'Level', unit = '%', color = 'bg-red-600' }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className=\"p-3 rounded-xl bg-gray-900/60 border border-gray-800 font-mono text-xs\">
      <div className=\"flex justify-between items-center mb-1.5\">
        <span className=\"text-gray-400 uppercase\">{label}</span>
        <span className=\"text-white font-bold\">{value}{unit}</span>
      </div>
      <div className=\"w-full h-2.5 bg-gray-800 rounded-full overflow-hidden\">
        <div className={h-full transition-all duration-150 \} style={{ width: \% }} />
      </div>
    </div>
  );
};

export default LinearGauge;
