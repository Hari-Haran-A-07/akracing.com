import React, { useEffect } from 'react';
import { AeroWindTunnel } from '../components/3d/AeroWindTunnel';
import { TelemetryCanvas } from '../components/3d/TelemetryCanvas';
import { Wind, Cpu, Activity, Disc, Zap, ShieldCheck, Gauge, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TechnologyPage = () => {
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
              THE ENGINEERING FRONTIER
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            ENGINEERING & <span className="text-racing-red">TECHNOLOGY</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            AERODYNAMICS &bull; HIGH-FREQUENCY TELEMETRY &bull; HARDWARE-IN-THE-LOOP SIMULATION &bull; POWERTRAIN
          </p>
        </div>
      </section>

      {/* Aerodynamics Wind Tunnel Interactive Simulation */}
      <section id="aero" className="py-24 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono text-racing-red font-bold uppercase tracking-widest">
              CFD & AERODYNAMICS DIVISION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white">
              VIRTUAL WIND TUNNEL SIMULATION
            </h2>
          </div>

          <AeroWindTunnel />
        </div>
      </section>

      {/* Telemetry Lab */}
      <section id="telemetry" className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono text-racing-red font-bold uppercase tracking-widest">
              MOTEC 1000HZ ACQUISITION LAB
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white">
              REAL-TIME SENSOR TELEMETRY DECODING
            </h2>
          </div>

          <TelemetryCanvas />
        </div>
      </section>

      {/* Hardware-in-the-Loop Simulation */}
      <section id="simulation" className="py-24 px-6 sm:px-12 bg-racing-graphite">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-racing-red font-bold uppercase tracking-widest">
                DRIVER-IN-THE-LOOP (DIL) SIMULATOR
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
                6-DOF MOTION <span className="text-racing-red">SIMULATION</span>
              </h2>
            </div>

            <p className="text-sm font-sans text-racing-silver leading-relaxed">
              Before the AKR GT3-01 turns a wheel at Spa or Monza, lead driver Ajith Kumar and the engineering staff log hundreds of simulation laps.
            </p>
            <p className="text-sm font-sans text-racing-silver leading-relaxed">
              Using sub-millimeter LiDAR scans of global Grand Prix tracks, our simulator feeds real tire deflection forces, steering torque curves, and aero-load shifts directly to the driver cockpit.
            </p>

            <Link
              to="/experiences"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest transition-colors"
            >
              <span>EXPERIENCE THE SIMULATOR</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop"
              alt="AKR Driver Helmet & Rig"
              className="w-full h-[400px] object-cover border border-racing-border shadow-2xl filter brightness-75"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
