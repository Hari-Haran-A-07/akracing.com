import React from 'react';

const RustEngineThroughputMeter = ({ throughputMsgsPerSec = 12400, droppedFrames = 0 }) => {
  return (
    <div className=\"p-5 rounded-2xl bg-gray-900/60 border border-gray-800 font-mono text-center\">
      <span className=\"text-[10px] text-red-500 font-bold uppercase tracking-widest block mb-1\">
        akr-telemetry-engine (Rust)
      </span>
      <span className=\"text-3xl font-black text-white block my-2\">
        {throughputMsgsPerSec.toLocaleString()}
      </span>
      <span className=\"text-[10px] text-gray-400 uppercase tracking-wider block\">
        Frames / Second @ Zero Allocation
      </span>
      <span className=\"text-[10px] text-emerald-400 mt-2 block font-semibold\">
        Dropped: {droppedFrames} (0.00%)
      </span>
    </div>
  );
};

export default RustEngineThroughputMeter;
