import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Zap, Shield, Target, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAudio } from '../../context/AudioContext';

export const IntroMissionSection = () => {
  const { playClick } = useAudio();

  const values = [
    {
      word: "PASSION",
      subtitle: "THE UNCOMPROMISING DRIVE",
      desc: "Born from an unyielding love for high-velocity motorsport and competitive excellence across international GT circuits."
    },
    {
      word: "AMBITION",
      subtitle: "THE GLOBAL VISION",
      desc: "Representing India at the highest echelon of European and Middle Eastern FIA GT3 and 24-Hour endurance championships."
    },
    {
      word: "PRECISION",
      subtitle: "ENGINEERING DISCIPLINE",
      desc: "Every millisecond counts. Calibrated aerodynamic CFD ground effect, 1,000Hz MoTeC telemetry, and pit strategy."
    }
  ];

  return (
    <section className="py-28 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-racing-red/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20">
        {/* Top 3 Core Pillars: PASSION / AMBITION / PRECISION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="p-8 bg-racing-surface/70 border border-white/10 rounded-2xl relative overflow-hidden group hover:border-racing-red/60 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-[10px] text-racing-red font-bold tracking-widest uppercase">
                    PILLAR 0{idx + 1}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-racing-red" />
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight group-hover:text-racing-red transition-colors">
                  {v.word}
                </h3>

                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  {v.subtitle}
                </div>

                <p className="text-xs font-sans text-gray-400 leading-relaxed pt-2">
                  {v.desc}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-racing-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Asymmetric Introduction Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-white/10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                WELCOME TO AJITH KUMAR RACING
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              A NEW ERA OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-racing-red">
                MOTORSPORT EXCELLENCE
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
              Ajith Kumar Racing is a professional international motorsport organization competing across the Michelin 24H Series, European endurance circuits, and Middle Eastern GT championships. Operating with top-tier racing engineering, rigorous driver development, and state-of-the-art telemetry infrastructure.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/about"
                onClick={playClick}
                className="px-8 py-4 bg-racing-red hover:bg-racing-brightRed text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(225,6,0,0.4)] rounded group"
              >
                <span>READ OUR STORY</span>
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                to="/team"
                onClick={playClick}
                className="px-8 py-4 bg-racing-surface hover:bg-racing-surface2 border border-white/20 hover:border-white text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 rounded"
              >
                MEET THE SQUAD
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="p-4 bg-racing-surface/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
              <img
                src="/images/akr-porsche-gt3-cup.jpg"
                alt="Ajith Kumar Racing Car on Track"
                className="w-full h-auto object-cover rounded-xl filter contrast-125 brightness-95"
              />
              <div className="absolute bottom-6 left-6 right-6 p-3 bg-black/80 backdrop-blur-md rounded-lg border border-white/10 flex items-center justify-between text-[10px] font-mono">
                <span className="text-gray-400">STATUS: <strong className="text-white">ACTIVE COMPETITION</strong></span>
                <span className="text-racing-red font-bold">FIA HOMOLOGATED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
