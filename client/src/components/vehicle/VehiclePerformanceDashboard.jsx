import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Flame, Gauge, Disc, Shield } from 'lucide-react';

export const VehiclePerformanceDashboard = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  const stats = [
    {
      value: "3.8",
      unit: "SEC",
      label: "0–100 KM/H",
      subtext: "STANDING ACCELERATION",
      icon: Zap,
    },
    {
      value: "510",
      unit: "PS",
      label: "POWER OUTPUT",
      subtext: "375 KW @ 8,400 RPM",
      icon: Flame,
    },
    {
      value: "470",
      unit: "NM",
      label: "PEAK TORQUE",
      subtext: "AT 6,150 RPM",
      icon: Activity,
    },
    {
      value: "8,400",
      unit: "RPM",
      label: "MAXIMUM ENGINE SPEED",
      subtext: "9,000 RPM HARD REV LIMIT",
      icon: Gauge,
    },
    {
      value: "6",
      unit: "SPEED",
      label: "SEQUENTIAL TRANSMISSION",
      subtext: "PNEUMATIC PADDLE SHIFT",
      icon: Disc,
    },
  ];

  return (
    <section className="py-16 px-6 sm:px-12 bg-racing-surface border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 bg-racing-black/90 border border-white/10 rounded-xl relative overflow-hidden group hover:border-racing-red/60 transition-all shadow-xl"
              >
                {/* Top Label & Icon */}
                <div className="flex items-center justify-between text-gray-400 mb-3 font-mono text-[10px] uppercase tracking-widest">
                  <span>{stat.label}</span>
                  <Icon size={16} className="text-gray-500 group-hover:text-racing-red transition-colors" />
                </div>

                {/* Number & Unit */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display text-4xl sm:text-5xl font-black text-white tracking-tighter">
                    {stat.value}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-racing-red uppercase">
                    {stat.unit}
                  </span>
                </div>

                {/* Subtext */}
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider pt-2 border-t border-white/5">
                  {stat.subtext}
                </div>

                {/* Subtle Red Bottom Line on Hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-racing-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
