import React from 'react';

const MLConfidenceGauge = ({ confidence = 0.942, model = 'PyTorch-LSTM-PitStrategy-v4' }) => {
  const percentage = Math.round(confidence * 100);

  return (
    <div className=\"p-5 rounded-2xl bg-gray-900/60 border border-gray-800 font-mono text-center\">
      <span className=\"text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1\">
        Strategy ML Confidence
      </span>
      <span className=\"text-3xl font-black text-emerald-400 block my-2\">
        {percentage}%
      </span>
      <div className=\"w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-3\">
        <div className=\"h-full bg-emerald-500\" style={{ width: \% }} />
      </div>
      <span className=\"text-[10px] text-gray-500 truncate block\">Model: {model}</span>
    </div>
  );
};

export default MLConfidenceGauge;
