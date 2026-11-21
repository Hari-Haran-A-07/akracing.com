import React from 'react';

const PedalTelemetryBar = ({ throttle = 0, brake = 0 }) => {
  return (
    <div className=\"p-4 rounded-xl bg-gray-900/60 border border-gray-800 font-mono text-xs\">
      <div className=\"flex justify-between items-center mb-1 text-[11px]\">
        <span className=\"text-emerald-400 font-bold uppercase\">Throttle</span>
        <span className=\"text-white\">{Math.round(throttle)}%</span>
      </div>
      <div className=\"w-full h-3 bg-gray-800 rounded-full overflow-hidden mb-3\">
        <div
          className=\"h-full bg-emerald-500 transition-all duration-100 ease-out\"
          style={{ width: \% }}
        />
      </div>

      <div className=\"flex justify-between items-center mb-1 text-[11px]\">
        <span className=\"text-red-500 font-bold uppercase\">Brake</span>
        <span className=\"text-white\">{Math.round(brake)}%</span>
      </div>
      <div className=\"w-full h-3 bg-gray-800 rounded-full overflow-hidden\">
        <div
          className=\"h-full bg-red-600 transition-all duration-100 ease-out\"
          style={{ width: \% }}
        />
      </div>
    </div>
  );
};

export default PedalTelemetryBar;
