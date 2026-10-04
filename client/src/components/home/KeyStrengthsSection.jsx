import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAudio } from '../../context/AudioContext';

export const KeyStrengthsSection = () => {
  const { playClick } = useAudio();

  const strengths = [
    {
      number: "01",
      title: "WORLD-CLASS RACING TEAM",
      desc: "An elite international driver lineup and seasoned engineering squad competing head-to-head on the world's most demanding circuits.",
      tag: "GLOBAL PEDIGREE",
      icon: Zap
    },
    {
      number: "02",
      title: "SAFETY & EXCELLENCE",
      desc: "Uncompromising adherence to FIA safety protocols, rigorous physical conditioning, and high-frequency real-time telemetry diagnostics.",
      tag: "FIA HOMOLOGATION",
      icon: Shield
    },
    {
      number: "03",
      title: "TEAMWORK & STRATEGY",
      desc: "Every pit stop, tire compound selection, and stint duration calculated dynamically to maximize points and podium finishes.",
      tag: "RACE STRATEGY",
      icon: Users
    }
  ];

  return (
    <section className="py-28 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                CORE COMPETITIVE ADVANTAGES
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              KEY <span className="text-racing-red">STRENGTHS</span>
            </h2>
          </div>

          <Link
            to="/about"
            onClick={playClick}
            className="px-6 py-3 border border-white/20 hover:border-racing-red text-white hover:text-racing-red text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors rounded self-start md:self-auto"
          >
            <span>ABOUT OUR CULTURE</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3 Pillars Grid with Number Expansion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strengths.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="p-8 bg-racing-surface/80 border border-white/10 rounded-2xl relative overflow-hidden group hover:border-racing-red/60 transition-all flex flex-col justify-between min-h-[340px] shadow-xl"
              >
                <div>
                  {/* Top Number & Tag */}
                  <div className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-6">
                    <span className="font-display text-5xl sm:text-6xl font-black text-gray-700 group-hover:text-racing-red group-hover:scale-110 transition-all origin-left">
                      {item.number}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest px-2.5 py-1 bg-black/60 rounded border border-white/5">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-black uppercase text-white group-hover:text-racing-red transition-colors mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs font-sans text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span className="uppercase">ENGINEERED DISCIPLINE</span>
                  <Icon size={16} className="text-gray-500 group-hover:text-racing-red transition-colors" />
                </div>

                {/* Bottom Red Progress Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-racing-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
