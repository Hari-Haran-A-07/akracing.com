import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ArrowUpRight, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPartners = async () => {
      try {
        const res = await api.getPartners();
        if (res.success) {
          setPartners(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
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
              OFFICIAL TECHNICAL ALLIANCES
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            OFFICIAL <span className="text-racing-red">PARTNERS</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            WORLD-CLASS MOTORSPORT BRANDS, HOMOLOGATED SAFETY & TELEMETRY HARDWARE
          </p>
        </div>
      </section>

      {/* Partners Detailed Grid */}
      <section className="py-24 px-6 sm:px-12 bg-racing-graphite">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="p-8 bg-racing-black border border-racing-border hover:border-racing-red transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-racing-red font-bold px-2.5 py-0.5 bg-racing-red/10 border border-racing-red/30 uppercase tracking-widest">
                      {partner.tier} PARTNER
                    </span>
                    <span className="text-xs font-mono text-racing-silver">{partner.category}</span>
                  </div>

                  {/* Logo Display */}
                  <div className="font-display text-3xl font-black uppercase text-white group-hover:text-racing-red transition-colors py-4">
                    {partner.logo}
                  </div>

                  <p className="text-xs sm:text-sm text-racing-silver font-sans leading-relaxed">
                    {partner.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-racing-red uppercase tracking-wider transition-colors"
                  >
                    <span>VISIT PARTNER PORTAL</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Partnership Inquiries CTA */}
          <div className="p-8 sm:p-12 bg-racing-black border-l-4 border-racing-red border-y border-r border-racing-border flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                EXPLORE TECHNICAL ALLIANCES WITH AKR
              </h3>
              <p className="text-xs text-racing-silver font-sans max-w-xl">
                Ajith Kumar Racing partners with world-class engineering brands, luxury manufacturers, and high-performance technology innovators.
              </p>
            </div>

            <Link
              to="/contact?category=Sponsorship"
              className="px-8 py-4 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest transition-colors shrink-0"
            >
              CONTACT PARTNERSHIP DESK
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
