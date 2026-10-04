import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gauge, Cpu, Flame, Disc, ShieldCheck, Crosshair } from 'lucide-react';
import { CarViewer360 } from '../3d/CarViewer360';

export const MachineShowcase = ({ car }) => {
  const specs = [
    { label: "ENGINE CONFIGURATION", value: "4.0L NATURALLY ASPIRATED FLAT-6", icon: Flame },
    { label: "PEAK POWER OUTPUT", value: "510 BHP @ 8,400 RPM", icon: Gauge },
    { label: "TOP SPEED (AERO DEPENDENT)", value: "305 KM/H", icon: Crosshair },
    { label: "HOMOLOGATED MIN WEIGHT", value: "1,260 KG (DRY)", icon: ShieldCheck },
    { label: "TRANSMISSION", value: "6-SPEED SEQUENTIAL DOG-RING", icon: Cpu },
    { label: "AERODYNAMIC DOWNFORCE", value: "850 KG @ 250 KM/H", icon: Disc }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                THE HOMOLOGATED WEAPON
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              THE <span className="text-racing-red">MACHINE</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest">
              AKR PORSCHE 911 GT3 CUP (#9) &bull; 24H SERIES HOMOLOGATED &bull; 510 BHP FLAT-6
            </p>
          </div>

          <Link
            to="/cars/akr-gt3-01"
            className="px-6 py-3.5 border border-white/20 hover:border-racing-red text-white hover:text-racing-red text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors self-start md:self-auto"
          >
            <span>FULL SPECIFICATION SHEET</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 360 Interactive Car Viewer */}
        <CarViewer360 car={car} />

        {/* Technical Specs Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-racing-graphite border border-racing-border hover:border-racing-red/50 transition-all group"
              >
                <div className="flex items-center justify-between text-racing-silver mb-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase">{item.label}</span>
                  <Icon size={18} className="text-white/40 group-hover:text-racing-red transition-colors" />
                </div>
                <div className="font-display text-xl sm:text-2xl font-black uppercase text-white group-hover:text-racing-red transition-colors">
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
