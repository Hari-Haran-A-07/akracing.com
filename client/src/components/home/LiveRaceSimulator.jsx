import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, Activity, Gauge, Disc, ArrowRight, ShieldCheck, Flame, Zap } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';
import { TelemetryCanvas } from '../3d/TelemetryCanvas';

export const LiveRaceSimulator = () => {
  const { telemetry } = useTelemetry();

  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative overflow-hidden select-none">
      {/* Background Grid & Red Light Pulse */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-racing-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-racing-red animate-ping" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-red font-bold">
                REAL-TIME TELEMETRY FEED &bull; 5G ENCRYPTED
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              VIRTUAL <span className="text-racing-red">PIT WALL</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest">
              {telemetry.session} &bull; DRIVER: {telemetry.driver}
            </p>
          </div>

          <Link
            to="/live"
            className="px-6 py-3.5 bg-racing-red hover:bg-racing-crimson text-white text-xs font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-colors self-start lg:self-auto shadow-lg shadow-racing-red/30"
          >
            <Radio size={14} className="animate-pulse" />
            <span>OPEN FULLSCREEN PIT WALL</span>
          </Link>
        </div>

        {/* Live Race Status Metric Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 font-mono text-xs">
          <div className="p-4 bg-racing-graphite border border-racing-red/40 shadow-lg">
            <span className="text-[10px] text-racing-silver uppercase">TRACK POSITION</span>
            <div className="font-display text-3xl font-black text-racing-red mt-1">P{telemetry.currentPosition}</div>
            <span className="text-[9px] text-racing-silver uppercase">GAP: {telemetry.gapToLeader}</span>
          </div>

          <div className="p-4 bg-racing-graphite border border-white/10">
            <span className="text-[10px] text-racing-silver uppercase">CURRENT LAP</span>
            <div className="font-display text-3xl font-black text-white mt-1">{telemetry.currentLap} <span className="text-xs text-racing-silver">/ {telemetry.totalLaps}</span></div>
            <span className="text-[9px] text-racing-silver uppercase">STINT: 22 LAPS</span>
          </div>

          <div className="p-4 bg-racing-graphite border border-white/10">
            <span className="text-[10px] text-racing-silver uppercase">LAST LAP TIME</span>
            <div className="font-display text-2xl font-black text-white mt-1">{telemetry.lapTime}</div>
            <span className="text-[9px] text-racing-silver uppercase">BEST: {telemetry.bestLap}</span>
          </div>

          <div className="p-4 bg-racing-graphite border border-white/10">
            <span className="text-[10px] text-racing-silver uppercase">SECTOR 1 (SPEED TRAP)</span>
            <div className="font-display text-2xl font-black text-purple-400 mt-1">{telemetry.sectors?.s1?.current}</div>
            <span className="text-[9px] text-purple-400 font-bold uppercase">PURPLE BENCHMARK</span>
          </div>

          <div className="p-4 bg-racing-graphite border border-white/10">
            <span className="text-[10px] text-racing-silver uppercase">SECTOR 2 (TECHNICAL)</span>
            <div className="font-display text-2xl font-black text-green-400 mt-1">{telemetry.sectors?.s2?.current}</div>
            <span className="text-[9px] text-green-400 font-bold uppercase">GREEN PERSONAL BEST</span>
          </div>

          <div className="p-4 bg-racing-graphite border border-white/10">
            <span className="text-[10px] text-racing-silver uppercase">FUEL REMAINING</span>
            <div className="font-display text-2xl font-black text-white mt-1">{telemetry.fuelRemainingLiters} <span className="text-xs text-racing-silver">L</span></div>
            <span className="text-[9px] text-racing-silver uppercase">~14 LAPS REMAINING</span>
          </div>
        </div>

        {/* Live Canvas Telemetry Visualizer */}
        <TelemetryCanvas />

        {/* Tyre & Brake Thermal Management Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {/* Tyre Carcass Heatmap */}
          <div className="p-6 bg-racing-graphite border border-racing-border space-y-4">
            <div className="flex items-center justify-between text-racing-silver border-b border-white/10 pb-3">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <Disc size={14} className="text-racing-red" /> TYRE TEMPERATURE & PRESSURE CARCASS
              </span>
              <span className="text-racing-red font-bold">OPTIMAL: 85°C–95°C</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-black border border-white/5 space-y-1">
                <span className="text-[10px] text-racing-silver">FRONT LEFT (FL)</span>
                <div className="flex justify-between items-baseline">
                  <span className="font-display text-xl font-bold text-white">{telemetry.tyreTemp?.fl}°C</span>
                  <span className="text-[11px] text-green-400">{telemetry.tyrePressure?.fl} BAR</span>
                </div>
              </div>

              <div className="p-3 bg-black border border-white/5 space-y-1">
                <span className="text-[10px] text-racing-silver">FRONT RIGHT (FR)</span>
                <div className="flex justify-between items-baseline">
                  <span className="font-display text-xl font-bold text-racing-red">{telemetry.tyreTemp?.fr}°C</span>
                  <span className="text-[11px] text-green-400">{telemetry.tyrePressure?.fr} BAR</span>
                </div>
              </div>

              <div className="p-3 bg-black border border-white/5 space-y-1">
                <span className="text-[10px] text-racing-silver">REAR LEFT (RL)</span>
                <div className="flex justify-between items-baseline">
                  <span className="font-display text-xl font-bold text-white">{telemetry.tyreTemp?.rl}°C</span>
                  <span className="text-[11px] text-green-400">{telemetry.tyrePressure?.rl} BAR</span>
                </div>
              </div>

              <div className="p-3 bg-black border border-white/5 space-y-1">
                <span className="text-[10px] text-racing-silver">REAR RIGHT (RR)</span>
                <div className="flex justify-between items-baseline">
                  <span className="font-display text-xl font-bold text-white">{telemetry.tyreTemp?.rr}°C</span>
                  <span className="text-[11px] text-green-400">{telemetry.tyrePressure?.rr} BAR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Brake Rotor Temperatures */}
          <div className="p-6 bg-racing-graphite border border-racing-border space-y-4">
            <div className="flex items-center justify-between text-racing-silver border-b border-white/10 pb-3">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <Flame size={14} className="text-racing-red" /> CARBON-CERAMIC BRAKE ROTOR TEMPS
              </span>
              <span className="text-racing-red font-bold">THERMAL BAND: 450°C–650°C</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-black border border-white/5 space-y-1">
                <span className="text-[10px] text-racing-silver">FRONT ROTORS</span>
                <div className="font-display text-2xl font-black text-racing-red">
                  {telemetry.brakeTemp?.fr}°C
                </div>
                <div className="w-full h-1 bg-white/10 overflow-hidden">
                  <div className="h-full bg-racing-red" style={{ width: `${(telemetry.brakeTemp?.fr / 800) * 100}%` }} />
                </div>
              </div>

              <div className="p-3 bg-black border border-white/5 space-y-1">
                <span className="text-[10px] text-racing-silver">REAR ROTORS</span>
                <div className="font-display text-2xl font-black text-white">
                  {telemetry.brakeTemp?.rr}°C
                </div>
                <div className="w-full h-1 bg-white/10 overflow-hidden">
                  <div className="h-full bg-white/60" style={{ width: `${(telemetry.brakeTemp?.rr / 800) * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="p-3 bg-black/60 border border-white/5 text-[11px] text-racing-silver flex items-center justify-between">
              <span>PIT STOP WINDOW:</span>
              <span className="text-white font-bold">{telemetry.lastPitStop}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
