import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Gauge, Flag, Zap, Shield, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import { useTelemetry } from '../../context/TelemetryContext';

export const HeroSection = () => {
  const { playClick, playEngine } = useAudio();
  const { telemetry } = useTelemetry();

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-racing-black text-white pt-24 pb-12 px-6 sm:px-12 select-none">
      {/* Background Video / Cinematic Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover scale-105 filter brightness-50 contrast-125 transition-transform duration-1000"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-sports-car-racing-on-a-track-34676-large.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Gradients & Red Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-racing-black via-racing-black/40 to-black/80" />
        <div className="absolute top-0 right-0 w-[50vw] h-[60vh] bg-racing-red/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-racing-red/10 rounded-full blur-[140px] pointer-events-none" />
        
        {/* Subtle Grid Lines Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      {/* Top Floating Telemetry Overlay */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-2 text-racing-red">
            <span className="w-2.5 h-2.5 rounded-full bg-racing-red animate-ping" />
            <strong className="tracking-widest uppercase">AKR PERFORMANCE LOGS</strong>
          </div>
          <span className="text-racing-silver hidden sm:inline-block">CIRCUIT: <strong className="text-white">SPA-FRANCORCHAMPS</strong></span>
          <span className="text-racing-silver hidden md:inline-block">SEASON: <strong className="text-white">2026 CAMPAIGN</strong></span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-black/60 px-3 py-1 border border-white/10 flex items-center gap-2">
            <span className="text-racing-silver">DRIVER:</span>
            <span className="text-white font-bold">AJITH KUMAR #9</span>
          </div>
          <div className="bg-racing-red/20 px-3 py-1 border border-racing-red text-racing-red font-bold hidden sm:block">
            CLASS: FIA GT3 ENDURANCE
          </div>
        </div>
      </div>

      {/* Main Center Editorial Headlines */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Superheader */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-[2px] bg-racing-red" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-racing-silver">
              OFFICIAL MOTORSPORT ORGANIZATION
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-[0.88]">
            AJITH KUMAR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-racing-red">
              RACING
            </span>
          </h1>

          {/* Positioning */}
          <p className="font-display text-xl sm:text-3xl font-bold uppercase tracking-tight text-racing-silver max-w-2xl">
            BUILT FOR SPEED. <span className="text-white">DRIVEN BY PRECISION.</span>
          </p>

          <p className="font-sans text-xs sm:text-sm text-racing-silver/80 max-w-xl leading-relaxed">
            Representing the spirit of Indian motorsport on the global stage. Competing across 24-hour European and Middle Eastern GT championships with relentless discipline and race-proven engineering.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/racing"
              onClick={playClick}
              className="px-8 py-4 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(217,4,41,0.4)] group"
            >
              <span>DISCOVER AKR</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              to="/driver"
              onClick={playClick}
              className="px-8 py-4 bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white text-white font-display font-black text-sm uppercase tracking-widest transition-all duration-300 backdrop-blur-md"
            >
              MEET THE DRIVER
            </Link>

            <Link
              to="/cars/akr-gt3-01"
              onClick={playClick}
              className="px-8 py-4 bg-white/5 hover:bg-white/15 border border-white/20 hover:border-racing-red text-white hover:text-racing-red font-display font-black text-sm uppercase tracking-widest transition-all duration-300 backdrop-blur-md"
            >
              EXPLORE THE CAR
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Technical Telemetry Bar & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl w-full mx-auto pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Animated Specs Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 w-full md:w-auto">
          <div>
            <div className="text-[10px] font-mono text-racing-silver uppercase">TOP SPEED</div>
            <div className="font-display text-xl sm:text-2xl font-black text-white">305 <span className="text-xs font-mono font-normal text-racing-red">KM/H</span></div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-racing-silver uppercase">HORSEPOWER</div>
            <div className="font-display text-xl sm:text-2xl font-black text-white">510 <span className="text-xs font-mono font-normal text-racing-red">BHP</span></div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-racing-silver uppercase">DOWNFORCE</div>
            <div className="font-display text-xl sm:text-2xl font-black text-white">850 <span className="text-xs font-mono font-normal text-racing-red">KG</span></div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-racing-silver uppercase">MAX G-FORCE</div>
            <div className="font-display text-xl sm:text-2xl font-black text-white">3.8 <span className="text-xs font-mono font-normal text-racing-red">G</span></div>
          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-racing-silver/70 uppercase">
          <span>SCROLL TO ENTER PADDOCK</span>
          <ChevronDown size={14} className="animate-bounce text-racing-red" />
        </div>
      </div>
    </section>
  );
};
