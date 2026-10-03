import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Award, Gauge, Zap, Flame, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const DriverShowcase = ({ driver }) => {
  const stats = [
    { label: "RACE STARTS", value: "74", sub: "INTERNATIONAL GT & F3" },
    { label: "PODIUM FINISHES", value: "18", sub: "BRITISH F3 & 24H SERIES" },
    { label: "RACE VICTORIES", value: "07", sub: "MIDDLE EAST & NATIONAL" },
    { label: "POLE POSITIONS", value: "05", sub: "QUALIFYING BENCHMARKS" },
    { label: "FASTEST LAPS", value: "12", sub: "CIRCUIT RECORD SECTORS" },
    { label: "CHAMPIONSHIPS", value: "02", sub: "ENDURANCE TITLES" },
  ];

  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border relative overflow-hidden select-none">
      {/* Background Graphic Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-white/[0.02] pointer-events-none tracking-tighter">
        #09
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Driver Imagery & Number Badge */}
        <div className="lg:col-span-5 relative">
          <div className="relative border border-white/10 bg-black overflow-hidden group shadow-2xl">
            <img
              src={driver?.images?.racingSuit || "/images/ajith-kumar-management.jpg"}
              alt="Ajith Kumar - Lead Driver"
              className="w-full h-[520px] object-cover filter contrast-115 grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Floating Driver Number Tag */}
            <div className="absolute top-6 left-6 bg-racing-red text-white p-3 font-display font-black text-2xl tracking-tighter shadow-lg flex items-center gap-1.5">
              <span>#09</span>
            </div>

            {/* Driver Role Indicator */}
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-mono text-racing-red uppercase font-bold tracking-widest">LEAD DRIVER & TEAM PRINCIPAL</span>
              <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight mt-0.5">AJITH KUMAR</h3>
              <p className="text-xs text-racing-silver font-mono mt-1">AKR GT3-01 &bull; 24H SERIES ENDURANCE</p>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative, Philosophy & Stats Grid */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                THE DRIVER PROFILE
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              AJITH <span className="text-racing-red">KUMAR</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest">
              SPEED &bull; DISCIPLINE &bull; TWO DECADES OF INTERNATIONAL RACING PEDIGREE
            </p>
          </div>

          {/* Philosophy Quote */}
          <div className="p-6 bg-racing-black border-l-4 border-racing-red border-y border-r border-racing-border">
            <p className="font-display text-lg sm:text-xl font-bold uppercase text-white tracking-tight italic leading-snug">
              "Motorsport is pure truth. The telemetry never lies. On the track, your mental composure, technical discipline, and synchronization with the machine are everything."
            </p>
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-racing-silver">
              <span className="text-racing-red font-bold">— AJITH KUMAR</span>
              <span>24H SERIES YAS MARINA & DUBAI</span>
            </div>
          </div>

          {/* Career Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 bg-racing-carbon border border-white/5 hover:border-racing-red/40 transition-colors"
              >
                <div className="text-[10px] font-mono text-racing-silver uppercase tracking-wider">{stat.label}</div>
                <div className="font-display text-3xl sm:text-4xl font-black text-white mt-1 group-hover:text-racing-red">
                  {stat.value}
                </div>
                <div className="text-[9px] font-mono text-racing-silver/70 mt-1 uppercase">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/driver"
              className="px-8 py-4 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-colors shadow-lg"
            >
              <span>EXPLORE FULL DRIVER PROFILE</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/driver#timeline"
              className="px-6 py-4 border border-white/20 hover:border-white text-white font-display font-black text-xs uppercase tracking-widest transition-colors"
            >
              CAREER TIMELINE (2002–2026)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
