import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Flag, Shield, ArrowRight, Gauge, Activity, Radio, MapPin } from 'lucide-react';

export const RacingPage = () => {
  return (
    <div className="min-h-screen bg-racing-black text-white pt-24 select-none">
      {/* Hero */}
      <section className="relative py-20 px-6 sm:px-12 border-b border-racing-border overflow-hidden">
        <div className="absolute inset-0 bg-carbon-pattern opacity-30" />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-racing-red" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
              THE RACING MISSION
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            RACING <span className="text-racing-red">PROGRAMS</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            COMPETING AT THE HIGHEST TIER OF INTERNATIONAL GT3 ENDURANCE RACING ACROSS THE MIDDLE EAST & EUROPE
          </p>
        </div>
      </section>

      {/* Philosophy & Pillars */}
      <section className="py-24 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-racing-red uppercase font-bold">
                THE DISCIPLINE OF ENDURANCE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                24 HOURS OF <span className="text-racing-red">UNFORGIVING SPEED</span>
              </h2>
            </div>

            <p className="text-sm font-sans text-racing-silver leading-relaxed">
              Endurance racing is not merely about single-lap outright pace; it is an uncompromising trial of mechanical reliability, tire thermal preservation, pit-lane choreography, and supreme psychological stamina.
            </p>

            <p className="text-sm font-sans text-racing-silver leading-relaxed">
              Under the leadership of Ajith Kumar, AKR deploys aerospace-grade data modeling, real-time wireless telemetry, and high-frequency simulator preparation to execute seamless 24-hour campaigns.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/championships"
                className="px-8 py-4 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
              >
                <span>CHAMPIONSHIP STANDINGS</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/live"
                className="px-8 py-4 border border-white/20 hover:border-white text-white font-display font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
              >
                <Radio size={14} className="text-racing-red animate-pulse" />
                <span>LIVE PIT WALL</span>
              </Link>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1200&auto=format&fit=crop"
              alt="AKR GT3 at Speed"
              className="w-full h-[460px] object-cover border border-racing-border shadow-2xl filter brightness-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-white/10 font-mono text-xs">
              <span className="text-racing-red font-bold">24H SERIES DUBAI & ABU DHABI VICTORY</span>
              <p className="text-white/70 text-[11px] mt-0.5">Piloting the #9 AKR GT3-01 to historic class honours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Program Architecture */}
      <section className="py-24 px-6 sm:px-12 bg-racing-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-red font-bold">
              TWO COMPETITIVE TIERS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              RACING <span className="text-racing-red">CATEGORIES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 bg-racing-graphite border border-racing-border hover:border-racing-red transition-all space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-racing-red font-bold px-3 py-1 bg-racing-red/10 border border-racing-red/30 uppercase tracking-widest">
                  FLAGSHIP PROGRAM
                </span>
                <span className="font-mono text-xs text-racing-silver">FIA GT3 HOMOLOGATED</span>
              </div>
              <h3 className="font-display text-3xl font-black uppercase text-white">
                INTERNATIONAL GT3 ENDURANCE
              </h3>
              <p className="text-xs sm:text-sm text-racing-silver font-sans leading-relaxed">
                Our front-line championship assault fielding the 510 BHP AKR GT3-01. Competing in 12-hour and 24-hour multi-class endurance races at Dubai, Mugello, Spa, Monza, and Barcelona against global factory works teams.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span>LEAD DRIVER: <strong className="text-white">AJITH KUMAR</strong></span>
                <Link to="/cars/akr-gt3-01" className="text-racing-red font-bold hover:underline flex items-center gap-1">
                  CAR SPECS <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            <div className="p-8 bg-racing-graphite border border-racing-border hover:border-racing-red transition-all space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-white font-bold px-3 py-1 bg-white/10 border border-white/20 uppercase tracking-widest">
                  DEVELOPMENT PROGRAM
                </span>
                <span className="font-mono text-xs text-racing-silver">GT4 CLUBSPORT</span>
              </div>
              <h3 className="font-display text-3xl font-black uppercase text-white">
                GT4 CHALLENGE & SPRINT
              </h3>
              <p className="text-xs sm:text-sm text-racing-silver font-sans leading-relaxed">
                Dedicated driver development and customer sprint racing program providing high-fidelity feedback and engineering validation on the AKR GT4 platform.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span>STABLE: <strong className="text-white">AKR GT4 CHALLENGE</strong></span>
                <Link to="/cars/akr-gt4-cup" className="text-white font-bold hover:underline flex items-center gap-1">
                  CAR SPECS <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
