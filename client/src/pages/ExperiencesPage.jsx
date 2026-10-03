import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ShieldCheck, Check, ArrowRight, Sparkles, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExperiencesPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchExp = async () => {
      try {
        const res = await api.getExperiences();
        if (res.success) {
          setExperiences(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExp();
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
              PADDOCK & VIP HOSPITALITY
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            AKR <span className="text-racing-red">EXPERIENCES</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            BESPOKE PADDOCK CLUB ALLOCATIONS, TRACK-DAY MASTERCLASSES & DRIVER SIMULATOR SESSIONS
          </p>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-24 px-6 sm:px-12 bg-racing-graphite">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-8 bg-racing-black border border-racing-border hover:border-racing-red transition-all flex flex-col justify-between group shadow-2xl"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-racing-red font-bold px-3 py-1 bg-racing-red/10 border border-racing-red/30 uppercase tracking-widest">
                      {exp.badge}
                    </span>
                    <span className="text-xs font-mono text-racing-silver flex items-center gap-1">
                      <Clock size={12} /> {exp.duration}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-black uppercase text-white group-hover:text-racing-red transition-colors leading-tight">
                      {exp.title}
                    </h3>
                    <div className="text-xs font-mono text-racing-silver flex items-center gap-1">
                      <MapPin size={12} className="text-racing-red" /> {exp.location}
                    </div>
                    <p className="text-xs sm:text-sm text-racing-silver font-sans leading-relaxed pt-2">
                      {exp.description}
                    </p>
                  </div>

                  {/* Included features */}
                  <div className="space-y-2.5 border-t border-white/10 pt-4 font-sans text-xs text-white/80">
                    {exp.includes?.map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check size={14} className="text-racing-red shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-white/10 flex flex-col gap-4">
                  <div className="flex items-baseline justify-between font-mono">
                    <span className="text-xs text-racing-silver uppercase">RESERVATION:</span>
                    <span className="font-display text-xl font-bold text-white">{exp.price}</span>
                  </div>

                  <Link
                    to="/contact?category=Hospitality"
                    className="w-full py-4 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-lg"
                  >
                    <span>REQUEST VIP PASS ALLOCATION</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
