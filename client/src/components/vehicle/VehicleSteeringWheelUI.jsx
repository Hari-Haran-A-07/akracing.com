import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, ShieldAlert, Cpu, Zap, Activity, Volume2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const VehicleSteeringWheelUI = () => {
  const { playClick, playBeep, playShiftSound } = useAudio();

  const [pitLimiter, setPitLimiter] = useState(false);
  const [radioActive, setRadioActive] = useState(false);
  const [tcLevel, setTcLevel] = useState(4); // 1-10
  const [absLevel, setAbsLevel] = useState(6); // 1-12
  const [engineMap, setEngineMap] = useState('RACE 1'); // 'RACE 1', 'QUAL', 'WET', 'SAFETY'

  const togglePit = () => {
    setPitLimiter(!pitLimiter);
    playClick();
  };

  const toggleRadio = () => {
    setRadioActive(true);
    playBeep();
    setTimeout(() => setRadioActive(false), 2000);
  };

  const cycleTc = () => {
    setTcLevel((prev) => (prev >= 10 ? 1 : prev + 1));
    playClick();
  };

  const cycleAbs = () => {
    setAbsLevel((prev) => (prev >= 12 ? 1 : prev + 1));
    playClick();
  };

  const cycleMap = () => {
    const maps = ['RACE 1', 'QUAL 1', 'WET 2', 'SAFETY CAR'];
    const idx = maps.indexOf(engineMap);
    setEngineMap(maps[(idx + 1) % maps.length]);
    playClick();
  };

  return (
    <section id="steering" className="py-24 px-6 sm:px-12 bg-racing-surface border-b border-racing-border relative select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                INTERACTIVE MOTORSPORT INTERFACE
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              STEERING WHEEL <span className="text-racing-red">SIMULATOR</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-widest">
              CLICK BUTTONS TO ADJUST DRIVER MAPS &bull; LIVE TELEMETRY OLED FEEDBACK
            </p>
          </div>

          <div className="px-4 py-2 bg-racing-black border border-white/10 rounded font-mono text-xs text-gray-300">
            SIMULATOR: <strong className="text-racing-red">ACTIVE</strong>
          </div>
        </div>

        {/* Interactive Steering Wheel Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Steering Wheel Hardware Canvas */}
          <div className="lg:col-span-7 bg-racing-black/95 border-2 border-white/10 rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl flex flex-col items-center justify-center min-h-[460px]">
            {/* Steering Wheel Rim Silhouette */}
            <div className="relative w-full max-w-md aspect-[16/11] bg-gradient-to-b from-racing-surface3 to-racing-black border-4 border-gray-700 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative">
              {/* Carbon Texture on Wheel Hub */}
              <div className="absolute inset-0 bg-carbon-pattern opacity-40 rounded-3xl pointer-events-none" />

              {/* Top F1 Shift Light Bar */}
              <div className="flex items-center justify-center gap-1.5 p-1.5 bg-black/90 rounded-md border border-white/10 shadow-inner z-10 mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div
                    key={i}
                    className={`w-3 sm:w-4 h-2 rounded-sm ${
                      pitLimiter
                        ? 'bg-racing-red animate-pulse'
                        : i <= 3
                        ? 'bg-emerald-500 shadow-[0_0_6px_#10B981]'
                        : i <= 6
                        ? 'bg-amber-400 shadow-[0_0_6px_#FBBF24]'
                        : 'bg-racing-red shadow-[0_0_6px_#E10600]'
                    }`}
                  />
                ))}
              </div>

              {/* Center Digital OLED Dash Display */}
              <div className="my-auto bg-black/90 border-2 border-white/20 rounded-xl p-4 text-center font-mono relative overflow-hidden z-10 shadow-2xl">
                {/* Status Bar */}
                <div className="flex justify-between items-center text-[10px] text-gray-400 border-b border-white/10 pb-1 mb-2">
                  <span>LAP 14 &bull; SPA</span>
                  {pitLimiter ? (
                    <span className="text-racing-red font-bold animate-pulse">PIT LIMIT: 60 KM/H</span>
                  ) : radioActive ? (
                    <span className="text-telemetryCyan font-bold animate-pulse">RADIO: TRANSMITTING</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">DELTA: -0.342s</span>
                  )}
                </div>

                {/* Main Readout */}
                <div className="grid grid-cols-3 gap-2 items-center py-1">
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase block">SPEED</span>
                    <span className="font-display text-2xl sm:text-3xl font-black text-white">
                      {pitLimiter ? '60' : '248'}
                    </span>
                  </div>

                  <div className="border-x border-white/10">
                    <span className="text-[9px] text-racing-red uppercase block font-bold">GEAR</span>
                    <span className="font-display text-4xl sm:text-5xl font-black text-racing-red">
                      {pitLimiter ? '2' : '5'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] text-gray-500 uppercase block">RPM</span>
                    <span className="font-display text-2xl sm:text-3xl font-black text-white">
                      {pitLimiter ? '3,800' : '8,150'}
                    </span>
                  </div>
                </div>

                {/* Sub-maps status */}
                <div className="flex justify-between items-center text-[9px] text-gray-400 pt-2 border-t border-white/10 mt-2">
                  <span>TC: <strong className="text-white">MAP {tcLevel}</strong></span>
                  <span>ABS: <strong className="text-white">MAP {absLevel}</strong></span>
                  <span>ENGINE: <strong className="text-racing-red">{engineMap}</strong></span>
                </div>
              </div>

              {/* Steering Wheel Thumb Buttons */}
              <div className="grid grid-cols-5 gap-2 z-10 pt-2">
                <button
                  onClick={togglePit}
                  className={`py-2 px-1 rounded text-[9px] font-mono font-black uppercase transition-all flex flex-col items-center ${
                    pitLimiter ? 'bg-racing-red text-white shadow-[0_0_12px_#E10600]' : 'bg-racing-surface border border-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  <span>PIT</span>
                  <span className="text-[7px] text-gray-400">LIMIT</span>
                </button>

                <button
                  onClick={toggleRadio}
                  className={`py-2 px-1 rounded text-[9px] font-mono font-black uppercase transition-all flex flex-col items-center ${
                    radioActive ? 'bg-telemetryBlue text-white shadow-[0_0_12px_#1677FF]' : 'bg-racing-surface border border-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  <span>RADIO</span>
                  <span className="text-[7px] text-gray-400">COMMS</span>
                </button>

                <button
                  onClick={cycleTc}
                  className="py-2 px-1 rounded text-[9px] font-mono font-black uppercase bg-racing-surface border border-white/10 text-gray-300 hover:bg-racing-surface2 hover:text-white flex flex-col items-center"
                >
                  <span>TC</span>
                  <span className="text-[7px] text-racing-red font-bold">LVL {tcLevel}</span>
                </button>

                <button
                  onClick={cycleAbs}
                  className="py-2 px-1 rounded text-[9px] font-mono font-black uppercase bg-racing-surface border border-white/10 text-gray-300 hover:bg-racing-surface2 hover:text-white flex flex-col items-center"
                >
                  <span>ABS</span>
                  <span className="text-[7px] text-racing-red font-bold">LVL {absLevel}</span>
                </button>

                <button
                  onClick={cycleMap}
                  className="py-2 px-1 rounded text-[9px] font-mono font-black uppercase bg-racing-surface border border-white/10 text-gray-300 hover:bg-racing-surface2 hover:text-white flex flex-col items-center"
                >
                  <span>MAP</span>
                  <span className="text-[7px] text-amber-400 font-bold">{engineMap.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Description & Function List */}
          <div className="lg:col-span-5 space-y-4 font-mono text-xs text-gray-400">
            <div className="p-5 bg-racing-black/80 border border-white/10 rounded-xl space-y-2">
              <div className="text-[10px] text-racing-red font-bold uppercase tracking-widest">PIT SPEED LIMITER (60 KM/H)</div>
              <p className="text-gray-300 font-sans leading-relaxed">
                Clicking [PIT] engages the electronic pit lane limiter, holding engine throttle at exactly 60 km/h in second gear conforming to FIA regulations.
              </p>
            </div>

            <div className="p-5 bg-racing-black/80 border border-white/10 rounded-xl space-y-2">
              <div className="text-[10px] text-racing-red font-bold uppercase tracking-widest">TRACTION CONTROL MAPS (1–10)</div>
              <p className="text-gray-300 font-sans leading-relaxed">
                Adjusts wheel-slip thresholds in real time. Map 1 provides maximum freedom for qualifying; Map 10 provides full wet-weather stability.
              </p>
            </div>

            <div className="p-5 bg-racing-black/80 border border-white/10 rounded-xl space-y-2">
              <div className="text-[10px] text-racing-red font-bold uppercase tracking-widest">MOTORSPORT ABS MAPS (1–12)</div>
              <p className="text-gray-300 font-sans leading-relaxed">
                Controls multi-channel anti-lock braking intervention across individual wheel brake calipers to prevent tyre flat-spotting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
