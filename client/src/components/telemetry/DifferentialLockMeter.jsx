import React from 'react';

const DifferentialLockMeter = ({ lockPct = 65, phase = 'POWER' }) => {
  return (
    <div className=\"p-4 rounded-xl bg-gray-900/60 border border-gray-800 font-mono text-center\">
      <span className=\"text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-2\">
        Mechanical LSD Lock ({phase})
      </span>
      <div className=\"flex items-center justify-center gap-2 my-2\">
        <span className=\"text-3xl font-black text-white\">{lockPct}</span>
        <span className=\"text-xs text-red-500 font-bold\">%</span>
      </div>
      <div className=\"w-full h-2 bg-gray-800 rounded-full overflow-hidden\">
        <div className=\"h-full bg-red-600 transition-all duration-150\" style={{ width: \% }} />
      </div>
      <span className=\"text-[10px] text-gray-500 block mt-2\">RAMP: 45° Accel / 65° Decel</span>
    </div>
  );
};

export default DifferentialLockMeter;
