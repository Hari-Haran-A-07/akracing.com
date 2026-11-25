import React from 'react';

const BrakeBiasDial = ({ frontBiasPct = 56.5, onAdjust }) => {
  const rearBiasPct = parseFloat((100 - frontBiasPct).toFixed(1));

  return (
    <div className=\"p-4 rounded-xl bg-gray-900/60 border border-gray-800 font-mono text-center\">
      <span className=\"text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-2\">
        Hydraulic Brake Bias
      </span>
      <div className=\"flex items-center justify-center gap-4 my-2\">
        {onAdjust && (
          <button
            onClick={() => onAdjust(frontBiasPct - 0.5)}
            className=\"w-7 h-7 rounded bg-gray-800 hover:bg-gray-700 text-white font-bold\"
          >
            -
          </button>
        )}
        <div className=\"text-2xl font-black text-white\">
          {frontBiasPct.toFixed(1)}% <span className=\"text-xs text-gray-400 font-normal\">FRONT</span>
        </div>
        {onAdjust && (
          <button
            onClick={() => onAdjust(frontBiasPct + 0.5)}
            className=\"w-7 h-7 rounded bg-gray-800 hover:bg-gray-700 text-white font-bold\"
          >
            +
          </button>
        )}
      </div>
      <span className=\"text-[10px] text-gray-500 block\">REAR: {rearBiasPct}%</span>
    </div>
  );
};

export default BrakeBiasDial;
