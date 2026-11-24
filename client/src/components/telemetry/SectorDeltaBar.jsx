import React from 'react';

const SectorDeltaBar = ({ s1Status = 'purple', s2Status = 'green', s3Status = 'yellow' }) => {
  const colors = {
    purple: 'bg-purple-600 text-white shadow-purple-500/30',
    green: 'bg-emerald-500 text-black',
    yellow: 'bg-yellow-400 text-black',
    white: 'bg-gray-800 text-gray-400',
  };

  return (
    <div className=\"flex items-center gap-1.5 font-mono text-[10px] font-black\">
      <div className={px-2.5 py-1 rounded shadow-sm flex-1 text-center \}>
        S1
      </div>
      <div className={px-2.5 py-1 rounded shadow-sm flex-1 text-center \}>
        S2
      </div>
      <div className={px-2.5 py-1 rounded shadow-sm flex-1 text-center \}>
        S3
      </div>
    </div>
  );
};

export default SectorDeltaBar;
