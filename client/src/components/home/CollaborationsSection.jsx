import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Globe, Shield, Cpu, Truck, Zap, ArrowRight } from 'lucide-react';

export const CollaborationsSection = () => {
  const collabs = [
    {
      category: "ENDURANCE",
      title: "CREVENTIC 24H SERIES",
      country: "NETHERLANDS & EUROPE",
      desc: "Sanctioning body for premier 12-hour and 24-hour international GT3 endurance championships worldwide.",
      icon: Flag
    },
    {
      category: "GT RACING",
      title: "PORSCHE MOTORSPORT",
      country: "WEISSACH, GERMANY",
      desc: "Factory-homologated Porsche 911 GT3 Cup technical engineering, parts support, and engine servicing.",
      icon: Zap
    },
    {
      category: "TELEMETRY & SENSORS",
      title: "MOTEC SYSTEMS",
      country: "AUSTRALIA & GLOBAL",
      desc: "High-frequency 1,000Hz data acquisition loggers, CAN bus telemetry, and predictive tire degradation modeling.",
      icon: Cpu
    },
    {
      category: "SAFETY & GEAR",
      title: "HRX MOTORSPORT",
      country: "ITALY",
      desc: "Custom bespoke FIA 8856-2018 homologated race suits, driver gloves, and lightweight Nomex undergarments.",
      icon: Shield
    },
    {
      category: "GLOBAL LOGISTICS",
      title: "PADDOCK OPERATIONS",
      country: "MIDDLE EAST & EUROPE",
      desc: "Seamless air and sea freight logistics moving racing chassis, spares, and pit equipment between international rounds.",
      icon: Truck
    }
  ];

  return (
    <section className="py-28 px-6 sm:px-12 bg-racing-surface border-b border-racing-border relative select-none overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                STRATEGIC ALLIANCES & PARTNER ORGANIZATIONS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              OUR <span className="text-racing-red">COLLABORATIONS</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-widest">
              ENDURANCE &bull; GT RACING &bull; TELEMETRY &bull; MOTORSPORT LOGISTICS
            </p>
          </div>

          <div className="px-4 py-2 bg-racing-black border border-white/10 rounded font-mono text-xs text-gray-300">
            NETWORK: <strong className="text-racing-red">GLOBAL MOTORSPORT</strong>
          </div>
        </div>

        {/* Horizontal Scrolling / Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collabs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 bg-racing-black/80 border border-white/10 rounded-xl hover:border-racing-red/60 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[10px] font-mono text-racing-red font-bold uppercase tracking-widest">
                      {item.category}
                    </span>
                    <Icon size={16} className="text-gray-500 group-hover:text-racing-red transition-colors" />
                  </div>

                  <h3 className="font-display text-xl font-bold uppercase text-white group-hover:text-racing-red transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400 uppercase">
                    <Globe size={11} className="text-racing-red" />
                    <span>{item.country}</span>
                  </div>

                  <p className="text-xs font-sans text-gray-400 leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span>ACTIVE COLLABORATION</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
