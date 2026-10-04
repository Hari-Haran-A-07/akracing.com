import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, Flame, Gauge, ShieldCheck, Wind, Cpu, Crosshair, ChevronRight, Zap } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const CarBlueprintSection = () => {
  const { playClick, playBeep } = useAudio();
  const [activeHotspot, setActiveHotspot] = useState(0);

  const hotspots = [
    {
      id: 0,
      title: "4.0L NATURALLY ASPIRATED FLAT-6",
      category: "POWERTRAIN & COMBUSTION",
      x: "24%",
      y: "55%",
      icon: Flame,
      summary: "High-revving motorsport boxer unit generating 510 BHP at 8,400 RPM without turbocharger latency.",
      specs: [
        { label: "DISPLACEMENT", value: "3,996 CC" },
        { label: "PEAK OUTPUT", value: "510 BHP @ 8,400 RPM" },
        { label: "MAX TORQUE", value: "470 NM @ 6,150 RPM" },
        { label: "REDLINE", value: "9,000 RPM" },
        { label: "LUBRICATION", value: "7-STAGE DRY SUMP WITH OIL CENTRIFUGE" }
      ],
      diagram: "REAR-ENGINE ARCHITECTURE"
    },
    {
      id: 1,
      title: "6-SPEED SEQUENTIAL DOG-RING TRANSMISSION",
      category: "DRIVELINE & DIFFERENTIAL",
      x: "38%",
      y: "62%",
      icon: Cpu,
      summary: "Pneumatic paddle-actuated sequential transmission delivering shift times under 30 milliseconds.",
      specs: [
        { label: "SHIFT DURATION", value: "< 28 MILLISECONDS" },
        { label: "CLUTCH", value: "3-PLATE SINTERED METALLIC RACING CLUTCH" },
        { label: "DIFFERENTIAL", value: "MECHANICAL LIMITED SLIP (40% ACCEL / 60% DECEL)" },
        { label: "ACTUATION", value: "PNEUMATIC PADDLE SHIFT SYSTEM" }
      ],
      diagram: "TRANSAXLE GEARBOX"
    },
    {
      id: 2,
      title: "CARBON-FIBER SWAN-NECK REAR WING",
      category: "AERODYNAMICS & GROUND EFFECT",
      x: "15%",
      y: "32%",
      icon: Wind,
      summary: "11-stage adjustable swan-neck rear wing generating up to 850kg of downforce through clean upper airflow.",
      specs: [
        { label: "DOWNFORCE", value: "850 KG @ 250 KM/H" },
        { label: "ADJUSTABILITY", value: "11-POSITION ANGLE OF ATTACK" },
        { label: "CONSTRUCTION", value: "AUTOCLAVED PRE-PREG CARBON COMPOSITE" },
        { label: "END PLATES", value: "INTEGRATED VORTEX GENERATORS" }
      ],
      diagram: "CFD HIGH-DOWNFORCE PROFILE"
    },
    {
      id: 3,
      title: "MONOBLOC 6-PISTON BRAKING SYSTEM",
      category: "CHASSIS & DECELERATION",
      x: "72%",
      y: "68%",
      icon: Disc,
      summary: "Brembo racing monobloc calipers clamping 380mm slotted discs with dedicated carbon air routing.",
      specs: [
        { label: "FRONT CALIPERS", value: "6-PISTON ALUMINUM MONOBLOC" },
        { label: "DISC DIAMETER", value: "380MM INTERNALLY VENTED SLOTTED" },
        { label: "COOLING", value: "DUAL HIGH-PRESSURE NACA INTAKE DUCTS" },
        { label: "MAX DECELERATION", value: "2.8 G PEAK DECELERATION" }
      ],
      diagram: "HYDRAULIC TWIN-CIRCUIT"
    },
    {
      id: 4,
      title: "DOUBLE-WISHBONE FRONT SUSPENSION",
      category: "KINEMATICS & DYNAMICS",
      x: "78%",
      y: "52%",
      icon: Gauge,
      summary: "Forged aluminum double-wishbone geometry eliminating camber deflection during extreme lateral cornering.",
      specs: [
        { label: "GEOMETRY", value: "DOUBLE-WISHBONE WITH UNIBALL BEARINGS" },
        { label: "DAMPERS", value: "4-WAY ADJUSTABLE RACING DAMPERS" },
        { label: "ANTI-ROLL BAR", value: "DUAL-BLADE ADJUSTABLE FROM COCKPIT" },
        { label: "LATERAL GRIP", value: "UP TO 3.8 G IN FAST CORNERS" }
      ],
      diagram: "UNIBALL RIGID LINKAGE"
    },
    {
      id: 5,
      title: "FIA HOMOLOGATED CARBON SAFETY CELL",
      category: "SAFETY & STRUCTURE",
      x: "52%",
      y: "40%",
      icon: ShieldCheck,
      summary: "Carbon-fiber composite safety cell with welded high-strength steel roll cage conforming to FIA Article 277.",
      specs: [
        { label: "ROLL CAGE", value: "WELDED 25CRMO4 STEEL SPACE-FRAME" },
        { label: "SEAT SHELL", value: "CARBON-KEVLAR WRAPAROUND HEAD SUPPORT" },
        { label: "HARNESS", value: "SCHROTH 6-POINT RACING HARNESS" },
        { label: "FIRE SYSTEM", value: "NOVEC 1230 ELECTRONIC MULTI-NOZZLE" }
      ],
      diagram: "HOMOLOGATED REINFORCEMENT"
    }
  ];

  const current = hotspots[activeHotspot];

  return (
    <section className="py-24 px-6 sm:px-12 bg-racing-black border-b border-racing-border relative select-none overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-racing-silver">
                TECHNICAL DISSECTION &bull; CHASSIS BLUEPRINT
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              ENGINEERING <span className="text-racing-red">BLUEPRINT</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-racing-silver uppercase tracking-widest">
              AKR 911 GT3 CUP &bull; CLICK ANY TELEMETRY NODE TO INSPECT SUBSYSTEM
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-racing-silver">
            <span className="w-2 h-2 rounded-full bg-racing-red animate-ping" />
            <span className="uppercase">INTERACTIVE CAD EXPLORER</span>
          </div>
        </div>

        {/* Blueprint Visual & Hotspot Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Blueprint Graphic Box */}
          <div className="lg:col-span-7 bg-racing-graphite/60 border border-racing-border rounded-xl p-6 sm:p-8 relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center overflow-hidden shadow-2xl">
            {/* Blueprint Grid & Technical Overlay Lines */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="absolute top-4 left-4 text-[9px] font-mono text-white/30 uppercase tracking-widest">
              FIG 4.2 &bull; AERODYNAMIC PROFILE &bull; 992 GT3 SPEC
            </div>
            <div className="absolute bottom-4 right-4 text-[9px] font-mono text-racing-red/60 uppercase tracking-widest">
              HOMOLOGATION CODE: GT3-2026-AKR
            </div>

            {/* High-Resolution Porsche Visual */}
            <div className="relative w-full max-w-lg aspect-[16/9] flex items-center justify-center">
              <img
                src="/images/akr-porsche-gt3-cup.jpg"
                alt="AKR Porsche 911 GT3 Cup Blueprint"
                className="w-full h-full object-contain filter contrast-125 brightness-90 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              />

              {/* Hotspot Interactive Markers */}
              {hotspots.map((h, idx) => {
                const isActive = activeHotspot === idx;
                return (
                  <button
                    key={h.id}
                    onClick={() => {
                      setActiveHotspot(idx);
                      playBeep();
                    }}
                    style={{ left: h.x, top: h.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 group transition-transform ${
                      isActive ? 'scale-125 z-20' : 'scale-100 z-10 hover:scale-110'
                    }`}
                  >
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          isActive ? 'bg-racing-red' : 'bg-white/40'
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-3.5 w-3.5 items-center justify-center text-[8px] font-mono font-bold text-white transition-colors ${
                          isActive ? 'bg-racing-red shadow-[0_0_12px_#D90429]' : 'bg-racing-black border border-white/60'
                        }`}
                      >
                        {idx + 1}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Subsystem Telemetry Card */}
          <div className="lg:col-span-5 bg-racing-black border border-racing-border rounded-xl p-6 sm:p-8 relative space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-racing-red tracking-widest uppercase">
                  NODE 0{current.id + 1} &bull; {current.category}
                </span>
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                  {current.title}
                </h3>
              </div>
              <div className="p-3 bg-racing-red/10 border border-racing-red/30 rounded-lg text-racing-red">
                <current.icon size={22} />
              </div>
            </div>

            <p className="text-xs text-racing-silver font-sans leading-relaxed">
              {current.summary}
            </p>

            {/* Detailed Spec Matrix */}
            <div className="space-y-2.5 pt-2">
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                HOMOLOGATION & CAD SPECIFICATIONS
              </div>
              <div className="space-y-2">
                {current.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 bg-racing-graphite/80 border border-white/5 rounded flex items-center justify-between text-xs font-mono"
                  >
                    <span className="text-racing-silver uppercase text-[11px]">{spec.label}</span>
                    <span className="text-white font-bold text-[11px]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Hotspot Selectors */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
              {hotspots.map((h, idx) => (
                <button
                  key={h.id}
                  onClick={() => {
                    setActiveHotspot(idx);
                    playClick();
                  }}
                  className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                    activeHotspot === idx
                      ? 'bg-racing-red text-white shadow-[0_0_10px_rgba(217,4,41,0.5)]'
                      : 'bg-white/5 hover:bg-white/10 text-racing-silver border border-white/10'
                  }`}
                >
                  0{idx + 1}. {h.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
