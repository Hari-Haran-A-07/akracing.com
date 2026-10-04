import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Flag, Zap, MapPin, Radio, Calendar } from 'lucide-react';

export const RaceCountdown = ({ targetDate = '2026-05-18T10:00:00Z', raceName = '12H SPA-FRANCORCHAMPS', circuit = 'CIRCUIT DE SPA-FRANCORCHAMPS', round = 'ROUND 03' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      // If targetDate is in the past, target 42 days in future for demonstration
      let target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      let diff = target - now;

      if (diff <= 0) {
        // Mock active countdown 24 days out
        diff = (24 * 86400 + 14 * 3600 + 22 * 60 + 45) * 1000 - (now % (86400000 * 30));
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="relative w-full bg-racing-black/80 border border-racing-border rounded-xl p-6 sm:p-8 backdrop-blur-md overflow-hidden select-none shadow-2xl">
      {/* Background Ambience */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-racing-red/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs text-racing-red font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-racing-red animate-ping" />
            <span>NEXT OFFICIAL GREEN FLAG &bull; {round}</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            {raceName}
          </h3>
          <p className="text-xs font-mono text-racing-silver flex items-center gap-1.5">
            <MapPin size={12} className="text-racing-red" /> {circuit}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-racing-red/20 border border-racing-red rounded text-racing-red font-mono text-xs font-bold uppercase flex items-center gap-1.5">
            <Radio size={12} className="animate-pulse" /> LIVE TELEMETRY READY
          </div>
        </div>
      </div>

      {/* 4 Digital Segment Blocks */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 text-center">
        {/* Days */}
        <div className="p-4 bg-black/60 border border-white/10 rounded-lg relative overflow-hidden group hover:border-racing-red/60 transition-colors">
          <div className="text-[10px] font-mono text-racing-silver uppercase tracking-widest mb-1">DAYS</div>
          <motion.div
            key={timeLeft.days}
            className="font-display text-4xl sm:text-6xl font-black text-white tracking-tighter"
          >
            {String(timeLeft.days).padStart(2, '0')}
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-racing-red/40" />
        </div>

        {/* Hours */}
        <div className="p-4 bg-black/60 border border-white/10 rounded-lg relative overflow-hidden group hover:border-racing-red/60 transition-colors">
          <div className="text-[10px] font-mono text-racing-silver uppercase tracking-widest mb-1">HOURS</div>
          <motion.div
            key={timeLeft.hours}
            className="font-display text-4xl sm:text-6xl font-black text-white tracking-tighter"
          >
            {String(timeLeft.hours).padStart(2, '0')}
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-racing-red/40" />
        </div>

        {/* Minutes */}
        <div className="p-4 bg-black/60 border border-white/10 rounded-lg relative overflow-hidden group hover:border-racing-red/60 transition-colors">
          <div className="text-[10px] font-mono text-racing-silver uppercase tracking-widest mb-1">MINUTES</div>
          <motion.div
            key={timeLeft.minutes}
            className="font-display text-4xl sm:text-6xl font-black text-white tracking-tighter"
          >
            {String(timeLeft.minutes).padStart(2, '0')}
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-racing-red/40" />
        </div>

        {/* Seconds */}
        <div className="p-4 bg-black/60 border border-racing-red/40 rounded-lg relative overflow-hidden bg-racing-red/10">
          <div className="text-[10px] font-mono text-racing-red uppercase tracking-widest mb-1 font-bold">SECONDS</div>
          <motion.div
            key={timeLeft.seconds}
            className="font-display text-4xl sm:text-6xl font-black text-racing-red tracking-tighter"
          >
            {String(timeLeft.seconds).padStart(2, '0')}
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-racing-red animate-pulse" />
        </div>
      </div>
    </div>
  );
};
