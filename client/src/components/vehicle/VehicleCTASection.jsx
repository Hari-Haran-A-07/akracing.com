import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Radio } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const VehicleCTASection = () => {
  const { playClick } = useAudio();

  return (
    <section className="relative py-32 px-6 sm:px-12 bg-racing-surface overflow-hidden select-none border-b border-racing-border">
      {/* Background Vignette & Ambient Red Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-carbon-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-racing-red/15 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-racing-black/80 border border-white/10 rounded-full font-mono text-xs text-racing-red uppercase font-bold tracking-widest">
          <span className="w-2 h-2 rounded-full bg-racing-red animate-ping" />
          <span>JOIN THE 2026 ENDURANCE CAMPAIGN</span>
        </div>

        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-tighter leading-none">
          READY FOR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-racing-red">
            THE NEXT LAP?
          </span>
        </h2>

        <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-gray-400 max-w-xl mx-auto">
          ENGINEERED FOR SPEED. BUILT FOR THE TRACK.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/team"
            onClick={playClick}
            className="px-8 py-4 bg-racing-red hover:bg-racing-brightRed text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(225,6,0,0.5)] rounded group"
          >
            <span>EXPLORE THE TEAM</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>

          <Link
            to="/calendar"
            onClick={playClick}
            className="px-8 py-4 bg-racing-black/80 hover:bg-racing-black border border-white/20 hover:border-white text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-3 transition-all duration-300 rounded backdrop-blur-md"
          >
            <Calendar size={15} />
            <span>VIEW RACING CALENDAR</span>
          </Link>

          <Link
            to="/live"
            onClick={playClick}
            className="px-8 py-4 bg-racing-black/80 hover:bg-racing-black border border-racing-red text-racing-red hover:text-white hover:bg-racing-red font-display font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-3 transition-all duration-300 rounded backdrop-blur-md"
          >
            <Radio size={15} className="animate-pulse" />
            <span>ENTER LIVE PIT WALL</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
