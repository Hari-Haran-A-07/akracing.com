import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Disc, Zap, Activity } from 'lucide-react';
import { AeroWindTunnel } from '../3d/AeroWindTunnel';

export const VehicleAeroSection = () => {
  const aeroPillars = [
    {
      title: "SWAN-NECK REAR WING",
      value: "11 POSITIONS",
      desc: "Top-mounted swan-neck pylons provide uninterrupted airflow across the lower high-pressure wing surface, yielding 14% higher aerodynamic efficiency."
    },
    {
      title: "FRONT CARBON SPLITTER",
      value: "VENTURI GROUND EFFECT",
      desc: "Extended front lip with integrated vortex generators channels clean air into the front brake NACA ducts and underbody diffuser tunnels."
    },
    {
      title: "UNDERBODY GROUND EFFECT",
      value: "850 KG DOWNFORCE",
      desc: "Total downforce generated at 250 km/h with zero parasitic vortex turbulence, pinning the 992 chassis to high-speed apexes."
    },
    {
      title: "REAR CARBON DIFFUSER",
      value: "PRESSURE EQUALIZER",
      desc: "Multi-channel carbon-fiber rear diffuser accelerating exit air speed to lower pressure underneath the rear axle."
    }
  ];

  return (
    <section id="aerodynamics" className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                COMPUTATIONAL FLUID DYNAMICS (CFD)
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              AERODYNAMICS & <span className="text-racing-red">GROUND EFFECT</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-widest">
              850 KG DOWNFORCE @ 250 KM/H &bull; 11-STAGE ADJUSTABLE SWAN-NECK WING &bull; CFD OPTIMIZED
            </p>
          </div>

          <div className="px-4 py-2 bg-racing-surface border border-white/10 rounded font-mono text-xs text-gray-300">
            TOTAL DOWNFORCE: <strong className="text-racing-red">850 KG</strong>
          </div>
        </div>

        {/* Live CFD Wind Tunnel Streamlines Canvas */}
        <AeroWindTunnel />

        {/* 4 Aero Elements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aeroPillars.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-racing-surface/80 border border-white/10 rounded-xl hover:border-racing-red/60 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-racing-red font-bold uppercase tracking-widest">
                  {item.title}
                </div>
                <div className="font-display text-xl font-bold uppercase text-white tracking-tight">
                  {item.value}
                </div>
                <p className="text-xs font-sans text-gray-400 leading-relaxed pt-2">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>CFD CERTIFIED</span>
                <Wind size={14} className="text-racing-red" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
