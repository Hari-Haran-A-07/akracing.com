import React from 'react';

const BrakeDuctAirflowIndicator = ({ ductOpenPct = 60, airflowCfm = 420, rotorTempC = 620 }) => {
  return (
    <div className=\"p-4 rounded-xl bg-gray-900/60 border border-gray-800 font-mono text-center\">
      <span className=\"text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-2\">
        Brake Duct Aero & Airflow
      </span>
      <div className=\"flex justify-around items-center my-2\">
        <div>
          <span className=\"text-[10px] text-gray-500 block\">DUCT FLAP</span>
          <span className=\"text-2xl font-black text-cyan-400\">{ductOpenPct}%</span>
        </div>
        <div>
          <span className=\"text-[10px] text-gray-500 block\">MASS AIRFLOW</span>
          <span className=\"text-2xl font-black text-white\">{airflowCfm} <span className=\"text-xs text-gray-500 font-normal\">CFM</span></span>
        </div>
      </div>
      <div className=\"w-full h-2 bg-gray-800 rounded-full overflow-hidden my-2\">
        <div className=\"h-full bg-cyan-500 transition-all duration-150\" style={{ width: \% }} />
      </div>
      <span className=\"text-[10px] text-gray-500 block\">ROTOR TEMP: {rotorTempC}°C (Optimal 450-700°C)</span>
    </div>
  );
};

export default BrakeDuctAirflowIndicator;
