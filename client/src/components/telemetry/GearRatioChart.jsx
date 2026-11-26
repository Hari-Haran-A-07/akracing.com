import React from 'react';

const GEAR_RATIOS = [
  { gear: 1, ratio: 3.15, maxSpeedKmh: 94 },
  { gear: 2, ratio: 2.18, maxSpeedKmh: 136 },
  { gear: 3, ratio: 1.62, maxSpeedKmh: 182 },
  { gear: 4, ratio: 1.28, maxSpeedKmh: 231 },
  { gear: 5, ratio: 1.05, maxSpeedKmh: 278 },
  { gear: 6, ratio: 0.88, maxSpeedKmh: 312 },
];

const GearRatioChart = ({ currentGear = 3 }) => {
  return (
    <div className=\"p-4 rounded-xl bg-gray-900/60 border border-gray-800 font-mono\">
      <span className=\"text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-3 text-center\">
        Sequential 6-Speed Gear Ratios
      </span>
      <div className=\"space-y-1.5 text-xs\">
        {GEAR_RATIOS.map((g) => {
          const isActive = g.gear === currentGear;
          return (
            <div
              key={g.gear}
              className={lex items-center justify-between p-2 rounded \}
            >
              <span className=\"w-14\">GEAR {g.gear}</span>
              <span className=\"text-[11px] text-gray-500\">Ratio: {g.ratio.toFixed(2)}</span>
              <span className={\}>{g.maxSpeedKmh} KM/H</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GearRatioChart;
