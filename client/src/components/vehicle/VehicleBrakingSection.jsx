import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Disc, Flame, Shield, Activity, Zap } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const VehicleBrakingSection = () => {
  const { playClick } = useAudio();
  const [brakeBias, setBrakeBias] = useState(54); // 54% front bias

  return (
    <section id="braking" className="py-24 px-6 sm:px-12 bg-racing-surface border-b border-racing-border relative select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                DECELERATION & THERMAL MANAGEMENT
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              RACING <span className="text-racing-red">BRAKING SYSTEM</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-widest">
              MONOBLOC ALUMINUM CALIPERS &bull; 380MM VENTILATED SLOTTED ROTORS &bull; 2.8G PEAK DECELERATION
            </p>
          </div>

          <div className="px-4 py-2 bg-racing-black border border-white/10 rounded font-mono text-xs text-gray-300">
            PEAK DECELERATION: <strong className="text-racing-red">2.8 G</strong>
          </div>
        </div>

        {/* Visual Disc & Spec Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Rotating Thermal Brake Disc Visual */}
          <div className="lg:col-span-6 bg-racing-black/90 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl min-h-[380px]">
            <div className="absolute inset-0 bg-carbon-pattern opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-racing-red/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Brake Disc Schematic Visual */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Spinning Disc Rotor */}
              <motion.div
                className="w-56 h-56 rounded-full border-4 border-dashed border-gray-400/40 relative flex items-center justify-center shadow-[0_0_30px_rgba(225,6,0,0.3)] bg-gradient-to-tr from-gray-900 via-racing-darkRed/30 to-gray-800"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              >
                {/* Slotted Rotor Radial Lines */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <div
                    key={deg}
                    className="absolute w-full h-[1px] bg-white/20 origin-center"
                    style={{ transform: `rotate(${deg}deg)` }}
                  />
                ))}
                {/* Center Hub */}
                <div className="w-24 h-24 rounded-full bg-racing-black border-2 border-racing-red/60 flex flex-col items-center justify-center text-[9px] font-mono text-white/60">
                  <span className="text-racing-red font-bold">BREMBO</span>
                  <span>380MM</span>
                </div>
              </motion.div>

              {/* Fixed 6-Piston Caliper */}
              <div className="absolute top-0 right-2 w-20 h-32 bg-racing-red rounded-lg border border-white/20 shadow-[0_0_20px_#E10600] flex flex-col items-center justify-center text-[10px] font-mono font-black text-white transform -rotate-12 z-10">
                <span>6-PISTON</span>
                <span className="text-[8px] font-normal text-white/80">MONOBLOC</span>
              </div>
            </div>

            <div className="mt-6 text-center font-mono text-xs text-gray-400">
              <span className="text-racing-red font-bold">THERMAL RATING: </span>
              <span>SUSTAINED UP TO 750°C AT LE MANS / SPA CHICANES</span>
            </div>
          </div>

          {/* Right Column: Specs & Cockpit Brake Bias Adjuster */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-racing-black/80 border border-white/10 rounded-xl space-y-1">
                <div className="text-[10px] font-mono text-racing-red uppercase">FRONT BRAKES</div>
                <div className="font-display text-lg font-black text-white">6-PISTON ALUMINUM</div>
                <p className="text-xs font-sans text-gray-400">380 mm × 32 mm internally vented slotted steel rotors.</p>
              </div>

              <div className="p-5 bg-racing-black/80 border border-white/10 rounded-xl space-y-1">
                <div className="text-[10px] font-mono text-racing-red uppercase">REAR BRAKES</div>
                <div className="font-display text-lg font-black text-white">4-PISTON MONOBLOC</div>
                <p className="text-xs font-sans text-gray-400">380 mm × 32 mm rotors with integrated handbrake mechanism.</p>
              </div>
            </div>

            {/* Cockpit Brake Balance Bias Slider */}
            <div className="p-6 bg-racing-black/90 border border-white/10 rounded-xl space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-gray-400 uppercase">COCKPIT BRAKE BIAS ADJUSTMENT</span>
                <span className="text-racing-red font-bold">{brakeBias}% FRONT / {100 - brakeBias}% REAR</span>
              </div>

              <input
                type="range"
                min="48"
                max="60"
                value={brakeBias}
                onChange={(e) => {
                  setBrakeBias(Number(e.target.value));
                  playClick();
                }}
                className="w-full accent-racing-red cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-mono text-gray-500">
                <span>48% (OVERSTEER STABILITY)</span>
                <span>54% (NOMINAL GT3)</span>
                <span>60% (HEAVY RAIN / TRAIL BRAKE)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
