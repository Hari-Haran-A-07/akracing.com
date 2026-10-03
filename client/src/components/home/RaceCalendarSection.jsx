import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Flag, ArrowRight, CheckCircle, Radio, Clock } from 'lucide-react';

export const RaceCalendarSection = ({ races = [] }) => {
  const [filter, setFilter] = useState('ALL'); // 'ALL', 'UPCOMING', 'COMPLETED'

  const filteredRaces = races.filter((race) => {
    if (filter === 'ALL') return true;
    if (filter === 'UPCOMING') return race.status === 'upcoming' || race.status === 'live';
    if (filter === 'COMPLETED') return race.status === 'completed';
    return true;
  });

  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header with Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                GLOBAL ENDURANCE SCHEDULE
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              RACE <span className="text-racing-red">CALENDAR</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-racing-graphite p-1 border border-racing-border">
            {['ALL', 'UPCOMING', 'COMPLETED'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-colors ${
                  filter === tab
                    ? 'bg-racing-red text-white'
                    : 'text-racing-silver hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Races Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRaces.map((race) => {
            const isLive = race.status === 'live';
            const isCompleted = race.status === 'completed';

            return (
              <div
                key={race.id}
                className={`p-6 bg-racing-graphite border transition-all duration-300 flex flex-col justify-between ${
                  isLive
                    ? 'border-racing-red shadow-[0_0_20px_rgba(217,4,41,0.2)]'
                    : 'border-racing-border hover:border-white/40'
                }`}
              >
                <div>
                  {/* Status & Round */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 font-mono text-xs">
                    <span className="text-white font-black tracking-widest">{race.round}</span>
                    {isLive ? (
                      <span className="flex items-center gap-1.5 text-racing-red font-bold uppercase animate-pulse">
                        <Radio size={12} /> LIVE NOW
                      </span>
                    ) : isCompleted ? (
                      <span className="flex items-center gap-1 text-green-400 font-bold uppercase">
                        <CheckCircle size={12} /> COMPLETED
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-racing-silver uppercase">
                        <Clock size={12} /> UPCOMING
                      </span>
                    )}
                  </div>

                  {/* Title & Circuit */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-racing-red uppercase font-bold tracking-widest flex items-center gap-1.5">
                      <MapPin size={11} /> {race.country} &bull; {race.location}
                    </div>
                    <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                      {race.title}
                    </h3>
                    <p className="text-xs text-racing-silver font-mono">{race.circuit}</p>
                  </div>
                </div>

                {/* Circuit Metrics */}
                <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-racing-silver">
                    <div>
                      <span className="text-[10px] uppercase text-white/40">DATE</span>
                      <div className="text-white font-bold">{race.date}</div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-white/40">TRACK LENGTH</span>
                      <div className="text-white font-bold">{race.trackLength}</div>
                    </div>
                  </div>

                  {isLive ? (
                    <Link
                      to="/live"
                      className="w-full py-3 bg-racing-red hover:bg-racing-crimson text-white text-xs font-mono font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                    >
                      <Radio size={14} className="animate-pulse" />
                      <span>ENTER LIVE PIT WALL</span>
                    </Link>
                  ) : (
                    <Link
                      to="/calendar"
                      className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 border border-white/10 transition-colors"
                    >
                      <span>CIRCUIT SPECIFICATIONS</span>
                      <ArrowRight size={13} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
