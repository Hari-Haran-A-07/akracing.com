import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowRight, Flag, Calendar, Shield, Gauge } from 'lucide-react';

export const ChampionshipsSection = ({ championships = [] }) => {
  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                OFFICIAL COMPETITION CAMPAIGN
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              CHAMPIONSHIPS & <span className="text-racing-red">STANDINGS</span>
            </h2>
          </div>

          <Link
            to="/championships"
            className="px-6 py-3.5 border border-white/20 hover:border-racing-red text-white hover:text-racing-red text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors self-start md:self-auto"
          >
            <span>VIEW COMPLETE STANDINGS</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Championships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {championships.map((champ) => (
            <div
              key={champ.id}
              className="bg-racing-black border border-racing-border overflow-hidden flex flex-col justify-between group hover:border-racing-red/60 transition-all duration-300"
            >
              {/* Banner with Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={champ.banner || "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=800&auto=format&fit=crop"}
                  alt={champ.title}
                  className="w-full h-full object-cover filter brightness-50 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute top-4 left-4 bg-racing-red text-white text-[10px] font-mono font-bold px-2.5 py-1 uppercase tracking-widest">
                  {champ.season} SEASON
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono text-racing-silver uppercase tracking-widest">{champ.category}</span>
                  <h3 className="font-display text-xl font-black uppercase text-white leading-tight mt-0.5 group-hover:text-racing-red transition-colors">
                    {champ.title}
                  </h3>
                </div>
              </div>

              {/* Specs & Performance Breakdown */}
              <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                <p className="text-xs text-racing-silver/90 font-sans leading-relaxed">
                  {champ.description}
                </p>

                <div className="grid grid-cols-2 gap-3 p-4 bg-racing-carbon border border-white/5 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-racing-silver uppercase">CURRENT RANK</span>
                    <div className="font-display text-lg font-black text-racing-red mt-0.5">{champ.currentPosition}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-racing-silver uppercase">TOTAL POINTS</span>
                    <div className="font-display text-lg font-black text-white mt-0.5">{champ.points} PTS</div>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-racing-silver">CAR / ENTRY:</span>
                    <span className="text-white font-bold">{champ.car}</span>
                  </div>
                </div>

                <Link
                  to="/championships"
                  className="w-full py-3 bg-white/5 hover:bg-racing-red text-white text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 border border-white/10 hover:border-racing-red transition-all group/btn"
                >
                  <span>DETAILED CHAMPIONSHIP DATA</span>
                  <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
