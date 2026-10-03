import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Trophy, Award, Timer, Flag, ArrowRight, ShieldCheck } from 'lucide-react';

export const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchResults = async () => {
      try {
        const res = await api.getResults();
        if (res.success) {
          setResults(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
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
              OFFICIAL CLASSIFICATION & TELEMETRY LOGS
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            RACE <span className="text-racing-red">RESULTS</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            QUALIFYING BENCHMARKS &bull; RACE FINISH POSITIONS &bull; SECTOR DELTAS
          </p>
        </div>
      </section>

      {/* Results Detail Table */}
      <section className="py-24 px-6 sm:px-12 bg-racing-graphite">
        <div className="max-w-7xl mx-auto space-y-8">
          {results.map((res) => {
            const isWinner = res.racePosition.includes('P1') || res.racePosition.includes('VICTORY');
            return (
              <div
                key={res.id}
                className={`p-8 bg-racing-black border space-y-6 shadow-2xl transition-all ${
                  isWinner ? 'border-racing-red' : 'border-racing-border'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-racing-red font-bold uppercase tracking-widest">
                      {res.round} &bull; {res.date}
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white">
                      {res.raceTitle}
                    </h2>
                    <p className="text-xs font-mono text-racing-silver">{res.circuit}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`px-6 py-3 border font-display text-2xl font-black uppercase tracking-wider flex items-center gap-2 ${
                      isWinner ? 'bg-racing-red text-white border-racing-red' : 'bg-white/10 text-white border-white/20'
                    }`}>
                      <Trophy size={20} />
                      <span>{res.racePosition}</span>
                    </div>
                  </div>
                </div>

                {/* Telemetry Breakdown Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                  <div className="p-4 bg-racing-graphite border border-white/5">
                    <span className="text-[10px] text-racing-silver uppercase">QUALIFYING</span>
                    <div className="font-display text-xl font-black text-white mt-1">{res.qualifying}</div>
                  </div>
                  <div className="p-4 bg-racing-graphite border border-white/5">
                    <span className="text-[10px] text-racing-silver uppercase">FASTEST LAP</span>
                    <div className="font-display text-xl font-black text-racing-red mt-1">{res.fastestLap}</div>
                  </div>
                  <div className="p-4 bg-racing-graphite border border-white/5">
                    <span className="text-[10px] text-racing-silver uppercase">CHAMPIONSHIP POINTS</span>
                    <div className="font-display text-xl font-black text-white mt-1">+{res.points} PTS</div>
                  </div>
                  <div className="p-4 bg-racing-graphite border border-white/5">
                    <span className="text-[10px] text-racing-silver uppercase">STATUS</span>
                    <div className="font-display text-lg font-bold text-green-400 mt-1">{res.status}</div>
                  </div>
                </div>

                {/* Sector Times */}
                {res.sectorTimes && (
                  <div className="p-4 bg-racing-carbon border border-white/5 font-mono text-xs flex flex-wrap items-center justify-between gap-4">
                    <div className="text-racing-silver">SECTOR DELTAS:</div>
                    <div className="flex items-center gap-6">
                      <span>SECTOR 1: <strong className="text-white">{res.sectorTimes.s1}</strong></span>
                      <span>SECTOR 2: <strong className="text-white">{res.sectorTimes.s2}</strong></span>
                      <span>SECTOR 3: <strong className="text-white">{res.sectorTimes.s3}</strong></span>
                    </div>
                  </div>
                )}

                {/* Highlights Note */}
                <p className="text-xs sm:text-sm text-racing-silver/90 font-sans italic leading-relaxed pt-2">
                  "{res.highlights}"
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
