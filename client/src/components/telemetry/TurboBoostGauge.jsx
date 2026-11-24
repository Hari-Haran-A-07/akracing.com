import React from 'react';

const TurboBoostGauge = ({ currentBar = 1.85, maxBar = 2.4, peakHoldBar = 2.12 }) => {
  const pct = Math.min(100, Math.max(0, (currentBar / maxBar) * 100));

  return (
    <div className=\"p-4 rounded-xl bg-gray-900/60 border border-gray-800 font-mono text-center\">
      <span className=\"text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1\">
        Turbo Manifold Absolute Pressure
      </span>
      <div className=\"flex items-baseline justify-center gap-1 my-1\">
        <span className=\"text-3xl font-black text-amber-400\">{currentBar.toFixed(2)}</span>
        <span className=\"text-xs text-gray-400 font-bold\">BAR</span>
      </div>
      <div className=\"w-full h-2.5 bg-gray-800 rounded-full overflow-hidden relative my-2\">
        <div className=\"h-full bg-amber-500 transition-all duration-75\" style={{ width: \% }} />
      </div>
      <div className=\"flex justify-between text-[10px] text-gray-500 px-1\">
        <span>VACUUM</span>
        <span>PEAK: {peakHoldBar.toFixed(2)} BAR</span>
      </div>
    </div>
  );
};

export default TurboBoostGauge;
