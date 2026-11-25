import React from 'react';

const TPMSCorner = ({ label, psi = 27.5, targetPsi = 28.0 }) => {
  const delta = parseFloat((psi - targetPsi).toFixed(1));
  const isOptimal = Math.abs(delta) <= 0.5;

  return (
    <div className=\"p-2.5 bg-black/50 border border-gray-800 rounded-lg text-center font-mono\">
      <span className=\"text-[9px] text-gray-500 font-bold block\">{label}</span>
      <span className={	ext-base font-black \}>
        {psi} <span className=\"text-[9px] font-normal text-gray-400\">PSI</span>
      </span>
      <span className=\"text-[9px] text-gray-500 block\">{delta > 0 ? +\ : delta}</span>
    </div>
  );
};

const TirePressureMonitor = ({ pressures = { fl: 27.8, fr: 28.1, rl: 27.4, rr: 27.6 } }) => {
  return (
    <div className=\"p-4 rounded-xl bg-gray-900/60 border border-gray-800 font-mono\">
      <span className=\"text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-3 text-center\">
        TPMS Tire Pressure Matrix
      </span>
      <div className=\"grid grid-cols-2 gap-2\">
        <TPMSCorner label=\"Front Left\" psi={pressures.fl} />
        <TPMSCorner label=\"Front Right\" psi={pressures.fr} />
        <TPMSCorner label=\"Rear Left\" psi={pressures.rl} />
        <TPMSCorner label=\"Rear Right\" psi={pressures.rr} />
      </div>
    </div>
  );
};

export default TirePressureMonitor;
