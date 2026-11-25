import React from 'react';

const DRSStatusIndicator = ({ isAvailable = false, isEngaged = false, deltaToCarAheadSec = 0.85 }) => {
  return (
    <div className=\"p-3 rounded-xl bg-gray-900/60 border border-gray-800 font-mono text-center\">
      <div className=\"flex items-center justify-between text-xs mb-1\">
        <span className=\"text-gray-400 uppercase font-bold\">DRS FLAP WING</span>
        <span className={ont-bold \}>
          {isEngaged ? 'ENGAGED' : (isAvailable ? 'AVAILABLE' : 'DISABLED')}
        </span>
      </div>
      <div className=\"w-full h-3 bg-gray-800 rounded-full overflow-hidden my-1\">
        <div className={h-full transition-all duration-150 \} />
      </div>
      <span className=\"text-[10px] text-gray-500 block\">GAP: {deltaToCarAheadSec.toFixed(2)}s (&lt; 1.00s for DRS)</span>
    </div>
  );
};

export default DRSStatusIndicator;
