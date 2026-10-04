import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Disc, Zap } from 'lucide-react';

export const VehicleBodyShellSection = () => {
  const elements = [
    {
      title: "FIA ARTICLE 277 SAFETY CAGE",
      material: "25CRMO4 WELDED STEEL",
      desc: "Integrated spaceframe roll cage welded directly to the unibody shell, providing maximum torsional rigidity and driver impact dissipation.",
    },
    {
      title: "CARBON-FIBRE COMPOSITE PANELS",
      material: "PRE-PREG CARBON WEAVE",
      desc: "Doors, front hood, rear engine lid, swan-neck wing, and aerodynamic diffusers constructed from autoclaved carbon-fiber.",
    },
    {
      title: "LIGHTWEIGHT POLYCARBONATE",
      material: "MAKROLON HARD-COATED",
      desc: "Rear windscreen and side windows manufactured from scratch-resistant hard-coated Makrolon polycarbonate, reducing center of gravity.",
    },
    {
      title: "FIA ESCAPE ROOF HATCH",
      material: "QUICK-RELEASE SAFETY",
      desc: "Homologated emergency roof escape opening with removable panel conforming to latest FIA endurance medical rescue regulations.",
    },
  ];

  return (
    <section id="body" className="py-24 px-6 sm:px-12 bg-racing-surface border-b border-racing-border relative select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                SAFETY CELL & COMPOSITE LIGHTWEIGHT DESIGN
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              BUILT TO <span className="text-racing-red">SURVIVE</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-widest">
              HOMOLOGATED FIA SAFETY SPACEFRAME &bull; 1,260 KG DRY WEIGHT &bull; 70% CARBON-FIBRE EXTERIOR
            </p>
          </div>

          <div className="px-4 py-2 bg-racing-black border border-white/10 rounded font-mono text-xs text-gray-300">
            TOTAL DRY WEIGHT: <strong className="text-racing-red">1,260 KG</strong>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {elements.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-racing-black/90 border border-white/10 rounded-xl hover:border-racing-red/60 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-racing-red font-bold uppercase tracking-widest">
                  {item.material}
                </div>
                <div className="font-display text-xl font-bold uppercase text-white tracking-tight">
                  {item.title}
                </div>
                <p className="text-xs font-sans text-gray-400 leading-relaxed pt-2">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>HOMOLOGATION CLEARED</span>
                <ShieldCheck size={16} className="text-racing-red" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
