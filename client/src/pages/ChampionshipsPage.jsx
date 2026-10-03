import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Trophy, Award, Flag, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export const ChampionshipsPage = () => {
  const [championships, setChampionships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchChampionships = async () => {
      try {
        const res = await api.getChampionships();
        if (res.success) {
          setChampionships(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChampionships();
  }, []);

  return (
    <div className="min-h-screen bg-racing-black text-white pt-24 select-none">
      {/* Hero */}
      <section className="py-20 px-6 sm:px-12 border-b border-racing-border relative overflow-hidden">
        <div className="absolute inset-0 bg-carbon-pattern opacity-30" />
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-racing-red" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
              CHAMPIONSHIP STANDINGS & STATS
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            2026 <span className="text-racing-red">CHAMPIONSHIPS</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            POINTS, CLASSIFICATION, AND ROUND SCHEDULES ACROSS INTERNATIONAL GT ENDURANCE SERIES
          </p>
        </div>
      </section>

      {/* Championships Detailed Standings */}
      <section className="py-24 px-6 sm:px-12 bg-racing-graphite">
        <div className="max-w-7xl mx-auto space-y-12">
          {championships.map((champ) => (
            <div
              key={champ.id}
              className="bg-racing-black border border-racing-border overflow-hidden p-8 space-y-8 shadow-2xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold bg-racing-red text-white px-2.5 py-0.5 uppercase tracking-widest">
                      {champ.season} SEASON
                    </span>
                    <span className="text-xs font-mono text-racing-silver">{champ.category}</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white mt-2">
                    {champ.title}
                  </h2>
                </div>

                <div className="flex items-center gap-6 font-mono text-xs">
                  <div className="p-4 bg-racing-graphite border border-white/10">
                    <span className="text-[10px] text-racing-silver uppercase">CURRENT POSITION</span>
                    <div className="font-display text-2xl font-black text-racing-red">{champ.currentPosition}</div>
                  </div>
                  <div className="p-4 bg-racing-graphite border border-white/10">
                    <span className="text-[10px] text-racing-silver uppercase">POINTS ACCUMULATED</span>
                    <div className="font-display text-2xl font-black text-white">{champ.points} PTS</div>
                  </div>
                </div>
              </div>

              <p className="text-sm font-sans text-racing-silver leading-relaxed max-w-4xl">
                {champ.description}
              </p>

              {/* Verified Driver & Vehicle Entry */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs p-4 bg-racing-graphite border border-white/5">
                <div>
                  <span className="text-[10px] text-racing-silver uppercase">LEAD DRIVER</span>
                  <div className="text-white font-bold mt-0.5">{champ.driver || "AJITH KUMAR"}</div>
                </div>
                <div>
                  <span className="text-[10px] text-racing-silver uppercase">COMPETITION CAR</span>
                  <div className="text-white font-bold mt-0.5">{champ.car || "AKR GT3-01 (#9)"}</div>
                </div>
                <div>
                  <span className="text-[10px] text-racing-silver uppercase">STATUS</span>
                  <div className="text-racing-red font-bold mt-0.5">{champ.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
