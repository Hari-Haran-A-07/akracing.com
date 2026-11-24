import React from 'react';

const DamperCorner = ({ label, deflectionMm, maxMm = 80 }) => {
  const pct = Math.min(100, Math.max(0, (deflectionMm / maxMm) * 100));

  return (
    <div className=\"flex flex-col items-center font-mono text-[11px]\">
      <span className=\"text-gray-400 font-bold mb-1\">{label}</span>
      <div className=\"w-4 h-24 bg-gray-800 rounded-full relative overflow-hidden flex flex-col justify-end p-0.5\">
        <div
          className=\"w-full bg-red-600 rounded-full transition-all duration-75\"
          style={{ height: \% }}
        />
      </div>
      <span className=\"text-white font-bold mt-1\">{deflectionMm}mm</span>
    </div>
  );
};

const SuspensionTravelGauge = ({ suspension = { fl: 38, fr: 42, rl: 28, rr: 31 } }) => {
  return (
    <div className=\"p-4 rounded-xl bg-gray-900/60 border border-gray-800 font-mono\">
      <span className=\"text-[10px] text-gray-400 uppercase tracking-widest font-bold block text-center mb-3\">
        KW Suspension Damper Stroke (mm)
      </span>
      <div className=\"grid grid-cols-4 gap-2 justify-items-center\">
        <DamperCorner label=\"FL\" deflectionMm={suspension.fl} />
        <DamperCorner label=\"FR\" deflectionMm={suspension.fr} />
        <DamperCorner label=\"RL\" deflectionMm={suspension.rl} />
        <DamperCorner label=\"RR\" deflectionMm={suspension.rr} />
      </div>
    </div>
  );
};

export default SuspensionTravelGauge;
