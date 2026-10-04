import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flag, Zap, Calendar } from 'lucide-react';

export const VehicleHistoryTimeline = () => {
  const timeline = [
    {
      year: "2021",
      title: "NEW GENERATION 992 DEBUT",
      desc: "Porsche Motorsport unveils the wide-body 992-generation GT3 Cup featuring the 510 PS 4.0-litre flat-six and swan-neck aerodynamics."
    },
    {
      year: "2022 - 2023",
      title: "GLOBAL HOMOLOGATION & DEBUT",
      desc: "Competing across Porsche Supercup and Carrera Cup championships worldwide, setting lap records at Monaco, Spa, and Monza."
    },
    {
      year: "2024 - 2025",
      title: "ENDURANCE SPECIFICATION",
      desc: "Equipped with multi-stage endurance braking cooling kits, high-output LED night racing auxiliary pods, and quick-fuel dry break valves."
    },
    {
      year: "2026",
      title: "AJITH KUMAR RACING CAMPAIGN",
      desc: "Entered under chassis #09 with Ajith Kumar and Cameron McLeod contesting the 24H Series European and Middle East endurance crowns."
    }
  ];

  return (
    <section id="history" className="py-24 px-6 sm:px-12 bg-racing-surface border-b border-racing-border relative select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                CHAMPIONSHIP LINEAGE & EVOLUTION
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              BORN FOR <span className="text-racing-red">RACING</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-widest">
              HOMOLOGATION TIMELINE &bull; 992 GENERATION RACING PEDIGREE
            </p>
          </div>

          <div className="px-4 py-2 bg-racing-black border border-white/10 rounded font-mono text-xs text-gray-300">
            HERITAGE: <strong className="text-racing-red">50+ YEARS OF 911 RACING</strong>
          </div>
        </div>

        {/* Horizontal Timeline Track Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-racing-black/90 border border-white/10 rounded-xl relative flex flex-col justify-between group hover:border-racing-red/60 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-display text-3xl font-black text-racing-red">
                    {item.year}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">PHASE 0{idx + 1}</span>
                </div>

                <h3 className="font-display text-xl font-bold uppercase text-white tracking-tight">
                  {item.title}
                </h3>

                <p className="text-xs font-sans text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-racing-red" />
                <span>RACE-PROVEN PEDIGREE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
