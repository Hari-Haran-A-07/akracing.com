import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Trophy, ArrowRight, Zap, Target, Globe } from 'lucide-react';

export const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
              THE RACING ORGANIZATION
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            ABOUT <span className="text-racing-red">AKR</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            SPEED × ENGINEERING × RACING × LUXURY × HUMAN PERFORMANCE
          </p>
        </div>
      </section>

      {/* Core Identity & Pillars */}
      <section className="py-24 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-racing-red font-bold uppercase tracking-widest">
                WHO WE ARE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
                AN INTERNATIONAL <span className="text-racing-red">MOTORSPORT POWERHOUSE</span>
              </h2>
            </div>

            <p className="text-sm font-sans text-racing-silver leading-relaxed">
              Ajith Kumar Racing (AKR) is a premier international racing organization established by celebrated racing driver and team principal Ajith Kumar.
            </p>
            <p className="text-sm font-sans text-racing-silver leading-relaxed">
              With competitive roots spanning British Formula 3, FIA Formula 2, and modern 24-hour GT3 endurance championships, AKR bridges the apex of Indian motorsport ambition with world-class engineering discipline in Europe and the Middle East.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/driver"
                className="px-8 py-4 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest transition-colors"
              >
                MEET AJITH KUMAR
              </Link>
              <Link
                to="/cars"
                className="px-8 py-4 border border-white/20 hover:border-white text-white font-display font-black text-xs uppercase tracking-widest transition-colors"
              >
                EXPLORE RACING FLEET
              </Link>
            </div>
          </div>

          <div className="border border-racing-border overflow-hidden bg-black shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop"
              alt="AKR Motorsport Grid"
              className="w-full h-[450px] object-cover filter brightness-70"
            />
          </div>
        </div>
      </section>

      {/* Values & Philosophy Grid */}
      <section className="py-24 px-6 sm:px-12 bg-racing-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-red font-bold">
              THE DRIVING CREED
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              OUR RACING <span className="text-racing-red">PHILOSOPHY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-racing-graphite border border-racing-border space-y-4">
              <div className="w-12 h-12 bg-racing-carbon border border-racing-red/30 flex items-center justify-center text-racing-red">
                <Target size={22} />
              </div>
              <h3 className="font-display text-2xl font-black uppercase text-white">
                RACING AS TRUTH
              </h3>
              <p className="text-xs sm:text-sm text-racing-silver font-sans leading-relaxed">
                Telemetry never compromises. The stopwatch never negotiates. We build our technical strategies purely on verified data, telemetry rigor, and precision execution.
              </p>
            </div>

            <div className="p-8 bg-racing-graphite border border-racing-border space-y-4">
              <div className="w-12 h-12 bg-racing-carbon border border-racing-red/30 flex items-center justify-center text-racing-red">
                <Zap size={22} />
              </div>
              <h3 className="font-display text-2xl font-black uppercase text-white">
                UNRELENTING DISCIPLINE
              </h3>
              <p className="text-xs sm:text-sm text-racing-silver font-sans leading-relaxed">
                From the driver's biometric endurance under 50°C cockpit conditions to 3.2-second synchronized pit stops, perfection is engineered through daily discipline.
              </p>
            </div>

            <div className="p-8 bg-racing-graphite border border-racing-border space-y-4">
              <div className="w-12 h-12 bg-racing-carbon border border-racing-red/30 flex items-center justify-center text-racing-red">
                <Globe size={22} />
              </div>
              <h3 className="font-display text-2xl font-black uppercase text-white">
                GLOBAL AMBITION
              </h3>
              <p className="text-xs sm:text-sm text-racing-silver font-sans leading-relaxed">
                Carrying the Indian tricolor with pride across European and Middle Eastern motorsport circuits, establishing an enduring legacy in international GT racing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
