import React from 'react';

const GForceFrictionCircle = ({ lateralG = 1.6, longitudinalG = -2.1, maxG = 4.0, size = 180 }) => {
  const radius = size / 2;
  const padding = 15;
  const usableRadius = radius - padding;

  // Scale G values to circle coordinates
  const posX = radius + (lateralG / maxG) * usableRadius;
  const posY = radius - (longitudinalG / maxG) * usableRadius;

  return (
    <div className=\"p-4 rounded-2xl bg-gray-900/60 border border-gray-800 flex flex-col items-center justify-center font-mono\">
      <span className=\"text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2\">
        Traction Friction Circle
      </span>
      <div className=\"relative\" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          {/* Concentric G circles */}
          {[1, 2, 3, 4].map((g) => (
            <circle
              key={g}
              cx={radius}
              cy={radius}
              r={(g / maxG) * usableRadius}
              stroke=\"#1f2937\"
              strokeWidth=\"1\"
              fill=\"none\"
            />
          ))}
          {/* Axis crosshairs */}
          <line x1={padding} y1={radius} x2={size - padding} y2={radius} stroke=\"#374151\" strokeDasharray=\"3 3\" />
          <line x1={radius} y1={padding} x2={radius} y2={size - padding} stroke=\"#374151\" strokeDasharray=\"3 3\" />

          {/* G force vector point */}
          <circle cx={posX} cy={posY} r=\"5\" fill=\"#dc2626\" filter=\"drop-shadow(0 0 6px #dc2626)\" />
        </svg>
      </div>
      <div className=\"flex justify-between w-full text-[10px] text-gray-400 mt-2 px-2\">
        <span>Lat: {lateralG.toFixed(2)}G</span>
        <span>Long: {longitudinalG.toFixed(2)}G</span>
      </div>
    </div>
  );
};

export default GForceFrictionCircle;
