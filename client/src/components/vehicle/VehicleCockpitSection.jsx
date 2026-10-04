import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Zap, Disc, Cpu, Flame } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const VehicleCockpitSection = () => {
  const { playBeep, playClick } = useAudio();
  const [activeSpot, setActiveSpot] = useState(0);

  const hotspots = [
    {
      id: 0,
      title: "MOTEC C187 COLOR DASH DISPLAY",
      category: "TELEMETRY & LOGGING",
      x: "50%",
      y: "35%",
      icon: Activity,
      desc: "High-contrast 5.0-inch anti-glare color display with configurable driver pages, live delta lap time, tyre pressures, and gearshift LED bar."
    },
    {
      id: 1,
      title: "CARBON RACING STEERING WHEEL",
      category: "DRIVER CONTROLS",
      x: "50%",
      y: "55%",
      icon: Cpu,
      desc: "Multifunctional carbon steering wheel with integrated quick-release mechanism, backlit buttons for pit limiter, radio, wipers, and brake bias."
    },
    {
      id: 2,
      title: "CARBON-KEVLAR BUCKET SEAT",
      category: "ERGONOMICS & SAFETY",
      x: "28%",
      y: "65%",
      icon: ShieldCheck,
      desc: "FIA Article 8862-2009 homologated competition seat with longitudinal adjustment and customized foam driver insert padding for multi-driver driver changes."
    },
    {
      id: 3,
      title: "ELECTRONIC FIRE SYSTEM",
      category: "SAFETY SYSTEMS",
      x: "72%",
      y: "60%",
      icon: Flame,
      desc: "Novec 1230 electronic fire extinguishing system with cockpit and engine bay distribution nozzles triggered via interior and exterior buttons."
    }
  ];

  const current = hotspots[activeSpot];

  return (
    <section id="cockpit" className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                DRIVER ENVIRONMENT & ERGONOMICS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              THE RACING <span className="text-racing-red">COCKPIT</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-widest">
              FIA HOMOLOGATED DRIVER CELL &bull; CLICK HOTSPOTS TO INSPECT INTERIOR CONTROLS
            </p>
          </div>

          <div className="px-4 py-2 bg-racing-surface border border-white/10 rounded font-mono text-xs text-gray-300">
            SEAT POSITION: <strong className="text-racing-red">OPTIMIZED CG</strong>
          </div>
        </div>

        {/* Cockpit Stage & Hotspots */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Cockpit Visual Stage */}
          <div className="lg:col-span-7 bg-racing-surface/80 border border-white/10 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl min-h-[420px] flex items-center justify-center">
            <div className="absolute inset-0 bg-carbon-pattern opacity-30" />

            {/* High-Contrast Cockpit Image */}
            <div className="relative w-full max-w-lg aspect-[16/10] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop"
                alt="Ajith Kumar Racing 911 Cockpit"
                className="w-full h-full object-cover rounded-lg filter contrast-125 brightness-50"
              />

              {/* Hotspot Markers */}
              {hotspots.map((h, idx) => {
                const isActive = activeSpot === idx;
                return (
                  <button
                    key={h.id}
                    onClick={() => {
                      setActiveSpot(idx);
                      playBeep();
                    }}
                    style={{ left: h.x, top: h.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 group transition-transform ${
                      isActive ? 'scale-125 z-20' : 'scale-100 z-10 hover:scale-110'
                    }`}
                  >
                    <span className="relative flex h-6 w-6 items-center justify-center">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          isActive ? 'bg-racing-red' : 'bg-white/40'
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-4 w-4 items-center justify-center text-[9px] font-mono font-bold text-white ${
                          isActive ? 'bg-racing-red shadow-[0_0_12px_#E10600]' : 'bg-racing-black border border-white/60'
                        }`}
                      >
                        {idx + 1}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Cockpit Subsystem Dossier */}
          <div className="lg:col-span-5 bg-racing-surface/90 border border-white/10 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-racing-red uppercase tracking-widest">
                  HOTSPOT 0{current.id + 1} &bull; {current.category}
                </span>
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight mt-1">
                  {current.title}
                </h3>
              </div>
              <div className="p-3 bg-racing-red/10 border border-racing-red/30 rounded text-racing-red">
                <current.icon size={20} />
              </div>
            </div>

            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              {current.desc}
            </p>

            {/* Quick Switch Buttons */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
              {hotspots.map((h, idx) => (
                <button
                  key={h.id}
                  onClick={() => {
                    setActiveSpot(idx);
                    playClick();
                  }}
                  className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                    activeSpot === idx
                      ? 'bg-racing-red text-white shadow-[0_0_10px_rgba(225,6,0,0.5)]'
                      : 'bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10'
                  }`}
                >
                  0{idx + 1}. {h.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
