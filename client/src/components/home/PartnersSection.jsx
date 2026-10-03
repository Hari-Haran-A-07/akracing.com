import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, ArrowRight } from 'lucide-react';

export const PartnersSection = ({ partners = [] }) => {
  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                OFFICIAL TECHNICAL ALLIANCES
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              OFFICIAL <span className="text-racing-red">PARTNERS</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest">
              HOMOLOGATED TECHNICAL EXCELLENCE &bull; WORLD-CLASS MOTORSPORT SUPPLIERS
            </p>
          </div>

          <Link
            to="/partners"
            className="px-6 py-3.5 border border-white/20 hover:border-racing-red text-white hover:text-racing-red text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors self-start md:self-auto"
          >
            <span>PARTNERSHIP OVERVIEW</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Partners Monochrome Grid with Color Reveal on Hover */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.website}
              target="_blank"
              rel="noreferrer"
              className="p-6 bg-racing-graphite border border-racing-border hover:border-racing-red flex flex-col items-center justify-between text-center group transition-all duration-300 min-h-[160px]"
            >
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest group-hover:text-racing-red transition-colors">
                {partner.tier}
              </span>

              {/* Logo Emblem Text / Graphic */}
              <div className="font-display text-xl font-black uppercase text-white/50 group-hover:text-white transition-colors duration-300 my-auto">
                {partner.logo}
              </div>

              <div className="flex items-center gap-1 text-[10px] font-mono text-white/40 group-hover:text-racing-red transition-colors">
                <span>{partner.category}</span>
                <ArrowUpRight size={10} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
