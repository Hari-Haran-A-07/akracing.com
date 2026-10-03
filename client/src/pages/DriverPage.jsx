import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Trophy, Award, Gauge, Flag, Zap, Shield, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const DriverPage = () => {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTimelineTab, setActiveTimelineTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDriver = async () => {
      try {
        const res = await api.getDriver();
        if (res.success) {
          setDriver(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDriver();
  }, []);

  if (loading || !driver) {
    return (
      <div className="min-h-screen bg-racing-black flex items-center justify-center text-white font-mono">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-racing-red animate-ping" />
          <span>LOADING DRIVER TELEMETRY PROFILE...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-racing-black text-white pt-24 select-none">
      {/* Hero Banner */}
      <section className="relative py-20 px-6 sm:px-12 border-b border-racing-border overflow-hidden">
        <div className="absolute inset-0 bg-carbon-pattern opacity-40" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-racing-red/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                OFFICIAL DRIVER PROFILE & PEDIGREE
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tighter text-white leading-none">
              AJITH <span className="text-racing-red">KUMAR</span>
            </h1>

            <p className="font-display text-2xl font-bold uppercase tracking-tight text-racing-silver">
              CAR #09 &bull; LEAD DRIVER & TEAM PRINCIPAL
            </p>

            <p className="text-sm sm:text-base text-racing-silver/90 font-sans leading-relaxed max-w-2xl">
              {driver.bio}
            </p>

            <div className="p-6 bg-racing-graphite border-l-4 border-racing-red border-y border-r border-racing-border">
              <p className="font-display text-lg font-bold uppercase text-white italic">
                "{driver.philosophy}"
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="border border-racing-border bg-racing-graphite overflow-hidden shadow-2xl relative group">
              <img
                src={driver.images?.portrait || driver.images?.racingSuit}
                alt="Ajith Kumar"
                className="w-full h-[540px] object-cover filter contrast-110 grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute top-6 right-6 bg-racing-red text-white p-3 font-display font-black text-2xl">
                #09
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Statistics Ribbon */}
      <section className="py-16 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 font-mono">
          <div className="p-4 bg-racing-carbon border border-white/5">
            <span className="text-[10px] text-racing-silver uppercase">RACE STARTS</span>
            <div className="font-display text-3xl font-black text-white mt-1">{driver.stats.raceStarts}</div>
            <span className="text-[9px] text-racing-silver uppercase">INTERNATIONAL</span>
          </div>
          <div className="p-4 bg-racing-carbon border border-white/5">
            <span className="text-[10px] text-racing-silver uppercase">PODIUMS</span>
            <div className="font-display text-3xl font-black text-racing-red mt-1">{driver.stats.podiums}</div>
            <span className="text-[9px] text-racing-silver uppercase">F3 & 24H SERIES</span>
          </div>
          <div className="p-4 bg-racing-carbon border border-white/5">
            <span className="text-[10px] text-racing-silver uppercase">RACE WINS</span>
            <div className="font-display text-3xl font-black text-white mt-1">{driver.stats.wins}</div>
            <span className="text-[9px] text-racing-silver uppercase">ENDURANCE & SPRINT</span>
          </div>
          <div className="p-4 bg-racing-carbon border border-white/5">
            <span className="text-[10px] text-racing-silver uppercase">POLE POSITIONS</span>
            <div className="font-display text-3xl font-black text-white mt-1">{driver.stats.polePositions}</div>
            <span className="text-[9px] text-racing-silver uppercase">QUALIFYING</span>
          </div>
          <div className="p-4 bg-racing-carbon border border-white/5">
            <span className="text-[10px] text-racing-silver uppercase">FASTEST LAPS</span>
            <div className="font-display text-3xl font-black text-white mt-1">{driver.stats.fastestLaps}</div>
            <span className="text-[9px] text-racing-silver uppercase">LAP BENCHMARKS</span>
          </div>
          <div className="p-4 bg-racing-carbon border border-white/5">
            <span className="text-[10px] text-racing-silver uppercase">TITLES</span>
            <div className="font-display text-3xl font-black text-racing-red mt-1">{driver.stats.championships}</div>
            <span className="text-[9px] text-racing-silver uppercase">CHAMPIONSHIPS</span>
          </div>
        </div>
      </section>

      {/* Interactive Career Timeline */}
      <section id="timeline" className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                CHRONOLOGICAL MOTORSPORT EVOLUTION
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              CAREER <span className="text-racing-red">TIMELINE</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest">
              2002 &bull; 2004 &bull; 2010 &bull; 2024 &bull; 2026 CAMPAIGN
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-8">
            {driver.careerTimeline?.map((item, idx) => (
              <div
                key={idx}
                className="p-8 bg-racing-graphite border border-racing-border hover:border-racing-red transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-3 space-y-2">
                  <div className="font-display text-3xl font-black text-racing-red uppercase">{item.year}</div>
                  <div className="text-xs font-mono text-white font-bold uppercase tracking-wider">{item.period}</div>
                  <div className="text-[11px] font-mono text-racing-silver uppercase flex items-center gap-1">
                    <MapPin size={12} className="text-racing-red" /> {item.circuit}
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-3">
                  <span className="text-[10px] font-mono bg-racing-carbon px-2.5 py-1 text-white border border-white/10 uppercase tracking-widest">
                    {item.category}
                  </span>
                  <p className="text-sm font-sans text-racing-silver leading-relaxed pt-1">
                    {item.description}
                  </p>
                  <div className="p-3 bg-black/60 border border-racing-red/30 text-xs font-mono text-racing-red font-bold uppercase flex items-center gap-2">
                    <Trophy size={14} />
                    <span>ACHIEVEMENT: {item.achievement}</span>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <img
                    src={item.image}
                    alt={item.period}
                    className="w-full h-40 object-cover border border-white/10 filter brightness-70 hover:brightness-100 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Driver Biometric & Cockpit Setup Specs */}
      <section className="py-24 px-6 sm:px-12 bg-racing-graphite">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-red font-bold">
              PHYSICAL & ERGONOMIC PARAMETERS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              COCKPIT & DRIVER <span className="text-racing-red">SPECIFICATIONS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-6 bg-racing-black border border-racing-border">
              <span className="text-racing-silver uppercase">DRIVER HEIGHT / WEIGHT</span>
              <div className="font-display text-2xl font-black text-white mt-1">{driver.specs?.height} / {driver.specs?.weight}</div>
            </div>
            <div className="p-6 bg-racing-black border border-racing-border">
              <span className="text-racing-silver uppercase">BLOOD TYPE / MEDICAL HOMOLOGATION</span>
              <div className="font-display text-2xl font-black text-racing-red mt-1">{driver.specs?.bloodType} &bull; FIA GRADE A</div>
            </div>
            <div className="p-6 bg-racing-black border border-racing-border">
              <span className="text-racing-silver uppercase">PRIMARY TESTING CIRCUITS</span>
              <div className="font-display text-xl font-bold text-white mt-1">{driver.specs?.homeCircuit}</div>
            </div>
            <div className="p-6 bg-racing-black border border-racing-border sm:col-span-2 lg:col-span-3">
              <span className="text-racing-silver uppercase">PREFERRED VEHICLE KINEMATIC SETUP</span>
              <div className="font-display text-lg font-bold text-white mt-1">{driver.specs?.preferredSetup}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
