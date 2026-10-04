import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Disc, ShieldCheck, Activity } from 'lucide-react';

export const VehicleSuspensionSection = () => {
  const specs = [
    {
      title: "FRONT AXLE KINEMATICS",
      spec: "DOUBLE WISHBONE",
      detail: "Forged aluminum double-wishbone layout completely decouples steering kinematics from vertical wheel motion for razor-sharp turn-in."
    },
    {
      title: "REAR AXLE ARCHITECTURE",
      spec: "MULTI-LINK (5-LINK)",
      detail: "Motorsport multi-link rear axle with uniball joint bearings and integrated anti-dive / anti-squat geometry."
    },
    {
      title: "DAMPER TECHNOLOGY",
      spec: "4-WAY ADJUSTABLE",
      detail: "KW Competition motorsport dampers with independent high/low-speed compression and high/low-speed rebound tuning."
    },
    {
      title: "ANTI-ROLL BARS",
      spec: "DUAL-BLADE ADJUSTABLE",
      detail: "Cockpit-adjustable tubular anti-roll bars with multiple blade stiffness positions front and rear."
    }
  ];

  return (
    <section id="suspension" className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                CHASSIS DYNAMICS & KINEMATICS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              SUSPENSION & <span className="text-racing-red">HANDLING</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-widest">
              DOUBLE-WISHBONE FRONT &bull; UNIBALL SPHERICAL JOINTS &bull; UP TO 3.8G LATERAL GRIP
            </p>
          </div>

          <div className="px-4 py-2 bg-racing-surface border border-white/10 rounded font-mono text-xs text-gray-300">
            LATERAL LOAD: <strong className="text-racing-red">3.8 G</strong>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-racing-surface/80 border border-white/10 rounded-xl hover:border-racing-red/60 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-racing-red font-bold uppercase tracking-widest">
                  {item.title}
                </div>
                <div className="font-display text-xl font-bold uppercase text-white tracking-tight">
                  {item.spec}
                </div>
                <p className="text-xs font-sans text-gray-400 leading-relaxed pt-2">
                  {item.detail}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>HOMOLOGATED SPEC</span>
                <span className="text-racing-red">NOMINAL</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
