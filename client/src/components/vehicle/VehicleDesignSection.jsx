import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Disc, Shield, Zap } from 'lucide-react';

export const VehicleDesignSection = () => {
  const highlights = [
    {
      title: "GT SILVER METALLIC LIVERY",
      detail: "Signature racing metallic finish paying homage to international endurance heritage while resisting track rubber debris at 300+ km/h."
    },
    {
      title: "CENTRAL MOTORSPORT RACING STRIPE",
      detail: "High-contrast dynamic racing stripe extending along the vehicle centerline from front splitter to the rear swan-neck wing."
    },
    {
      title: "EXPOSED CARBON-FIBRE WEAVE",
      detail: "Satin-finished autoclaved carbon-fiber side mirrors, aerodynamic diffusers, and intake NACA ducts emphasizing composite craftsmanship."
    },
    {
      title: "CENTER-LOCK RACING WHEELS",
      detail: "Forged lightweight one-piece alloy wheels with central locking nut for sub-3-second pit stop tire changes."
    }
  ];

  return (
    <section id="design" className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                AESTHETICS & MOTORSPORT IDENTITY
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              SPECIAL VEHICLE <span className="text-racing-red">DESIGN</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-widest">
              GT SILVER METALLIC &bull; CENTRAL RACING STRIPE &bull; FORGED MAGNESIUM CENTER-LOCKS
            </p>
          </div>

          <div className="px-4 py-2 bg-racing-surface border border-white/10 rounded font-mono text-xs text-gray-300">
            LIVERY: <strong className="text-white">AKR 2026 EDITION</strong>
          </div>
        </div>

        {/* Visual Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Asset Box */}
          <div className="lg:col-span-6 bg-racing-surface/80 border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-black/60 border border-white/5 flex items-center justify-center p-2">
              <img
                src="/images/akr-porsche-gt3-cup.jpg"
                alt="Ajith Kumar Racing GT Silver Metallic 911"
                className="w-full h-full object-contain filter contrast-125 brightness-95 transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Column: 4 Design Pillar Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-racing-surface/60 border border-white/10 rounded-xl hover:border-racing-red/60 transition-all space-y-2 group shadow-lg"
              >
                <div className="text-[10px] font-mono text-racing-red font-bold uppercase tracking-widest">
                  0{idx + 1}. SPEC
                </div>
                <div className="font-display text-lg font-bold uppercase text-white tracking-tight">
                  {item.title}
                </div>
                <p className="text-xs font-sans text-gray-400 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
