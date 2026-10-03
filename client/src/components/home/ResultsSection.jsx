import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowRight, Flag, Timer, Award } from 'lucide-react';

export const ResultsSection = ({ results = [] }) => {
  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                OFFICIAL RACE CLASSIFICATION
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              LATEST <span className="text-racing-red">RESULTS</span>
            </h2>
          </div>

          <Link
            to="/results"
            className="px-6 py-3.5 border border-white/20 hover:border-racing-red text-white hover:text-racing-red text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors self-start md:self-auto"
          >
            <span>FULL RESULTS ARCHIVE</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Results Responsive Table / Dashboard Cards */}
        <div className="space-y-4">
          {results.map((res) => {
            const isWinner = res.racePosition.includes('P1') || res.racePosition.includes('VICTORY');
            const isPodium = res.racePosition.includes('P2') || res.racePosition.includes('P3') || res.racePosition.includes('PODIUM');

            return (
              <div
                key={res.id}
                className={`p-6 bg-racing-black border transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center ${
                  isWinner
                    ? 'border-racing-red shadow-[0_0_25px_rgba(217,4,41,0.25)]'
                    : isPodium
                    ? 'border-white/20 hover:border-racing-red/60'
                    : 'border-racing-border'
                }`}
              >
                {/* Col 1: Round & Date */}
                <div className="lg:col-span-3 space-y-1">
                  <div className="text-[10px] font-mono text-racing-red uppercase font-bold tracking-widest">
                    {res.round} &bull; {res.season}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-tight">
                    {res.raceTitle}
                  </h3>
                  <div className="text-xs font-mono text-racing-silver">{res.circuit}</div>
                </div>

                {/* Col 2: Position Badge */}
                <div className="lg:col-span-3 flex items-center gap-3">
                  <div className={`px-4 py-2 border font-display text-lg sm:text-xl font-black uppercase tracking-wider flex items-center gap-2 ${
                    isWinner
                      ? 'bg-racing-red text-white border-racing-red'
                      : 'bg-white/10 text-white border-white/20'
                  }`}>
                    <Trophy size={18} />
                    <span>{res.racePosition}</span>
                  </div>
                  <div className="text-xs font-mono text-racing-silver">
                    QUALIFYING: <strong className="text-white">{res.qualifying}</strong>
                  </div>
                </div>

                {/* Col 3: Sector & Fastest Lap */}
                <div className="lg:col-span-3 grid grid-cols-2 gap-2 text-xs font-mono text-racing-silver bg-racing-carbon p-3 border border-white/5">
                  <div>
                    <span className="text-[9px] uppercase text-white/40">FASTEST LAP</span>
                    <div className="text-white font-bold">{res.fastestLap}</div>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-white/40">CHAMPIONSHIP</span>
                    <div className="text-racing-red font-bold">+{res.points} PTS</div>
                  </div>
                </div>

                {/* Col 4: Summary Note & Link */}
                <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-2">
                  <p className="text-xs text-racing-silver/90 font-sans italic line-clamp-2">
                    "{res.highlights}"
                  </p>
                  <Link
                    to="/results"
                    className="text-xs font-mono font-bold text-white hover:text-racing-red flex items-center gap-1.5 transition-colors self-start"
                  >
                    <span>TELEMETRY REPORT</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
