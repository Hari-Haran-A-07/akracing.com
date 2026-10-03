import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { CarViewer360 } from '../components/3d/CarViewer360';
import { ArrowLeft, ArrowRight, ShieldCheck, Cpu, Flame, Disc, Wind, Activity } from 'lucide-react';

export const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCar = async () => {
      try {
        const res = await api.getCarById(id || 'akr-gt3-01');
        if (res.success) {
          setCar(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading || !car) {
    return (
      <div className="min-h-screen bg-racing-black flex items-center justify-center text-white font-mono">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-racing-red animate-ping" />
          <span>INITIALIZING VEHICLE DOSSIER...</span>
        </div>
      </div>
    );
  }

  const specCategories = [
    { label: "POWERTRAIN & ENGINE", value: car.specs?.engine, icon: Flame },
    { label: "HORSEPOWER / RPM", value: car.specs?.power, icon: Activity },
    { label: "MAXIMUM TORQUE", value: car.specs?.torque, icon: Activity },
    { label: "TOP SPEED", value: car.specs?.topSpeed, icon: Wind },
    { label: "ACCELERATION (0-100 KM/H)", value: car.specs?.acceleration, icon: Activity },
    { label: "HOMOLOGATED MIN WEIGHT", value: car.specs?.weight, icon: ShieldCheck },
    { label: "TRANSMISSION & PADDLES", value: car.specs?.transmission, icon: Cpu },
    { label: "BRAKING SYSTEM", value: car.specs?.brakes, icon: Disc },
    { label: "AERODYNAMIC DOWNFORCE", value: car.specs?.downforce, icon: Wind },
    { label: "ENGINE MANAGEMENT & ABS", value: car.specs?.electronics, icon: Cpu },
  ];

  return (
    <div className="min-h-screen bg-racing-black text-white pt-24 select-none">
      {/* Back Link & Title */}
      <section className="py-12 px-6 sm:px-12 border-b border-racing-border">
        <div className="max-w-7xl mx-auto space-y-6">
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 text-xs font-mono text-racing-silver hover:text-white uppercase tracking-widest transition-colors"
          >
            <ArrowLeft size={14} />
            <span>RETURN TO RACING STABLE</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-racing-red font-bold uppercase tracking-widest">
                HOMOLOGATED SPECIFICATION DOSSIER &bull; {car.class}
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none mt-2">
                {car.name}
              </h1>
            </div>
            <div className="font-mono text-xs text-racing-silver">
              MODEL CODE: <strong className="text-white">{car.modelCode}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 360 Viewer */}
      <section className="py-12 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border">
        <div className="max-w-7xl mx-auto">
          <CarViewer360 car={car} />
        </div>
      </section>

      {/* Full Technical Specifications Grid */}
      <section className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-red font-bold">
              VERIFIED ENGINEERING METRICS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              TECHNICAL <span className="text-racing-red">BLUEPRINT</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specCategories.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-racing-graphite border border-racing-border flex items-start gap-4 hover:border-racing-red/60 transition-colors"
                >
                  <div className="p-3 bg-racing-carbon border border-white/10 text-racing-red shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-racing-silver uppercase tracking-wider">{spec.label}</div>
                    <div className="font-display text-lg sm:text-xl font-bold uppercase text-white leading-snug">
                      {spec.value || "STANDARD GT SPEC"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photography & Cockpit Gallery */}
      <section className="py-24 px-6 sm:px-12 bg-racing-graphite">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-red font-bold">
              VISUAL ASSETS & DETAILS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              VEHICLE <span className="text-racing-red">GALLERY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(car.images || {}).map(([key, url], idx) => (
              <div
                key={idx}
                className="h-72 bg-racing-black border border-racing-border overflow-hidden group shadow-xl"
              >
                <img
                  src={url}
                  alt={`${car.name} ${key}`}
                  className="w-full h-full object-cover filter brightness-60 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
