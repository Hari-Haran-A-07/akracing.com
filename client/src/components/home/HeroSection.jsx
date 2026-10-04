import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Gauge, Flag, Zap, Shield, Play, Activity, Sliders, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import { useScrollVelocity } from '../../hooks/useScrollVelocity';
import { CockpitSpeedometer } from '../telemetry/CockpitSpeedometer';

export const HeroSection = () => {
  const { playClick, playEngine } = useAudio();
  const scrollPhysics = useScrollVelocity();
  const [showTelemetryDrawer, setShowTelemetryDrawer] = useState(false);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-racing-black text-white pt-24 pb-12 px-6 sm:px-12 select-none">
      {/* Background Cinematic Video / Ambient Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover scale-105 filter brightness-40 contrast-125 transition-transform duration-1000"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-sports-car-racing-on-a-track-34676-large.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Gradients & Dynamic Red Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-racing-black via-racing-black/60 to-black/80" />
        <div className="absolute top-0 right-0 w-[55vw] h-[65vh] bg-racing-red/15 rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[45vw] h-[45vh] bg-racing-red/10 rounded-full blur-[150px] pointer-events-none" />
        
        {/* Subtle Grid Lines Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      {/* Top Floating Telemetry Overlay */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-2 text-racing-red">
            <span className="w-2.5 h-2.5 rounded-full bg-racing-red animate-ping" />
            <strong className="tracking-widest uppercase">LIVE SYSTEM TELEMETRY</strong>
          </div>
          <span className="text-racing-silver hidden sm:inline-block">CIRCUIT: <strong className="text-white">SPA-FRANCORCHAMPS</strong></span>
          <span className="text-racing-silver hidden md:inline-block">SEASON: <strong className="text-white">2026 CAMPAIGN</strong></span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-black/60 px-3 py-1.5 border border-white/10 flex items-center gap-2 rounded">
            <span className="text-racing-silver">DRIVER:</span>
            <span className="text-white font-bold">AJITH KUMAR #09</span>
          </div>
          <div className="bg-racing-red/20 px-3 py-1.5 border border-racing-red text-racing-red font-bold hidden sm:block rounded">
            FIA GT3 HOMOLOGATED
          </div>
        </div>
      </div>

      {/* Main Hero Cockpit & Editorial Grid */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Call to Action */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Superheader */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-racing-red" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-racing-silver">
                OFFICIAL MOTORSPORT ORGANIZATION
              </span>
            </div>

            {/* Master Headline */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.88]">
              BUILT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-racing-red">
                TO RACE.
              </span>
            </h1>

            {/* Tagline */}
            <p className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-racing-silver">
              PASSION. <span className="text-white">PRECISION.</span> PERFORMANCE.
            </p>

            <p className="font-sans text-xs sm:text-sm text-racing-silver/80 max-w-xl leading-relaxed">
              Ajith Kumar Racing represents the pinnacle of endurance motorsport engineering, competing in international FIA GT3 championships with high-velocity aerodynamics and relentless discipline.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/cars/akr-gt3-01"
                onClick={playClick}
                className="px-8 py-4 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(217,4,41,0.5)] group rounded"
              >
                <span>ENTER THE GARAGE</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                to="/calendar"
                onClick={playClick}
                className="px-8 py-4 bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white text-white font-display font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 backdrop-blur-md rounded"
              >
                VIEW RACE CALENDAR
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Large Race Car Visual with Technical HUD Brackets */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-6 relative flex flex-col items-center justify-center"
            data-cursor="car"
          >
            {/* Outer Glowing Frame & HUD Brackets */}
            <div className="relative w-full rounded-2xl bg-racing-graphite/40 border border-racing-border p-4 sm:p-6 backdrop-blur-md overflow-hidden shadow-2xl">
              {/* Corner HUD Reticles */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-racing-red" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-racing-red" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-racing-red" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-racing-red" />

              {/* Race Car Image Visual */}
              <div className="relative aspect-[16/10] w-full flex items-center justify-center overflow-hidden rounded-lg">
                <img
                  src="/images/akr-porsche-gt3-cup.jpg"
                  alt="Ajith Kumar Racing Porsche 911 GT3 Cup #09"
                  className="w-full h-full object-contain filter contrast-125 brightness-95 transform hover:scale-105 transition-transform duration-700"
                />

                {/* Overlaid Live Telemetry Badges */}
                <div className="absolute top-3 left-3 bg-black/80 border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono">
                  <span className="text-racing-silver">CAR: </span>
                  <span className="text-white font-bold">AKR 911 GT3 CUP</span>
                </div>

                <div className="absolute top-3 right-3 bg-racing-red/20 border border-racing-red px-2.5 py-1 rounded text-[10px] font-mono text-racing-red font-bold flex items-center gap-1.5">
                  <Zap size={11} /> 510 BHP
                </div>

                <div className="absolute bottom-3 left-3 bg-black/80 border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono flex items-center gap-2">
                  <span className="text-racing-silver">SPEED:</span>
                  <span className="text-racing-red font-bold">{scrollPhysics.speed || 305} KM/H</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/80 border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono flex items-center gap-2">
                  <span className="text-racing-silver">GEAR:</span>
                  <span className="text-white font-bold">{scrollPhysics.gear || '6'}</span>
                </div>
              </div>

              {/* Cockpit Toggle Button */}
              <button
                onClick={() => setShowTelemetryDrawer(!showTelemetryDrawer)}
                className="w-full mt-4 py-2.5 bg-racing-graphite hover:bg-racing-red text-white text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 border border-white/10 transition-colors rounded"
              >
                <Gauge size={14} />
                <span>{showTelemetryDrawer ? 'COLLAPSE DIGITAL CLUSTER' : 'LAUNCH MOTEC DIGITAL CLUSTER'}</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Expandable Cockpit Instrument Cluster */}
        <motion.div
          className="mt-8"
          initial={false}
          animate={{ height: showTelemetryDrawer ? 'auto' : 0, opacity: showTelemetryDrawer ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {showTelemetryDrawer && <CockpitSpeedometer className="mt-4" />}
        </motion.div>
      </div>

      {/* Bottom Technical Telemetry Bar & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl w-full mx-auto pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
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

        {/* Scroll prompt */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-racing-silver/70 uppercase">
          <span>SCROLL TO ACCELERATE PADDOCK</span>
          <ChevronDown size={14} className="animate-bounce text-racing-red" />
        </div>
      </div>
    </section>
  );
};
