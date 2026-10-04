import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { CarViewer360 } from '../components/3d/CarViewer360';
import { ArrowRight, Gauge, Cpu, Flame, Disc, ShieldCheck, Crosshair, ChevronRight } from 'lucide-react';

export const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCars = async () => {
      try {
        const res = await api.getCars();
        if (res.success) {
          setCars(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-racing-black text-white pt-24 select-none">
      {/* Hero Header */}
      <section className="py-20 px-6 sm:px-12 border-b border-racing-border relative overflow-hidden">
        <div className="absolute inset-0 bg-carbon-pattern opacity-30" />
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-racing-red" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
              THE HOMOLOGATED STABLE
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            RACING <span className="text-racing-red">MACHINES</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest max-w-2xl">
            FIA GT3 & GT4 HOMOLOGATED VEHICLES ENGINEERED FOR SPRINT AGILITY AND 24-HOUR ENDURANCE RELIABILITY
          </p>
        </div>
      </section>

      {/* 360 Interactive Viewer for Flagship GT3 */}
      {cars.length > 0 && (
        <section id="360" className="py-16 px-6 sm:px-12 bg-racing-graphite border-b border-racing-border">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-racing-red font-bold uppercase tracking-widest">
                  FLAGSHIP MACHINE
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white mt-1">
                  {cars[0].name || "AKR PORSCHE 911 GT3 CUP (#9)"}
                </h2>
              </div>
              <Link
                to={`/cars/${cars[0].id}`}
                className="px-6 py-3 bg-racing-red hover:bg-racing-crimson text-white text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
              >
                <span>ENGINEERING DOSSIER</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <CarViewer360 car={cars[0]} />
          </div>
        </section>
      )}

      {/* Cars Grid */}
      <section className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-racing-graphite border border-racing-border overflow-hidden flex flex-col justify-between group hover:border-racing-red transition-all duration-300 shadow-2xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={car.images?.hero || car.images?.front}
                    alt={car.name}
                    className="w-full h-full object-cover filter brightness-60 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 bg-racing-red text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-widest">
                    {car.class}
                  </div>
                </div>

                <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-racing-silver uppercase tracking-widest">{car.modelCode} &bull; {car.season} SEASON</span>
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white group-hover:text-racing-red transition-colors leading-tight">
                      {car.name}
                    </h3>
                    <p className="text-xs text-racing-silver font-sans leading-relaxed pt-1">
                      {car.description}
                    </p>
                  </div>

                  {/* Specs Quick Matrix */}
                  <div className="grid grid-cols-2 gap-3 p-4 bg-racing-black border border-white/5 font-mono text-xs">
                    <div>
                      <span className="text-[9px] text-racing-silver uppercase">POWER OUTPUT</span>
                      <div className="text-white font-bold">{car.specs?.power}</div>
                    </div>
                    <div>
                      <span className="text-[9px] text-racing-silver uppercase">TOP SPEED</span>
                      <div className="text-racing-red font-bold">{car.specs?.topSpeed}</div>
                    </div>
                    <div>
                      <span className="text-[9px] text-racing-silver uppercase">WEIGHT (DRY)</span>
                      <div className="text-white font-bold">{car.specs?.weight}</div>
                    </div>
                    <div>
                      <span className="text-[9px] text-racing-silver uppercase">TRANSMISSION</span>
                      <div className="text-white font-bold">{car.specs?.transmission}</div>
                    </div>
                  </div>

                  <Link
                    to={`/cars/${car.id}`}
                    className="w-full py-3.5 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>INSPECT TECHNICAL BLUEPRINT</span>
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
