import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Shield, Zap, Flame, Activity } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const VehicleHero = ({ car }) => {
  const { playClick, playEngine } = useAudio();
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-racing-black text-white pt-24 pb-12 px-6 sm:px-12 select-none">
      {/* Background Dark Ambience & Radial Lighting */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-carbon-pattern opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-racing-black via-racing-black/70 to-transparent z-10" />
        <div className="absolute top-1/4 right-1/4 w-[60vw] h-[60vh] bg-racing-red/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-white/5 rounded-full blur-[140px]" />
      </div>

      {/* Top Telemetry Header */}
      <div className="relative z-20 max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-racing-red">
            <span className="w-2.5 h-2.5 rounded-full bg-racing-red animate-ping" />
            <strong className="tracking-widest uppercase">HOMOLOGATED DOSSIER</strong>
          </div>
          <span className="text-gray-400 hidden sm:inline-block">CHASSIS: <strong className="text-white">AKR 992-009</strong></span>
          <span className="text-gray-400 hidden md:inline-block">CATEGORY: <strong className="text-white">FIA GT3 ENDURANCE</strong></span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1 bg-racing-surface border border-white/10 text-gray-300">
            ENGINE: <strong className="text-white">4.0L FLAT-6</strong>
          </div>
          <div className="px-3 py-1 bg-racing-red/20 border border-racing-red text-racing-red font-bold">
            510 PS @ 8,400 RPM
          </div>
        </div>
      </div>

      {/* Main Vehicle Hero Content Grid */}
      <div className="relative z-20 max-w-7xl w-full mx-auto my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Enormous Vehicle Title & Engineering Manifesto */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6"
        >
          {/* Subheader */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-[2px] bg-racing-red" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-gray-400">
              PORSCHE MOTORSPORT &bull; 992 GENERATION
            </span>
          </div>

          {/* Enormous Numbers & Vehicle Identity */}
          <div className="space-y-1">
            <motion.h1
              className="font-display font-black text-white leading-none tracking-tighter"
              style={{ fontSize: 'clamp(5rem, 14vw, 13rem)', lineHeight: 0.85 }}
            >
              911
            </motion.h1>

            <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-racing-red via-white/30 to-transparent my-3" />

            <div className="flex flex-wrap items-baseline gap-3 sm:gap-5">
              <span className="font-display text-4xl sm:text-6xl font-black uppercase text-racing-red tracking-tight">
                GT3 CUP
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-gray-400">
                (992)
              </span>
            </div>
          </div>

          {/* Positioning statement */}
          <p className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-gray-200">
            ENGINEERED <span className="text-racing-red">FOR THE TRACK.</span>
          </p>

          <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-lg leading-relaxed">
            The homologated racing weapon of Ajith Kumar Racing. Built around a 4.0-litre high-revving boxer unit, 6-speed sequential transmission, and 850kg aerodynamic ground effect for international 24-hour endurance campaigns.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#engine"
              onClick={playClick}
              className="px-8 py-4 bg-racing-red hover:bg-racing-brightRed text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(225,6,0,0.4)] rounded"
            >
              <span>INSPECT BLUEPRINT</span>
              <ArrowDown size={14} className="animate-bounce" />
            </a>

            <a
              href="#steering"
              onClick={() => { playClick(); playEngine(); }}
              className="px-8 py-4 bg-racing-surface hover:bg-racing-surface2 border border-white/20 hover:border-white text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 rounded backdrop-blur-md"
            >
              INTERACTIVE COCKPIT
            </a>
          </div>
        </motion.div>

        {/* Right Column: Dominant Race Car Emerging From Darkness */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative flex items-center justify-center"
          data-cursor="car"
        >
          {/* Outer Glowing Stage Frame */}
          <div className="relative w-full rounded-2xl bg-gradient-to-b from-racing-surface/80 to-racing-black border border-white/10 p-6 backdrop-blur-md overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            {/* Technical Reticle Corners */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-racing-red" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-racing-red" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-racing-red" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-racing-red" />

            {/* Car Visual */}
            <div className="relative aspect-[16/10] w-full flex items-center justify-center overflow-hidden">
              <img
                src="/images/akr-porsche-gt3-cup.jpg"
                alt="Porsche 911 GT3 Cup 992 Ajith Kumar Racing"
                className="w-full h-full object-contain filter contrast-125 brightness-95 transform hover:scale-105 transition-transform duration-700"
              />

              {/* Overlaid Badges */}
              <div className="absolute top-3 left-3 bg-black/80 border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono">
                <span className="text-gray-400">CHASSIS: </span>
                <span className="text-white font-bold">AKR 911 GT3 CUP</span>
              </div>
              <div className="absolute top-3 right-3 bg-racing-red/20 border border-racing-red px-2.5 py-1 rounded text-[10px] font-mono text-racing-red font-bold flex items-center gap-1.5">
                <Zap size={11} /> 510 PS @ 8,400 RPM
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10 text-[10px] font-mono text-gray-400">
              <span>WEIGHT: <strong className="text-white">1,260 KG</strong></span>
              <span>GEARBOX: <strong className="text-white">6-SPEED SEQUENTIAL</strong></span>
              <span>TOP SPEED: <strong className="text-racing-red">315 KM/H</strong></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Technical Status Bar */}
      <div className="relative z-20 max-w-7xl w-full mx-auto pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-racing-red animate-pulse" />
          <span>SYSTEM ONLINE &bull; 2026 CAMPAIGN</span>
        </div>
        <div className="flex items-center gap-4">
          <span>CREVENTIC 24H SERIES HOMOLOGATED</span>
          <span>&bull;</span>
          <span className="text-white">CHASSIS SPEC 992.1</span>
        </div>
      </div>
    </section>
  );
};
