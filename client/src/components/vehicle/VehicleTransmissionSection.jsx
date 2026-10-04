import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, Sliders } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const VehicleTransmissionSection = () => {
  const { playShiftSound, playClick } = useAudio();
  const [selectedGear, setSelectedGear] = useState('4');

  const gears = [
    { gear: 'N', ratio: '0.000', maxSpeed: '0 KM/H', desc: 'Neutral Disconnect' },
    { gear: '1', ratio: '3.167', maxSpeed: '78 KM/H', desc: 'Launch & Hairpin' },
    { gear: '2', ratio: '2.133', maxSpeed: '124 KM/H', desc: 'Technical Chicanes' },
    { gear: '3', ratio: '1.611', maxSpeed: '168 KM/H', desc: 'Medium Corner Exit' },
    { gear: '4', ratio: '1.294', maxSpeed: '216 KM/H', desc: 'High-Speed Sweepers' },
    { gear: '5', ratio: '1.080', maxSpeed: '268 KM/H', desc: 'Long Straight Pull' },
    { gear: '6', ratio: '0.929', maxSpeed: '315 KM/H', desc: 'Maximum Top Speed' },
  ];

  const currentInfo = gears.find(g => g.gear === selectedGear) || gears[4];

  const selectGear = (g) => {
    setSelectedGear(g);
    playShiftSound();
  };

  return (
    <section id="transmission" className="py-24 px-6 sm:px-12 bg-racing-surface border-b border-racing-border relative select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                DRIVELINE & TRANSAXLE KINEMATICS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              SEQUENTIAL <span className="text-racing-red">TRANSMISSION</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-widest">
              6-SPEED DOG-RING SEQUENTIAL &bull; PNEUMATIC PADDLE ACTUATION &bull; &lt;28MS SHIFTS
            </p>
          </div>

          <div className="px-4 py-2 bg-racing-black border border-white/10 rounded font-mono text-xs text-gray-300">
            SHIFT TIME: <strong className="text-racing-red">&lt; 28 MS</strong>
          </div>
        </div>

        {/* Interactive Gearbox Visualizer Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Gear Shift Display */}
          <div className="lg:col-span-6 bg-racing-black/90 border border-white/10 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                INTERACTIVE GEAR SELECTOR &bull; CLICK RATIO
              </span>
              <Cpu size={18} className="text-racing-red" />
            </div>

            {/* Gear Selector Buttons */}
            <div className="grid grid-cols-7 gap-2">
              {gears.map((g) => (
                <button
                  key={g.gear}
                  onClick={() => selectGear(g.gear)}
                  className={`py-3 sm:py-4 rounded font-display text-lg sm:text-2xl font-black uppercase transition-all flex flex-col items-center justify-center border ${
                    selectedGear === g.gear
                      ? 'bg-racing-red text-white border-racing-red shadow-[0_0_20px_rgba(225,6,0,0.5)] scale-105'
                      : 'bg-racing-surface/80 hover:bg-racing-surface2 text-gray-400 border-white/5'
                  }`}
                >
                  <span>{g.gear}</span>
                  <span className="text-[8px] font-mono opacity-60">GEAR</span>
                </button>
              ))}
            </div>

            {/* Selected Gear Stats Card */}
            <div className="p-4 bg-racing-surface/80 border border-white/10 rounded-lg space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-gray-400">ACTIVE GEAR: <strong className="text-white">GEAR {currentInfo.gear}</strong></span>
                <span className="text-racing-red font-bold">{currentInfo.desc}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2 bg-black/60 rounded border border-white/5">
                  <span className="text-[9px] text-gray-500 uppercase block">GEAR RATIO</span>
                  <span className="text-white font-bold text-sm">{currentInfo.ratio} : 1</span>
                </div>
                <div className="p-2 bg-black/60 rounded border border-white/5">
                  <span className="text-[9px] text-gray-500 uppercase block">MAX GEAR VELOCITY</span>
                  <span className="text-racing-red font-bold text-sm">{currentInfo.maxSpeed}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Specifications */}
          <div className="lg:col-span-6 space-y-4 font-mono text-xs text-gray-400">
            <div className="p-5 bg-racing-black/60 border border-white/10 rounded-xl space-y-2">
              <div className="text-[10px] text-racing-red font-bold uppercase tracking-widest">DOG-RING ENGAGEMENT</div>
              <p className="text-gray-300 font-sans leading-relaxed">
                Straight-cut dog-ring gears eliminate conventional synchromesh rings, enabling instant non-clutch upshifts under full throttle load during sprint and endurance stints.
              </p>
            </div>

            <div className="p-5 bg-racing-black/60 border border-white/10 rounded-xl space-y-2">
              <div className="text-[10px] text-racing-red font-bold uppercase tracking-widest">PNEUMATIC PADDLE ACTUATION</div>
              <p className="text-gray-300 font-sans leading-relaxed">
                Carbon-fiber steering wheel paddles trigger pneumatic valve actuators with integrated throttle-blip downshift matching, preventing rear axle lockup during heavy trail braking.
              </p>
            </div>

            <div className="p-5 bg-racing-black/60 border border-white/10 rounded-xl space-y-2">
              <div className="text-[10px] text-racing-red font-bold uppercase tracking-widest">MECHANICAL LIMITED SLIP DIFFERENTIAL</div>
              <p className="text-gray-300 font-sans leading-relaxed">
                Multi-plate mechanical differential featuring 40% lock on acceleration and 60% lock under deceleration, maximizing high-speed stability and traction out of slow apexes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
