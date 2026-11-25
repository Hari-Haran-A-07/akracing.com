import React from 'react';

const ThermalBar = ({ label, currentC, minC = 50, maxC = 130, optimalMinC = 85, optimalMaxC = 105 }) => {
  const pct = Math.min(100, Math.max(0, ((currentC - minC) / (maxC - minC)) * 100));
  const isOptimal = currentC >= optimalMinC && currentC <= optimalMaxC;
  const isOverheating = currentC > optimalMaxC;

  return (
    <div className=\"mb-2 font-mono text-xs\">
      <div className=\"flex justify-between mb-1\">
        <span className=\"text-gray-400 uppercase\">{label}</span>
        <span className={ont-bold \}>
          {currentC}°C
        </span>
      </div>
      <div className=\"w-full h-2 bg-gray-800 rounded-full overflow-hidden\">
        <div
          className={h-full transition-all duration-200 \}
          style={{ width: \% }}
        />
      </div>
    </div>
  );
};

const WaterOilThermalGauge = ({ waterTempC = 92, oilTempC = 104 }) => {
  return (
    <div className=\"p-4 bg-gray-900/60 border border-gray-800 rounded-xl font-mono\">
      <span className=\"text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-3 text-center\">
        Powertrain Thermal Management
      </span>
      <ThermalBar label=\"Water Jacket\" currentC={waterTempC} optimalMinC={80} optimalMaxC={98} />
      <ThermalBar label=\"Engine Oil\" currentC={oilTempC} optimalMinC={90} optimalMaxC={110} />
    </div>
  );
};

export default WaterOilThermalGauge;
