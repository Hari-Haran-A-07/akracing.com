import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Calendar, MapPin, Radio, Clock, CheckCircle, ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RaceCountdown } from '../components/telemetry/RaceCountdown';

export const CalendarPage = () => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchRaces = async () => {
      try {
        const res = await api.getRaces();
        if (res.success) {
          setRaces(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRaces();
  }, []);

  const filtered = races.filter((race) => {
    const matchRegion = regionFilter === 'ALL' || race.country.toUpperCase() === regionFilter.toUpperCase();
    const matchStatus = statusFilter === 'ALL' || race.status.toUpperCase() === statusFilter.toUpperCase();
    return matchRegion && matchStatus;
  });

  return (
    <div className="min-h-screen bg-racing-black text-white pt-24 select-none">
      {/* Hero */}
      <section className="py-20 px-6 sm:px-12 border-b border-racing-border relative overflow-hidden">
        <div className="absolute inset-0 bg-carbon-pattern opacity-30" />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-racing-red" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
              GLOBAL ENDURANCE SCHEDULE
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            RACE <span className="text-racing-red">CALENDAR</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            2026 CAMPAIGN &bull; MIDDLE EAST TROPHY &bull; 24H SERIES EUROPEAN ENDURANCE
          </p>

          <RaceCountdown
            targetDate="2026-05-18T10:00:00Z"
            raceName="12H SPA-FRANCORCHAMPS"
            circuit="CIRCUIT DE SPA-FRANCORCHAMPS, BELGIUM"
            round="ROUND 03 &bull; 24H SERIES"
          />
        </div>
      </section>

      {/* Filter Ribbon */}
      <section className="py-8 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-racing-silver uppercase mr-2">STATUS:</span>
            {['ALL', 'UPCOMING', 'LIVE', 'COMPLETED'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition-colors ${
                  statusFilter === tab ? 'bg-racing-red text-white' : 'bg-black/50 text-racing-silver hover:text-white border border-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Region Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-racing-silver uppercase mr-2">REGION:</span>
            {['ALL', 'UAE', 'ITALY', 'BELGIUM', 'SPAIN'].map((region) => (
              <button
                key={region}
                onClick={() => setRegionFilter(region)}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition-colors ${
                  regionFilter === region ? 'bg-white text-black' : 'bg-black/50 text-racing-silver hover:text-white border border-white/10'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Races Schedule Cards */}
      <section className="py-24 px-6 sm:px-12 bg-racing-black">
        <div className="max-w-7xl mx-auto space-y-8">
          {filtered.map((race) => {
            const isLive = race.status === 'live';
            const isCompleted = race.status === 'completed';

            return (
              <div
                key={race.id}
                className={`p-8 bg-racing-graphite border transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isLive
                    ? 'border-racing-red shadow-[0_0_30px_rgba(217,4,41,0.25)]'
                    : 'border-racing-border hover:border-white/40'
                }`}
              >
                {/* Col 1: Round & Flag */}
                <div className="lg:col-span-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-black text-white">{race.round}</span>
                    {isLive && (
                      <span className="bg-racing-red text-white text-[9px] font-mono font-bold px-2 py-0.5 animate-pulse uppercase">
                        LIVE RACE
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-racing-red uppercase font-bold tracking-widest flex items-center gap-1.5">
                    <MapPin size={12} /> {race.country} &bull; {race.location}
                  </div>
                </div>

                {/* Col 2: Event Title & Circuit */}
                <div className="lg:col-span-4 space-y-1">
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-tight">
                    {race.title}
                  </h3>
                  <div className="text-xs font-mono text-racing-silver">{race.circuit}</div>
                </div>

                {/* Col 3: Track Specs */}
                <div className="lg:col-span-3 grid grid-cols-2 gap-3 p-3 bg-black/60 border border-white/5 font-mono text-xs">
                  <div>
                    <span className="text-[9px] text-racing-silver uppercase">DATE</span>
                    <div className="text-white font-bold mt-0.5">{race.date}</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-racing-silver uppercase">TRACK LENGTH</span>
                    <div className="text-white font-bold mt-0.5">{race.trackLength}</div>
                  </div>
                </div>

                {/* Col 4: Action */}
                <div className="lg:col-span-2 flex justify-end">
                  {isLive ? (
                    <Link
                      to="/live"
                      className="w-full lg:w-auto px-6 py-3 bg-racing-red hover:bg-racing-crimson text-white text-xs font-mono font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                      <Radio size={14} className="animate-pulse" />
                      <span>LIVE STREAM</span>
                    </Link>
                  ) : isCompleted ? (
                    <Link
                      to="/results"
                      className="w-full lg:w-auto px-6 py-3 bg-white/5 hover:bg-white/15 text-white text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 border border-white/20 transition-colors"
                    >
                      <span>VIEW RESULTS</span>
                    </Link>
                  ) : (
                    <span className="text-xs font-mono text-racing-silver/70 uppercase">
                      REGISTRATION OPEN
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
