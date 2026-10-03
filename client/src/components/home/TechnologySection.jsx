import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wind, Cpu, Activity, Disc, Zap, ShieldAlert, Sliders } from 'lucide-react';
import { AeroWindTunnel } from '../3d/AeroWindTunnel';

export const TechnologySection = () => {
  const techPillars = [
    {
      title: "CFD AERODYNAMICS",
      desc: "Computational Fluid Dynamics calculating 850kg of downforce through underfloor ground-effect venturis without parasitic drag.",
      icon: Wind,
      badge: "850 KG DOWNFORCE"
    },
    {
      title: "MOTEC TELEMETRY LAB",
      desc: "120 sensor channels logged at 1,000Hz monitoring damper velocities, steering angle, and tire carcass thermal degradation.",
      icon: Activity,
      badge: "1,000 HZ FREQUENCY"
    },
    {
      title: "6-DOF SIMULATION RIG",
      desc: "LiDAR-scanned digital twins of Spa and Monza running hardware-in-the-loop kinematics for driver stint calibration.",
      icon: Cpu,
      badge: "LIDAR SCANNED"
    },
    {
      title: "THERMAL MANAGEMENT",
      desc: "Multi-stage dry-sump lubrication and titanium exhaust routing sustaining 8,500+ RPM in 50°C cockpit conditions.",
      icon: Disc,
      badge: "DRY-SUMP OIL MATRIX"
    }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                ADVANCED MOTORSPORT ENGINEERING
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              ENGINEERED FOR <span className="text-racing-red">PERFORMANCE</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest">
              SPEED × AERODYNAMICS × TELEMETRY × HUMAN ENDURANCE
            </p>
          </div>

          <Link
            to="/technology"
            className="px-6 py-3.5 border border-white/20 hover:border-racing-red text-white hover:text-racing-red text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors self-start md:self-auto"
          >
            <span>DISCOVER TECHNICAL DIVISIONS</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Live CFD Wind Tunnel Canvas */}
        <AeroWindTunnel />

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-racing-black border border-racing-border hover:border-racing-red/60 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-racing-red font-bold px-2 py-0.5 bg-racing-red/10 border border-racing-red/30">
                      {pillar.badge}
                    </span>
                    <Icon size={20} className="text-white/40 group-hover:text-racing-red transition-colors" />
                  </div>
                  <h3 className="font-display text-xl font-black uppercase text-white group-hover:text-racing-red transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-racing-silver font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center gap-2 text-xs font-mono font-bold text-white/60 group-hover:text-racing-red transition-colors">
                  <span>LEARN MORE</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
