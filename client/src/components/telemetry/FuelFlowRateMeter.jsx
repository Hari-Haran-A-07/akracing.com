import React from 'react';

const FuelFlowRateMeter = ({ currentRateKgH = 96.8, maxLimitKgH = 100.0 }) => {
  const pct = Math.min(100, (currentRateKgH / maxLimitKgH) * 100);
  const isNearLimit = currentRateKgH > 98.5;

  return (
    <div className=\"p-4 rounded-xl bg-gray-900/60 border border-gray-800 font-mono text-center\">
      <span className=\"text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1\">
        FIA Fuel Mass Flow Meter
      </span>
      <div className=\"flex items-baseline justify-center gap-1 my-1\">
        <span className={	ext-3xl font-black \}>
          {currentRateKgH.toFixed(1)}
        </span>
        <span className=\"text-xs text-gray-400 font-bold\">KG/H</span>
      </div>
      <div className=\"w-full h-3 bg-gray-800 rounded-full overflow-hidden relative my-2\">
        <div
          className={h-full transition-all duration-75 \}
          style={{ width: \% }}
        />
        {/* Regulatory ceiling line at 100% */}
        <div className=\"absolute right-0 top-0 bottom-0 w-0.5 bg-red-500\" />
      </div>
      <span className=\"text-[10px] text-gray-500 block\">LIMIT: 100.0 kg/h FIA Ultrasonic Transducer</span>
    </div>
  );
};

export default FuelFlowRateMeter;
