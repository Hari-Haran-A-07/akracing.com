import React from 'react';

const PitLaneSpeedLimiter = ({ isActive = false, speedKmh = 58.4, speedLimitKmh = 60 }) => {
  if (!isActive) return null;

  const isExceeding = speedKmh > speedLimitKmh;

  return (
    <div className={p-4 rounded-xl border text-center font-mono \}>
      <span className=\"text-xs font-black uppercase tracking-widest block\">
        ⚠️ PIT SPEED LIMITER ENGAGED
      </span>
      <div className=\"text-3xl font-black my-1\">
        {speedKmh.toFixed(1)} <span className=\"text-xs font-normal\">/ {speedLimitKmh} KM/H</span>
      </div>
      <span className=\"text-[10px] uppercase tracking-wider block\">
        {isExceeding ? 'CRITICAL: REDUCE THROTTLE IMMEDIATELY' : 'GEAR 1 LOCKED - NOMINAL'}
      </span>
    </div>
  );
};

export default PitLaneSpeedLimiter;
