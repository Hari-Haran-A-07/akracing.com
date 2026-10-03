import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, ZoomIn, ZoomOut, Zap, Info, ShieldAlert, Crosshair, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CarViewer360 = ({ car }) => {
  const [rotationAngle, setRotationAngle] = useState(0); // 0 to 360
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [viewMode, setViewMode] = useState('race'); // 'race', 'aero', 'carbon'

  const containerRef = useRef(null);

  // Auto rotation effect
  useEffect(() => {
    let animationFrame;
    if (autoRotate && !isDragging) {
      const step = () => {
        setRotationAngle((prev) => (prev + 0.4) % 360);
        animationFrame = requestAnimationFrame(step);
      };
      animationFrame = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - startX;
    setStartX(clientX);
    setRotationAngle((prev) => (prev - deltaX * 0.8 + 360) % 360);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Hotspots list
  const hotspots = [
    {
      id: 'aero',
      title: 'AERODYNAMICS & CARBON SPLITTER',
      category: 'AERODYNAMICS',
      x: 24,
      y: 68,
      angleRange: [300, 60],
      summary: '850 KG DOWNFORCE @ 250 KM/H',
      specs: 'CFD-optimized carbon fiber underbody tunnels, vortex generators, and dual front dive planes.',
      details: 'Generates immense front-axle bite and stability through high-speed turns while balancing air distribution to cooling radiators.'
    },
    {
      id: 'engine',
      title: 'POWERTRAIN & DRY SUMP LUBRICATION',
      category: 'ENGINE',
      x: 72,
      y: 45,
      angleRange: [120, 240],
      summary: '510 BHP @ 8,400 RPM / FLAT-6',
      specs: 'Naturally aspirated 4.0-liter racing engine with titanium connecting rods and individual throttle bodies.',
      details: 'Rigid valve train and multi-stage dry sump lubrication sustain continuous 8,500+ RPM under 3.5+ G lateral loads across 24 hours.'
    },
    {
      id: 'brakes',
      title: 'BREMBO MONOBLOC BRAKE SYSTEM',
      category: 'BRAKING SYSTEM',
      x: 36,
      y: 64,
      angleRange: [20, 160],
      summary: '380MM SLOTTED STEEL / 12-STAGE ABS',
      specs: '6-piston front / 4-piston rear aluminum monobloc calipers with cockpit-adjustable brake bias.',
      details: 'Direct carbon cooling ducts ensure instant heat dissipation during repeat threshold braking into Turn 1.'
    },
    {
      id: 'suspension',
      title: 'KW 4-WAY COMPETITION DAMPING',
      category: 'SUSPENSION',
      x: 52,
      y: 56,
      angleRange: [40, 320],
      summary: 'INDEPENDENT HIGH/LOW SPEED DAMPERS',
      specs: 'Double-wishbone suspension with spherical uniball bearings and adjustable blade anti-roll bars.',
      details: 'Micro-calibrated damping curve absorbs aggressive kerb impacts while maintaining an unyielding aerodynamic platform.'
    },
    {
      id: 'cockpit',
      title: 'CARBON-KEVLAR SAFETY CELL',
      category: 'COCKPIT',
      x: 50,
      y: 36,
      angleRange: [0, 360],
      summary: 'FIA 8862-2009 HOMOLOGATION',
      specs: 'Carbon shell seat, OLED telemetry steering wheel, fire suppression matrix, and integrated drink system.',
      details: 'Driver-centric ergonomics tailored specifically for Ajith Kumar’s endurance driving position.'
    },
    {
      id: 'telemetry',
      title: 'MOTEC 5G TELEMETRY GATEWAY',
      category: 'DATA SYSTEM',
      x: 64,
      y: 30,
      angleRange: [60, 300],
      summary: '1,000 HZ LOGGING / 120 SENSOR CHANNELS',
      specs: 'Encrypted wireless pit-to-car telemetry streaming tire carcass temperature, fuel flow, and suspension displacement.',
      details: 'Direct integration with the AKR Virtual Pit Wall for predictive tire degradation modeling.'
    }
  ];

  // Pick car angle based on rotation angle (4 primary angles)
  const getCarImage = () => {
    const images = car?.images || {
      hero: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1600&auto=format&fit=crop",
      front: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop",
      side: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop",
      cockpit: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1400&auto=format&fit=crop"
    };

    if (rotationAngle >= 315 || rotationAngle < 45) return images.front || images.hero;
    if (rotationAngle >= 45 && rotationAngle < 135) return images.side || images.hero;
    if (rotationAngle >= 135 && rotationAngle < 225) return images.hero;
    return images.cockpit || images.hero;
  };

  return (
    <div className="relative w-full bg-racing-black border border-racing-border overflow-hidden select-none">
      {/* Top Controls & Mode Switcher */}
      <div className="p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-racing-graphite/40">
        <div className="flex items-center gap-3">
          <Crosshair size={18} className="text-racing-red animate-pulse" />
          <div>
            <h3 className="font-display text-lg font-black uppercase tracking-tight text-white">
              INTERACTIVE 360° VEHICLE TELEMETRY VIEWER
            </h3>
            <p className="text-[10px] font-mono text-racing-silver uppercase tracking-widest">
              DRAG TO ROTATE &bull; CLICK HOTSPOTS TO INSPECT HOMOLOGATED ENGINEERING
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
              autoRotate ? 'border-racing-red bg-racing-red/10 text-racing-red' : 'border-white/20 text-racing-silver hover:text-white'
            }`}
          >
            <RotateCw size={13} className={autoRotate ? 'animate-spin' : ''} />
            <span>{autoRotate ? 'AUTO: ACTIVE' : 'AUTO: PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className="relative w-full h-[450px] sm:h-[560px] cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden bg-carbon-pattern"
      >
        {/* Visual Angle Reticle Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        
        {/* Ambient Underglow */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-racing-red/20 rounded-full blur-3xl pointer-events-none" />

        {/* Center Vehicle Image Display */}
        <motion.div
          key={getCarImage()}
          initial={{ opacity: 0.8, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-4xl w-full px-6 flex items-center justify-center"
        >
          <img
            src={getCarImage()}
            alt={car?.name || "AKR Racing Machine"}
            className="w-full max-h-[380px] object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] pointer-events-none"
          />

          {/* Dynamic Hotspots */}
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedHotspot(spot);
                }}
                className="relative flex items-center justify-center p-2"
                aria-label={spot.title}
              >
                {/* Pulsing ring */}
                <span className="absolute w-8 h-8 rounded-full bg-racing-red/40 animate-ping" />
                <span className="relative w-4 h-4 rounded-full bg-racing-red border-2 border-white flex items-center justify-center text-white shadow-[0_0_10px_#D90429] group-hover:scale-125 transition-transform" />
              </button>

              {/* Floating Tooltip preview */}
              <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-black/90 border border-racing-red text-left backdrop-blur-md shadow-xl pointer-events-none z-30">
                <span className="text-[9px] font-mono text-racing-red uppercase font-bold tracking-widest">{spot.category}</span>
                <p className="text-xs font-display font-bold uppercase text-white leading-tight mt-0.5">{spot.title}</p>
                <p className="text-[10px] font-mono text-white/70 mt-1">{spot.summary}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Drag Velocity & Angle Indicator */}
        <div className="absolute bottom-6 left-6 flex items-center gap-3 text-xs font-mono text-racing-silver bg-black/60 px-3 py-1.5 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 bg-racing-red rounded-full" />
          <span>BEARING: <strong className="text-white">{Math.round(rotationAngle)}°</strong></span>
        </div>

        {/* Instructions Indicator */}
        <div className="absolute bottom-6 right-6 text-[10px] font-mono tracking-widest text-racing-silver/60 uppercase">
          &larr; DRAG TO ROTATE 360° &rarr;
        </div>
      </div>

      {/* Selected Hotspot Detailed Modal */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="p-6 sm:p-8 bg-racing-graphite border-t border-racing-border relative text-white"
          >
            <button
              onClick={() => setSelectedHotspot(null)}
              className="absolute top-6 right-6 p-2 text-racing-silver hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="max-w-4xl">
              <span className="text-xs font-mono tracking-widest text-racing-red uppercase font-bold">
                TELEMETRY INSPECTION &bull; {selectedHotspot.category}
              </span>
              <h4 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1 mb-3">
                {selectedHotspot.title}
              </h4>
              <p className="text-sm font-sans text-racing-silver leading-relaxed mb-6">
                {selectedHotspot.details}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <div className="p-3 bg-racing-carbon border border-white/5">
                  <span className="text-[10px] font-mono text-racing-silver uppercase">BENCHMARK SPECIFICATION</span>
                  <div className="font-mono text-sm font-bold text-white mt-0.5">{selectedHotspot.summary}</div>
                </div>
                <div className="p-3 bg-racing-carbon border border-white/5">
                  <span className="text-[10px] font-mono text-racing-silver uppercase">HOMOLOGATED ENGINEERING</span>
                  <div className="font-mono text-sm text-racing-silver/90 mt-0.5">{selectedHotspot.specs}</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
