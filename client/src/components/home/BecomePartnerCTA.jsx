import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Shield, Zap, Mail, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAudio } from '../../context/AudioContext';

export const BecomePartnerCTA = () => {
  const { playClick } = useAudio();

  return (
    <section className="relative py-28 px-6 sm:px-12 bg-racing-surface border-b border-racing-border relative select-none overflow-hidden">
      <div className="absolute inset-0 bg-carbon-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[50vw] h-[50vh] bg-racing-red/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="bg-racing-black/90 border border-white/10 rounded-3xl p-8 sm:p-14 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-racing-surface rounded-full border border-white/10 text-racing-red font-mono text-xs font-bold uppercase tracking-widest">
              <Trophy size={14} />
              <span>COMMERCIAL & TECHNICAL PARTNERSHIPS</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-none">
              BECOME PART <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-racing-red">
                OF THE RACE
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              Partner with Ajith Kumar Racing to position your brand on the global stage. Benefit from international broadcast visibility across the Michelin 24H Series, VIP paddock hospitality access, VIP testing experiences, and co-branded automotive activations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs text-gray-300">
              <div className="p-3 bg-racing-surface/80 rounded border border-white/5">
                <span className="text-[9px] text-gray-500 uppercase block">GLOBAL BROADCAST</span>
                <span className="text-white font-bold">120+ COUNTRIES</span>
              </div>
              <div className="p-3 bg-racing-surface/80 rounded border border-white/5">
                <span className="text-[9px] text-gray-500 uppercase block">ON-TRACK EXPOSURE</span>
                <span className="text-white font-bold">CHASSIS & LIVERY</span>
              </div>
              <div className="p-3 bg-racing-surface/80 rounded border border-white/5">
                <span className="text-[9px] text-gray-500 uppercase block">VIP ACCESS</span>
                <span className="text-racing-red font-bold">PADDOCK CLUB</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <a
              href="#contact"
              onClick={playClick}
              className="w-full py-4 px-6 bg-racing-red hover:bg-racing-brightRed text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all rounded shadow-[0_0_25px_rgba(225,6,0,0.4)]"
            >
              <span>SUBMIT ENQUIRY</span>
              <ArrowRight size={16} />
            </a>

            <Link
              to="/partners"
              onClick={playClick}
              className="w-full py-4 px-6 bg-racing-surface hover:bg-racing-surface2 border border-white/20 hover:border-white text-white font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded"
            >
              <span>EXPLORE EXISTING PARTNERS</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
