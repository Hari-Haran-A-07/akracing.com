import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Flag, ArrowRight, Radio, Users, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAudio } from '../../context/AudioContext';

export const UpcomingRaceHighlight = () => {
  const { playClick } = useAudio();

  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 14,
    minutes: 36,
    seconds: 42,
  });

  useEffect(() => {
    // Dynamic countdown timer
    const target = new Date('2026-05-18T10:00:00Z').getTime();
    const calculate = () => {
      const now = new Date().getTime();
      let diff = target - now;
      if (diff <= 0) {
        diff = (28 * 86400 + 14 * 3600 + 36 * 60 + 42) * 1000 - (now % (86400000 * 30));
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000)) / 1000),
      });
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-surface border-b border-racing-border relative select-none overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-carbon-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[40vw] h-[40vh] bg-racing-red/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                OFFICIAL ENDURANCE CALENDAR &bull; NEXT EVENT
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              UPCOMING <span className="text-racing-red">RACE</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 bg-racing-red/20 border border-racing-red rounded font-mono text-xs font-bold text-racing-red flex items-center gap-2">
              <Radio size={14} className="animate-pulse" />
              <span>ROUND 03 &bull; 24H SERIES</span>
            </div>
          </div>
        </div>

        {/* Master Race Feature Card */}
        <div className="bg-racing-black/90 border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Race Identity & Circuit Specs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono text-racing-red font-bold uppercase tracking-widest flex items-center gap-2">
                <MapPin size={14} /> CIRCUIT DE SPA-FRANCORCHAMPS &bull; BELGIUM
              </div>
              <h3 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none">
                12H SPA-FRANCORCHAMPS
              </h3>
              <p className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                MICHELIN 24H SERIES &bull; EUROPEAN ENDURANCE CHAMPIONSHIP
              </p>
            </div>

            {/* Circuit Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs text-gray-300 pt-2">
              <div className="p-3 bg-racing-surface/80 rounded border border-white/5">
                <span className="text-[9px] text-gray-500 uppercase block">EVENT DATE</span>
                <span className="text-white font-bold">18–19 MAY 2026</span>
              </div>
              <div className="p-3 bg-racing-surface/80 rounded border border-white/5">
                <span className="text-[9px] text-gray-500 uppercase block">TRACK LENGTH</span>
                <span className="text-white font-bold">7.004 KM (20 TURNS)</span>
              </div>
              <div className="p-3 bg-racing-surface/80 rounded border border-white/5 col-span-2 sm:col-span-1">
                <span className="text-[9px] text-gray-500 uppercase block">RACE DURATION</span>
                <span className="text-racing-red font-bold">12 HOURS CONTINUOUS</span>
              </div>
            </div>

            {/* Drivers on Entry */}
            <div className="p-4 bg-racing-surface/60 rounded-xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users size={18} className="text-racing-red" />
                <div className="text-xs font-mono">
                  <span className="text-gray-400 block text-[9px] uppercase">AKR ENTRY LINEUP (#09)</span>
                  <span className="text-white font-bold">AJITH KUMAR &bull; CAMERON MCLEOD</span>
                </div>
              </div>
              <span className="text-xs font-mono text-gray-400">911 GT3 CUP</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/calendar"
                onClick={playClick}
                className="px-6 py-3.5 bg-racing-red hover:bg-racing-brightRed text-white font-display font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all rounded shadow-lg"
              >
                <span>CIRCUIT GUIDE & SCHEDULE</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/live"
                onClick={playClick}
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-display font-black text-xs uppercase tracking-widest border border-white/10 rounded transition-all"
              >
                LIVE PIT STREAM
              </Link>
            </div>
          </div>

          {/* Right Column: High-Impact 4-Digit Segment Countdown */}
          <div className="lg:col-span-6 bg-racing-surface/60 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
              <span className="text-gray-400 uppercase tracking-widest">OFFICIAL GREEN FLAG COUNTDOWN</span>
              <span className="text-racing-red font-bold animate-pulse">UTC TIME</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
              {/* Days */}
              <div className="p-4 bg-black/80 border border-white/10 rounded-xl">
                <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">DAYS</span>
                <span className="font-display text-4xl sm:text-5xl font-black text-white">{String(timeLeft.days).padStart(2, '0')}</span>
              </div>
              {/* Hours */}
              <div className="p-4 bg-black/80 border border-white/10 rounded-xl">
                <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">HOURS</span>
                <span className="font-display text-4xl sm:text-5xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
              </div>
              {/* Minutes */}
              <div className="p-4 bg-black/80 border border-white/10 rounded-xl">
                <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">MINUTES</span>
                <span className="font-display text-4xl sm:text-5xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
              </div>
              {/* Seconds */}
              <div className="p-4 bg-racing-red/10 border border-racing-red/40 rounded-xl">
                <span className="text-[10px] font-mono text-racing-red font-bold uppercase block mb-1">SECONDS</span>
                <span className="font-display text-4xl sm:text-5xl font-black text-racing-red">{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>

            <div className="text-center font-mono text-[10px] text-gray-500 uppercase">
              ALL TELEMETRY STREAMS WILL TRANSMIT LIVE AT GREEN FLAG
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
