import React from 'react';

const CockpitTemperatureGauge = ({ cabinTempC = 44.5, driverVentFlowPct = 85, maxSafeTempC = 55 }) => {
  const isHighHeat = cabinTempC > maxSafeTempC;

  return (
    <div className={p-4 rounded-xl border font-mono text-center \}>
      <span className=\"text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-2\">
        Cockpit Environment & Driver Thermal Load
      </span>
      <div className=\"flex justify-around items-center my-2\">
        <div>
          <span className=\"text-[10px] text-gray-500 block\">CABIN TEMP</span>
          <span className={	ext-2xl font-black \}>
            {cabinTempC}°C
          </span>
        </div>
        <div>
          <span className=\"text-[10px] text-gray-500 block\">COOL SUIT FLOW</span>
          <span className=\"text-2xl font-black text-cyan-400\">{driverVentFlowPct}%</span>
        </div>
      </div>
      <span className=\"text-[10px] text-gray-500 block mt-1\">
        {isHighHeat ? 'WARNING: Driver heat stress threshold exceeded' : 'NOMINAL: Helmet duct active'}
      </span>
    </div>
  );
};

export default CockpitTemperatureGauge;
