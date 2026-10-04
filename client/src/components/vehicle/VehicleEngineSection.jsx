import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Activity, Zap, Cpu, Gauge, Disc, Shield } from 'lucide-react';

export const VehicleEngineSection = () => {
  const specs = [
    {
      label: "ENGINE TYPE",
      value: "4.0-LITRE BOXER",
      desc: "Water-cooled 6-cylinder naturally aspirated boxer engine with four valves per cylinder and rigid valve drive.",
    },
    {
      label: "DISPLACEMENT",
      value: "3,996 CM³",
      desc: "Bore 102.0 mm, stroke 81.5 mm engineered for instantaneous throttle response without forced induction delay.",
    },
    {
      label: "POWER OUTPUT",
      value: "375 KW / 510 PS",
      desc: "Delivered at 8,400 RPM with flat torque plateau sustaining high-velocity straight-line pull.",
    },
    {
      label: "PEAK TORQUE",
      value: "470 NM",
      desc: "Maximum torque generated at 6,150 RPM through optimized variable resonance intake manifold runners.",
    },
    {
      label: "LUBRICATION MATRIX",
      value: "7-STAGE DRY SUMP",
      desc: "Integrated dry sump system with separate engine oil tank, oil centrifuge, and high-efficiency water-oil heat exchanger.",
    },
    {
      label: "ENGINE MANAGEMENT",
      value: "BOSCH MS 6.6",
      desc: "Motorsport electronic engine management system with CAN bus data logging and programmable drive-by-wire maps.",
    },
    {
      label: "EXHAUST SYSTEM",
      value: "RACE CATALYST",
      desc: "Modular stainless steel racing exhaust with twin center-exit tailpipes and pre-silencer catalytic converter.",
    },
    {
      label: "FUEL SYSTEM",
      value: "DIRECT INJECTION (DFI)",
      desc: "High-pressure direct fuel injection operating up to 200 bar with central piezo injector orientation.",
    }
  ];

  return (
    <section id="engine" className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                POWERTRAIN & THERMAL MANAGEMENT
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              THE <span className="text-racing-red">ENGINE</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-widest">
              ENGINEERED FOR PERFORMANCE &bull; 4.0L NATURALLY ASPIRATED FLAT-6 &bull; 510 PS
            </p>
          </div>

          <div className="px-4 py-2 bg-racing-surface border border-white/10 rounded font-mono text-xs text-gray-300">
            MAX REDLINE: <strong className="text-racing-red">9,000 RPM</strong>
          </div>
        </div>

        {/* Engine Visual & Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Highlight Box */}
          <div className="lg:col-span-5 bg-racing-surface/80 border border-white/10 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-racing-red/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono text-racing-red font-bold uppercase tracking-widest">
                  MOTORSPORT COMBUSTION UNIT
                </span>
                <Flame size={20} className="text-racing-red" />
              </div>

              <div className="aspect-[4/3] rounded-lg bg-black/60 border border-white/5 overflow-hidden flex items-center justify-center p-4">
                <img
                  src="/images/akr-porsche-gt3-cup.jpg"
                  alt="Porsche 4.0L Boxer Engine"
                  className="w-full h-full object-contain filter contrast-125 brightness-95"
                />
              </div>

              <div className="space-y-3 text-xs font-mono text-gray-400 leading-relaxed">
                <p>
                  The heart of the 992 GT3 Cup is an uncompromised 4.0-litre flat-six boxer engine derived directly from Porsche Motorsport's international endurance racing program.
                </p>
                <div className="p-3 bg-black/40 border border-white/5 rounded text-white flex items-center justify-between">
                  <span>SPECIFIC OUTPUT:</span>
                  <span className="text-racing-red font-bold">127.5 PS / LITRE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 8 Technical Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specs.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-racing-surface/50 border border-white/10 rounded-xl hover:border-racing-red/60 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest group-hover:text-racing-red transition-colors">
                    {item.label}
                  </div>
                  <div className="font-display text-xl font-bold uppercase text-white tracking-tight">
                    {item.value}
                  </div>
                  <p className="text-xs font-sans text-gray-400 leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>
                <div className="w-6 h-[1px] bg-racing-red/40 group-hover:w-full transition-all duration-300 mt-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
