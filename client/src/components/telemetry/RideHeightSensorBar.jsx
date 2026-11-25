import React from 'react';

const RideHeightSensorBar = ({ frontHeightMm = 34, rearHeightMm = 68, minSafeHeightMm = 25 }) => {
  const isBottomingOut = frontHeightMm < minSafeHeightMm;

  return (
    <div className={p-4 rounded-xl border font-mono text-center \}>
      <span className=\"text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-2\">
        Optical Ride Height & Ground Clearance
      </span>
      <div className=\"grid grid-cols-2 gap-4 my-1\">
        <div>
          <span className=\"text-xs text-gray-400 block\">FRONT SPLITTER</span>
          <span className={	ext-2xl font-black \}>
            {frontHeightMm} <span className=\"text-xs font-normal text-gray-500\">MM</span>
          </span>
        </div>
        <div>
          <span className=\"text-xs text-gray-400 block\">REAR DIFFUSER</span>
          <span className=\"text-2xl font-black text-white\">
            {rearHeightMm} <span className=\"text-xs font-normal text-gray-500\">MM</span>
          </span>
        </div>
      </div>
      <span className=\"text-[10px] text-gray-500 block mt-1\">
        RAKE: {(rearHeightMm - frontHeightMm)}mm Forward Aero Angle
      </span>
    </div>
  );
};

export default RideHeightSensorBar;
