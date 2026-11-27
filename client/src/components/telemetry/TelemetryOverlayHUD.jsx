import React from 'react';

const TelemetryOverlayHUD = ({ speedKmh = 278, rpm = 8450, gear = 5, throttlePct = 100, brakePct = 0 }) => {
  return (
    <div className=\"absolute bottom-6 left-6 z-30 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 font-mono text-white shadow-2xl flex items-center gap-6\">
      {/* Gear */}
      <div className=\"flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-red-600/20 border border-red-500/40\">
        <span className=\"text-4xl font-black text-red-500\">{gear === 0 ? 'N' : gear}</span>
        <span className=\"text-[9px] uppercase font-bold text-gray-400\">GEAR</span>
      </div>

      {/* Speed & RPM */}
      <div className=\"flex flex-col\">
        <div className=\"flex items-baseline gap-1\">
          <span className=\"text-4xl font-black tracking-tight\">{Math.round(speedKmh)}</span>
          <span className=\"text-xs text-gray-400 font-bold\">KM/H</span>
        </div>
        <span className=\"text-xs text-amber-400 font-semibold\">{rpm} RPM</span>
      </div>

      {/* Mini Pedal Traces */}
      <div className=\"flex flex-col gap-1.5 w-24\">
        <div className=\"flex items-center gap-1 text-[10px]\">
          <span className=\"text-emerald-400 w-3\">T</span>
          <div className=\"flex-1 h-2 bg-gray-800 rounded-full overflow-hidden\">
            <div className=\"h-full bg-emerald-500\" style={{ width: \% }} />
          </div>
        </div>
        <div className=\"flex items-center gap-1 text-[10px]\">
          <span className=\"text-red-400 w-3\">B</span>
          <div className=\"flex-1 h-2 bg-gray-800 rounded-full overflow-hidden\">
            <div className=\"h-full bg-red-600\" style={{ width: \% }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelemetryOverlayHUD;
