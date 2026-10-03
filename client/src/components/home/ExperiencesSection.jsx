import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Check, ArrowRight, Sparkles } from 'lucide-react';

export const ExperiencesSection = ({ experiences = [] }) => {
  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border relative select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                BESPOKE MOTORSPORT HOSPITALITY
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              PADDOCK & VIP <span className="text-racing-red">EXPERIENCES</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest">
              STEP INSIDE THE INNER CIRCLE OF AJITH KUMAR RACING
            </p>
          </div>

          <Link
            to="/experiences"
            className="px-6 py-3.5 border border-white/20 hover:border-racing-red text-white hover:text-racing-red text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors self-start md:self-auto"
          >
            <span>VIEW ALL EXPERIENCES</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Experiences Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-8 bg-racing-black border border-racing-border hover:border-racing-red transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-racing-red font-bold px-2.5 py-1 bg-racing-red/10 border border-racing-red/30 uppercase tracking-widest">
                    {exp.badge}
                  </span>
                  <span className="text-xs font-mono text-racing-silver">{exp.duration}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-black uppercase text-white group-hover:text-racing-red transition-colors leading-tight">
                    {exp.title}
                  </h3>
                  <div className="text-xs font-mono text-racing-silver">{exp.location}</div>
                  <p className="text-xs text-racing-silver/90 font-sans leading-relaxed pt-2">
                    {exp.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 border-t border-white/10 pt-4 font-sans text-xs text-white/80">
                  {exp.includes?.map((inc, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <Check size={14} className="text-racing-red shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Booking Button */}
              <div className="pt-8 mt-6 border-t border-white/10 flex flex-col gap-4">
                <div className="flex items-baseline justify-between font-mono">
                  <span className="text-xs text-racing-silver uppercase">RESERVATION:</span>
                  <span className="font-display text-xl font-bold text-white">{exp.price}</span>
                </div>

                <Link
                  to="/contact?category=Hospitality"
                  className="w-full py-3.5 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <span>REQUEST VIP ALLOCATION</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
