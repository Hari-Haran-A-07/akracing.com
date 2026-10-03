import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Zap, Flag, Activity, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const RacingJourneySection = () => {
  const cards = [
    {
      id: "champ",
      title: "CURRENT CHAMPIONSHIP",
      subtitle: "24H SERIES MIDDLE EAST & EUROPE",
      description: "Contending for top honours in the international GT3 endurance category across Dubai, Mugello, Spa, and Barcelona.",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop",
      link: "/championships",
      badge: "ACTIVE 2026 CAMPAIGN"
    },
    {
      id: "program",
      title: "RACING PROGRAM",
      subtitle: "GT3 & GT4 HOMOLOGATED STABLE",
      description: "Dual-tier international racing architecture combining flagship GT3 endurance battles with customer GT4 development.",
      image: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=800&auto=format&fit=crop",
      link: "/racing",
      badge: "ENGINEERING"
    },
    {
      id: "track",
      title: "TRACK PERFORMANCE",
      subtitle: "CIRCUIT MASTERY & DATA",
      description: "Unforgiving 24-hour stints where precision telemetry, tyre thermal preservation, and driver discipline converge.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      link: "/results",
      badge: "TELEMETRY"
    },
    {
      id: "history",
      title: "COMPETITION HISTORY",
      subtitle: "TWO DECADES OF PEDIGREE",
      description: "From British Formula 3 podiums and FIA Formula 2 to international endurance victories, our heritage is forged in speed.",
      image: "/images/ajith-kumar-management.jpg",
      link: "/heritage",
      badge: "SINCE 2002"
    }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                THE PILLARS OF COMPETITION
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              RACING <span className="text-racing-red">PROGRAMS</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-racing-silver font-sans max-w-md leading-relaxed">
            Ajith Kumar Racing represents the pursuit of uncompromising motorsport engineering, competing at the highest echelon of international GT endurance racing.
          </p>
        </div>

        {/* 4 Large Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <Link
              key={card.id}
              to={card.link}
              className="group relative h-[460px] bg-racing-graphite border border-racing-border overflow-hidden flex flex-col justify-between p-6 transition-all duration-500 hover:border-racing-red/80 shadow-lg"
            >
              {/* Background Image with Zoom & Dark Gradient */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover filter brightness-40 group-hover:brightness-60 group-hover:scale-110 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              {/* Top Tag & Number */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-racing-red bg-black/60 border border-racing-red/30 px-2.5 py-1">
                  {card.badge}
                </span>
                <span className="text-sm font-mono text-white/40 group-hover:text-racing-red transition-colors">
                  0{idx + 1}
                </span>
              </div>

              {/* Bottom Content with Red Line Sweep */}
              <div className="relative z-10 space-y-3">
                <div className="w-8 h-[2px] bg-racing-red group-hover:w-full transition-all duration-500" />
                <span className="text-[10px] font-mono tracking-widest text-racing-silver uppercase">
                  {card.subtitle}
                </span>
                <h3 className="font-display text-2xl font-black uppercase text-white group-hover:text-racing-red transition-colors leading-tight">
                  {card.title}
                </h3>
                <p className="text-xs text-racing-silver/90 font-sans leading-relaxed line-clamp-3">
                  {card.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-racing-red transition-colors">
                  <span>DISCOVER MISSION</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
