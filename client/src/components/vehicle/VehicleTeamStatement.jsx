import React from 'react';
import { motion } from 'framer-motion';

export const VehicleTeamStatement = () => {
  return (
    <section className="relative py-32 px-6 sm:px-12 bg-racing-black overflow-hidden select-none border-b border-racing-border">
      {/* Background Cinematic Track Imagery with Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1920&auto=format&fit=crop"
          alt="Endurance Motorsport Circuit"
          className="w-full h-full object-cover filter brightness-[0.22] contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-racing-black via-racing-black/80 to-racing-black" />
        <div className="absolute inset-0 bg-carbon-pattern opacity-30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-racing-surface/80 border border-white/10 rounded-full font-mono text-xs text-gray-300 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-racing-red animate-ping" />
          <span>TEAM PHILOSOPHY &bull; ENDURANCE RACING</span>
        </div>

        {/* Enormous Editorial Manifesto */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl lg:text-9xl font-black uppercase text-white tracking-tighter leading-[0.88]"
        >
          ALL FOR ONE. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-racing-red">
            ONE FOR ALL.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Endurance racing is not merely a contest of speed; it is an uncompromising test of collective discipline, precision telemetry, and unrelenting trust between drivers, engineers, and pit mechanics across 24 grueling hours.
        </motion.p>

        {/* Technical Signature */}
        <div className="pt-6 flex items-center justify-center gap-6 text-xs font-mono text-gray-400 uppercase tracking-widest">
          <span>AJITH KUMAR #09</span>
          <span>&bull;</span>
          <span>CAMERON MCLEOD #09</span>
          <span>&bull;</span>
          <span className="text-racing-red font-bold">24H SERIES</span>
        </div>
      </div>
    </section>
  );
};
