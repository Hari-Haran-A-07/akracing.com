import React, { useState, useEffect } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { TelemetryCanvas } from '../components/3d/TelemetryCanvas';
import { Radio, Activity, Gauge, Flame, Disc, ShieldAlert, Wifi, Zap, Volume2 } from 'lucide-react';

export const LiveRacePage = () => {
  const { telemetry } = useTelemetry();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-racing-black text-white pt-20 pb-16 px-4 sm:px-8 select-none">
      {/* Top Session Command Bar */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="p-6 bg-racing-graphite border border-racing-red flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_30px_rgba(217,4,41,0.2)]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-racing-red animate-ping" />
            <div>
              <span className="text-[10px] font-mono text-racing-red font-bold uppercase tracking-widest">
                ENCRYPTED PIT-TO-CAR TELEMETRY STREAM &bull; MOTEC 1000HZ
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                {telemetry.session}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <div className="text-right">
              <span className="text-[10px] text-racing-silver uppercase">DRIVER:</span>
              <div className="text-white font-bold">{telemetry.driver} (#9)</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-racing-silver uppercase">CAR:</span>
              <div className="text-racing-red font-bold">{telemetry.car}</div>
            </div>
          </div>
        </div>

        {/* Live Race Telemetry Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-mono text-xs">
          <div className="p-4 bg-racing-graphite border border-racing-red">
            <span className="text-[10px] text-racing-silver uppercase">TRACK POSITION</span>
            <div className="font-display text-4xl font-black text-racing-red mt-1">P{telemetry.currentPosition}</div>
            <span className="text-[9px] text-racing-silver uppercase">GAP: {telemetry.gapToLeader}</span>
          </div>

          <div className="p-4 bg-racing-graphite border border-white/10">
            <span className="text-[10px] text-racing-silver uppercase">LAP PROGRESS</span>
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
            <span className="text-[9px] text-purple-400 font-bold uppercase">PURPLE OVERALL BEST</span>
          </div>

          <div className="p-4 bg-racing-graphite border border-white/10">
            <span className="text-[10px] text-racing-silver uppercase">SECTOR 2 (TECHNICAL)</span>
            <div className="font-display text-2xl font-black text-green-400 mt-1">{telemetry.sectors?.s2?.current}</div>
            <span className="text-[9px] text-green-400 font-bold uppercase">GREEN PERSONAL BEST</span>
          </div>

          <div className="p-4 bg-racing-graphite border border-white/10">
            <span className="text-[10px] text-racing-silver uppercase">FUEL CAPACITY</span>
            <div className="font-display text-2xl font-black text-white mt-1">{telemetry.fuelRemainingLiters} <span className="text-xs text-racing-silver">L</span></div>
            <span className="text-[9px] text-racing-silver uppercase">~14 LAPS REMAINING</span>
          </div>
        </div>

        {/* Video Onboard Simulation Feed + Telemetry HUD */}
        <div className="relative w-full h-[380px] sm:h-[500px] bg-black border border-racing-border overflow-hidden shadow-2xl">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover filter contrast-125"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-sports-car-racing-on-a-track-34676-large.mp4" type="video/mp4" />
          </video>

          {/* On-Screen HUD Overlay */}
          <div className="absolute top-6 left-6 p-4 bg-black/80 border border-white/20 backdrop-blur-md font-mono text-xs space-y-1">
            <div className="flex items-center gap-2 text-racing-red font-bold">
              <span className="w-2 h-2 rounded-full bg-racing-red animate-ping" />
              <span>ONBOARD CAM 01 &bull; SPA EAU ROUGE</span>
            </div>
            <div className="text-white">SPEED: <strong className="text-racing-red text-base">{telemetry.currentSpeed} KM/H</strong></div>
            <div className="text-white">GEAR: <strong className="text-white text-base">{telemetry.gear}</strong> | RPM: <strong className="text-white">{telemetry.rpm}</strong></div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-xs bg-black/70 p-3 border border-white/10 backdrop-blur-md">
            <span>PIT STRATEGY: STINT 3 (SLICK COMPOUND MEDIUM)</span>
            <span className="text-racing-red font-bold">LAST PIT: {telemetry.lastPitStop}</span>
          </div>
        </div>

        {/* Real-time Dynamic Telemetry Canvas Visualizer */}
        <TelemetryCanvas />
      </div>
    </div>
  );
};
