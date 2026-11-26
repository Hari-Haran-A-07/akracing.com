import React from 'react';

const SteeringAngleMeter = ({ angleDeg = 14.5, maxAngleDeg = 180 }) => {
  const clampedAngle = Math.max(-maxAngleDeg, Math.min(maxAngleDeg, angleDeg));
  const isLeft = clampedAngle < 0;

  return (
    <div className=\"p-4 rounded-xl bg-gray-900/60 border border-gray-800 font-mono text-center\">
      <span className=\"text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-2\">
        Steering Rack Angle
      </span>
      <div className=\"relative w-24 h-24 mx-auto flex items-center justify-center my-2\">
        {/* Outer Wheel Rim */}
        <div className=\"w-full h-full rounded-full border-4 border-gray-700 relative flex items-center justify-center\">
          {/* Wheel rotation indicator */}
          <div
            className=\"w-full h-1 bg-red-600 absolute transition-transform duration-75\"
            style={{ transform: otate(\deg) }}
          />
          <div className=\"w-4 h-4 rounded-full bg-white z-10\" />
        </div>
      </div>
      <div className=\"text-xl font-black text-white\">
        {Math.abs(clampedAngle).toFixed(1)}° <span className=\"text-xs text-red-500 font-bold\">{isLeft ? 'LEFT' : 'RIGHT'}</span>
      </div>
      <span className=\"text-[10px] text-gray-500 block mt-1\">Lock: ±{maxAngleDeg}°</span>
    </div>
  );
};

export default SteeringAngleMeter;
