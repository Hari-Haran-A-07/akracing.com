import React from 'react';

const GearIndicator = ({ gear = 3, rpm = 7200, redlineRpm = 8750 }) => {
  const rpmPct = Math.min(100, (rpm / redlineRpm) * 100);
  const isShiftWarning = rpmPct > 92;

  const displayGear = gear === 0 ? 'N' : (gear === -1 ? 'R' : gear);

  return (
    <div className={p-6 rounded-2xl border text-center font-mono flex flex-col items-center justify-center \}>
      {/* Shift light bar */}
      <div className=\"flex gap-1 mb-3\">
        {Array.from({ length: 8 }, (_, i) => {
          const active = (i / 8) * 100 < rpmPct;
          const isRed = i >= 6;
          return (
            <div
              key={i}
              className={w-3 h-2 rounded-sm \}
            />
          );
        })}
      </div>

      <span className=\"text-5xl font-black text-white\">{displayGear}</span>
      <span className=\"text-xs text-gray-400 font-bold mt-1\">{rpm} RPM</span>
    </div>
  );
};

export default GearIndicator;
