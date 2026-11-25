import React from 'react';

const TelemetryDial = ({ value = 0, min = 0, max = 100, label = 'Metric', unit = '', size = 140 }) => {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  // Needle rotation from -120deg to +120deg (240deg sweep)
  const rotation = -120 + (percentage / 100) * 240;

  return (
    <div className=\"flex flex-col items-center justify-center font-mono p-3 bg-gray-900/60 border border-gray-800 rounded-xl\" style={{ width: size, height: size + 20 }}>
      <div className=\"relative flex items-center justify-center\" style={{ width: size - 20, height: size - 20 }}>
        {/* Dial Face */}
        <svg width={size - 20} height={size - 20} className=\"absolute inset-0\">
          <circle cx=\"50%\" cy=\"50%\" r=\"42%\" stroke=\"#1f2937\" strokeWidth=\"6\" fill=\"none\" />
          <circle cx=\"50%\" cy=\"50%\" r=\"42%\" stroke=\"#dc2626\" strokeWidth=\"6\" strokeDasharray=\"180 260\" strokeLinecap=\"round\" fill=\"none\" />
        </svg>
        {/* Needle */}
        <div
          className=\"absolute w-1 bg-red-600 origin-bottom transition-transform duration-100 ease-out rounded-full\"
          style={{ height: '38%', bottom: '50%', transform: otate(\deg) }}
        />
        <div className=\"w-3 h-3 rounded-full bg-white z-10 shadow-md\" />
      </div>
      <span className=\"text-sm font-black text-white mt-1\">{value} <span className=\"text-[10px] text-gray-400 font-normal\">{unit}</span></span>
      <span className=\"text-[9px] text-gray-500 uppercase tracking-widest\">{label}</span>
    </div>
  );
};

export default TelemetryDial;
