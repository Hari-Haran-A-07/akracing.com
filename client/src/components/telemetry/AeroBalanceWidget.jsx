import React from 'react';

const AeroBalanceWidget = ({ frontBalancePct = 42.5 }) => {
  const rearBalancePct = parseFloat((100 - frontBalancePct).toFixed(1));

  return (
    <div className=\"p-4 rounded-xl bg-gray-900/60 border border-gray-800 font-mono text-center\">
      <span className=\"text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-2\">
        Aerodynamic Balance Bias
      </span>
      <div className=\"flex justify-between items-center text-xs font-bold my-1\">
        <span className=\"text-red-400\">FRONT: {frontBalancePct}%</span>
        <span className=\"text-blue-400\">REAR: {rearBalancePct}%</span>
      </div>
      <div className=\"w-full h-2.5 bg-gray-800 rounded-full overflow-hidden flex my-2\">
        <div className=\"h-full bg-red-600 transition-all duration-200\" style={{ width: \% }} />
        <div className=\"h-full bg-blue-600 transition-all duration-200\" style={{ width: \% }} />
      </div>
      <span className=\"text-[10px] text-gray-500 block\">Ground-Effect Underfloor Diffuser</span>
    </div>
  );
};

export default AeroBalanceWidget;
