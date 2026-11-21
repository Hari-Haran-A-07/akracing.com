import React from 'react';

const SpeedGauge = ({ speed = 0, maxSpeed = 350, unit = 'KM/H', size = 160 }) => {
  const clampedSpeed = Math.min(maxSpeed, Math.max(0, speed));
  const strokeWidth = 10;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  // Use a 240 degree gauge arc
  const arcLength = circumference * 0.75;
  const progress = (clampedSpeed / maxSpeed) * arcLength;

  return (
    <div className=\"relative inline-flex flex-col items-center justify-center font-mono\">
      <svg width={size} height={size} className=\"transform -rotate-135\">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke=\"#1f2937\"
          strokeWidth={strokeWidth}
          strokeDasharray={\ \}
          fill=\"none\"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke=\"#dc2626\"
          strokeWidth={strokeWidth}
          strokeDasharray={\ \}
          strokeLinecap=\"round\"
          fill=\"none\"
          className=\"transition-all duration-150 ease-out\"
        />
      </svg>
      <div className=\"absolute flex flex-col items-center\">
        <span className=\"text-3xl font-black text-white tracking-tighter\">{Math.round(clampedSpeed)}</span>
        <span className=\"text-[10px] text-gray-500 font-bold uppercase tracking-widest\">{unit}</span>
      </div>
    </div>
  );
};

export default SpeedGauge;
