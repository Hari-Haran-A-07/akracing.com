import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award } from 'lucide-react';

export const TeamSection = ({ team = [] }) => {
  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                THE ENGINEERING & STRATEGY MINDS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              THE <span className="text-racing-red">TEAM</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest">
              DISCIPLINE &bull; SYNCHRONIZED EXECUTION &bull; PIT WALL INTELLIGENCE
            </p>
          </div>

          <Link
            to="/team"
            className="px-6 py-3.5 border border-white/20 hover:border-racing-red text-white hover:text-racing-red text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors self-start md:self-auto"
          >
            <span>MEET COMPLETE RACING CREW</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.slice(0, 4).map((member) => (
            <div
              key={member.id}
              className="bg-racing-black border border-racing-border overflow-hidden flex flex-col justify-between group hover:border-racing-red/60 transition-all duration-300 shadow-lg"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover filter contrast-115 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-4 left-4 bg-racing-red text-white text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-widest">
                  {member.department}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-black uppercase text-white group-hover:text-racing-red transition-colors leading-tight">
                    {member.name}
                  </h3>
                  <div className="text-[11px] font-mono text-racing-silver mt-1 uppercase">
                    {member.role}
                  </div>
                  <p className="text-xs text-racing-silver/90 font-sans leading-relaxed mt-3 line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-white/50 italic">
                  "{member.quote}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
