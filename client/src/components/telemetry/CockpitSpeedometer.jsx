import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, Zap, Disc, Activity, Flame, Shield, Play, RotateCcw, Volume2, Sparkles, Navigation } from 'lucide-react';
import { useScrollVelocity } from '../../hooks/useScrollVelocity';
import { useAudio } from '../../context/AudioContext';

export const CockpitSpeedometer = ({ compact = false, className = '' }) => {
  const scrollPhysics = useScrollVelocity();
  const { playShiftSound, soundEnabled } = useAudio();

  const [mode, setMode] = useState('SCROLL'); // 'SCROLL', 'MANUAL', 'SIMULATOR'
  const [manualThrottle, setManualThrottle] = useState(0);
  const [manualSpeed, setManualSpeed] = useState(0);
  const [manualRpm, setManualRpm] = useState(900);
  const [manualGear, setManualGear] = useState('N');
  const [isPressingThrottle, setIsPressingThrottle] = useState(false);

  const prevGearRef = useRef(scrollPhysics.gear);

  // Handle Manual Throttle Loop
  useEffect(() => {
    let animId;
    if (mode === 'MANUAL' || mode === 'SIMULATOR') {
      const updateManualPhysics = () => {
        if (isPressingThrottle) {
          setManualThrottle((t) => Math.min(100, t + 4));
          setManualRpm((r) => Math.min(9600, r + 180));
          setManualSpeed((s) => Math.min(328, s + 1.8));
        } else {
          setManualThrottle((t) => Math.max(0, t - 6));
          setManualRpm((r) => Math.max(900, r - 160));
          setManualSpeed((s) => Math.max(0, s - 1.2));
        }

        // Automatic Gearshift calculation for manual
        setManualSpeed((s) => {
          if (s < 3) setManualGear('N');
          else if (s < 50) setManualGear('1');
          else if (s < 95) setManualGear('2');
          else if (s < 155) setManualGear('3');
          else if (s < 215) setManualGear('4');
          else if (s < 275) setManualGear('5');
          else setManualGear('6');
          return s;
        });

        animId = requestAnimationFrame(updateManualPhysics);
      };
      animId = requestAnimationFrame(updateManualPhysics);
    }

    return () => cancelAnimationFrame(animId);
  }, [mode, isPressingThrottle]);

  // Active Telemetry values depending on mode
  const currentSpeed = mode === 'SCROLL' ? scrollPhysics.speed : Math.round(manualSpeed);
  const currentRpm = mode === 'SCROLL' ? scrollPhysics.rpm : Math.round(manualRpm);
  const currentGear = mode === 'SCROLL' ? scrollPhysics.gear : manualGear;
  const currentThrottle = mode === 'SCROLL' ? scrollPhysics.throttle : manualThrottle;
  const currentBrake = mode === 'SCROLL' ? scrollPhysics.brake : (!isPressingThrottle && manualSpeed > 30 ? 25 : 0);
  const isRedline = currentRpm >= 8900;
  const gForce = mode === 'SCROLL' ? scrollPhysics.gForce : (0.2 + (currentSpeed / 300) * 3.2).toFixed(1);

  // Play shift sound on gear transition
  useEffect(() => {
    if (currentGear !== prevGearRef.current) {
      if (soundEnabled) playShiftSound();
      prevGearRef.current = currentGear;
    }
  }, [currentGear, soundEnabled, playShiftSound]);

  // Gauge Needle Angle Calculations
  // Speedometer: 0 km/h = -120 deg, 350 km/h = +120 deg (total 240 deg span)
  const speedAngle = -120 + (Math.min(350, currentSpeed) / 350) * 240;
  // RPM: 0 RPM = -120 deg, 10,000 RPM = +120 deg
  const rpmAngle = -120 + (Math.min(10000, currentRpm) / 10000) * 240;

  // 9 Shift Light LEDs status
  // 3 Green (< 6500), 3 Amber (6500-8800), 3 Red (> 8800)
  const getShiftLeds = () => {
    const leds = [];
    const thresholds = [3500, 4500, 5800, 6800, 7500, 8200, 8800, 9200, 9500];
    for (let i = 0; i < 9; i++) {
      const active = currentRpm >= thresholds[i];
      let color = 'bg-emerald-500';
      if (i >= 3 && i < 6) color = 'bg-amber-400';
      if (i >= 6) color = 'bg-racing-red';
      leds.push({ active, color, id: i });
    }
    return leds;
  };

  const shiftLeds = getShiftLeds();

  // Dynamic Tyre Temperatures based on speed
  const tyreFL = Math.round(78 + (currentSpeed / 350) * 24);
  const tyreFR = Math.round(82 + (currentSpeed / 350) * 26);
  const tyreRL = Math.round(85 + (currentSpeed / 350) * 28);
  const tyreRR = Math.round(88 + (currentSpeed / 350) * 30);
  const oilTemp = Math.round(92 + (currentRpm / 10000) * 18);
  const waterTemp = Math.round(86 + (currentRpm / 10000) * 12);

  return (
    <div className={`relative bg-racing-black/90 border border-racing-border rounded-xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] select-none ${className}`}>
      {/* Background Aerodynamic Speed Trails */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-grid-pattern" />
        {currentSpeed > 50 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-racing-red/10 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: Math.max(0.2, 1.5 - (currentSpeed / 350)), ease: 'linear' }}
          />
        )}
      </div>

      {/* Top Header & LED Shift Lights */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-racing-red animate-ping" />
          <div>
            <div className="text-[10px] font-mono tracking-widest text-racing-silver uppercase">MOTEC C187 DASH TELEMETRY</div>
            <div className="text-xs font-mono font-bold text-white uppercase">AKR 911 GT3 CUP &bull; CHASSIS #09</div>
          </div>
        </div>

        {/* F1 / GT3 Shift Light Bar */}
        <div className="flex items-center gap-1.5 p-2 bg-black/80 rounded-lg border border-white/10 shadow-inner">
          {shiftLeds.map((led) => (
            <div
              key={led.id}
              className={`w-3.5 sm:w-4 h-3 sm:h-3.5 rounded-sm transition-all duration-75 ${
                isRedline
                  ? 'bg-racing-red animate-pulse shadow-[0_0_12px_#D90429]'
                  : led.active
                  ? `${led.color} shadow-[0_0_8px_currentColor]`
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Input Mode Switcher */}
        <div className="flex items-center gap-1 bg-black/60 p-1 border border-white/10 rounded text-[10px] font-mono">
          <button
            onClick={() => setMode('SCROLL')}
            className={`px-2.5 py-1 uppercase tracking-wider font-bold transition-all rounded ${
              mode === 'SCROLL' ? 'bg-racing-red text-white' : 'text-racing-silver hover:text-white'
            }`}
          >
            SCROLL-LINK
          </button>
          <button
            onClick={() => setMode('MANUAL')}
            className={`px-2.5 py-1 uppercase tracking-wider font-bold transition-all rounded ${
              mode === 'MANUAL' ? 'bg-racing-red text-white' : 'text-racing-silver hover:text-white'
            }`}
          >
            MANUAL THROTTLE
          </button>
        </div>
      </div>

      {/* Center Instrument Dials Cluster */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
        {/* Left Dial: Speedometer (0-350 KM/H) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* SVG Speed Dial */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {/* Dial Track */}
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="10"
                strokeDasharray="360"
                strokeDashoffset="120"
                strokeLinecap="round"
              />
              {/* Active Speed Arc */}
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke={currentSpeed > 280 ? '#D90429' : currentSpeed > 180 ? '#FFB703' : '#FFFFFF'}
                strokeWidth="10"
                strokeDasharray="360"
                strokeDashoffset={360 - (currentSpeed / 350) * 240}
                strokeLinecap="round"
                className="transition-all duration-100"
              />
            </svg>

            {/* Needle */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-100 ease-out"
              style={{ transform: `rotate(${speedAngle}deg)` }}
            >
              <div className="w-1 h-24 bg-gradient-to-t from-transparent via-racing-red to-racing-red rounded-full shadow-[0_0_10px_#D90429] origin-bottom -translate-y-12" />
            </div>

            {/* Dial Center Hub & Digital Readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-mono uppercase text-racing-silver tracking-widest">VELOCITY</span>
              <motion.span
                key={currentSpeed}
                className="font-display text-4xl sm:text-5xl font-black text-white tracking-tighter"
              >
                {currentSpeed}
              </motion.span>
              <span className="text-xs font-mono font-bold text-racing-red tracking-wider">KM / H</span>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] font-mono text-racing-silver uppercase">GPS SPEEDOMETER &bull; RANGE 0–350</span>
          </div>
        </div>

        {/* Center: Sequential Gear Indicator & G-Force HUD */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-6">
          {/* Gearbox Box */}
          <div className="relative flex flex-col items-center">
            <div className="text-[10px] font-mono text-racing-silver tracking-widest uppercase mb-1">PNEUMATIC SEQUENTIAL</div>
            <motion.div
              key={currentGear}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className={`w-28 h-32 bg-black/90 border-2 rounded-xl flex items-center justify-center shadow-2xl relative overflow-hidden ${
                isRedline
                  ? 'border-racing-red shadow-[0_0_30px_rgba(217,4,41,0.6)] animate-pulse'
                  : 'border-white/20'
              }`}
            >
              <div className="absolute top-2 left-2 text-[8px] font-mono text-white/40">GEAR</div>
              <span className={`font-display text-7xl font-black ${currentGear === 'N' ? 'text-amber-400' : isRedline ? 'text-racing-red' : 'text-white'}`}>
                {currentGear}
              </span>
              <div className="absolute bottom-2 right-2 text-[8px] font-mono text-racing-red font-bold">DOG-RING</div>
            </motion.div>
          </div>

          {/* G-Force Ball / Vector Display */}
          <div className="w-full max-w-[200px] p-3 bg-black/60 border border-white/10 rounded-lg flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-[9px] font-mono text-racing-silver uppercase">LATERAL LOAD</div>
              <div className="font-display text-lg font-black text-white">{gForce} <span className="text-xs font-mono text-racing-red">G</span></div>
            </div>
            {/* Accelerometer visual grid */}
            <div className="relative w-12 h-12 border border-white/20 rounded-full flex items-center justify-center bg-black/40">
              <div className="absolute w-full h-[1px] bg-white/10" />
              <div className="absolute h-full w-[1px] bg-white/10" />
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-racing-red shadow-[0_0_8px_#D90429]"
                animate={{
                  x: (currentSpeed % 20) - 10,
                  y: currentBrake > 0 ? 8 : currentThrottle > 50 ? -8 : 0
                }}
                transition={{ type: 'spring', damping: 15 }}
              />
            </div>
          </div>
        </div>

        {/* Right Dial: Tachometer (0-10,000 RPM) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* SVG Tachometer Dial */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {/* Dial Track */}
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="10"
                strokeDasharray="360"
                strokeDashoffset="120"
                strokeLinecap="round"
              />
              {/* Active RPM Arc */}
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke={isRedline ? '#D90429' : currentRpm > 6500 ? '#FFB703' : '#10B981'}
                strokeWidth="10"
                strokeDasharray="360"
                strokeDashoffset={360 - (currentRpm / 10000) * 240}
                strokeLinecap="round"
                className="transition-all duration-100"
              />
            </svg>

            {/* Tachometer Needle */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-100 ease-out"
              style={{ transform: `rotate(${rpmAngle}deg)` }}
            >
              <div className="w-1 h-24 bg-gradient-to-t from-transparent via-racing-red to-racing-red rounded-full shadow-[0_0_10px_#D90429] origin-bottom -translate-y-12" />
            </div>

            {/* Dial Center Hub & Digital Readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-mono uppercase text-racing-silver tracking-widest">ENGINE SPEED</span>
              <motion.span
                key={currentRpm}
                className="font-display text-4xl sm:text-5xl font-black text-white tracking-tighter"
              >
                {currentRpm}
              </motion.span>
              <span className="text-xs font-mono font-bold text-racing-red tracking-wider">RPM</span>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] font-mono text-racing-silver uppercase">4.0L FLAT-6 &bull; 9,000 REDLINE</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Gauges & Controls */}
      <div className="relative z-10 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Throttle & Brake Pedals Readout */}
        <div className="space-y-3 bg-black/40 p-3 rounded-lg border border-white/5">
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-racing-silver uppercase">THROTTLE INPUT</span>
            <span className="text-emerald-400 font-bold">{currentThrottle}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-75" style={{ width: `${currentThrottle}%` }} />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono pt-1">
            <span className="text-racing-silver uppercase">BRAKE PRESSURE</span>
            <span className="text-racing-red font-bold">{currentBrake}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-racing-red transition-all duration-75" style={{ width: `${currentBrake}%` }} />
          </div>
        </div>

        {/* 4-Wheel Tyre Temperatures Grid */}
        <div className="p-3 bg-black/40 rounded-lg border border-white/5 grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
          <div className="p-1.5 bg-black/50 rounded border border-white/5">
            <span className="text-white/40 block text-[8px]">TYRE FL</span>
            <span className="text-white font-bold">{tyreFL}°C</span>
          </div>
          <div className="p-1.5 bg-black/50 rounded border border-white/5">
            <span className="text-white/40 block text-[8px]">TYRE FR</span>
            <span className="text-white font-bold">{tyreFR}°C</span>
          </div>
          <div className="p-1.5 bg-black/50 rounded border border-white/5">
            <span className="text-white/40 block text-[8px]">TYRE RL</span>
            <span className="text-white font-bold">{tyreRL}°C</span>
          </div>
          <div className="p-1.5 bg-black/50 rounded border border-white/5">
            <span className="text-white/40 block text-[8px]">TYRE RR</span>
            <span className="text-white font-bold">{tyreRR}°C</span>
          </div>
        </div>

        {/* Engine Fluids & Interactive Accelerator Button */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-[10px] font-mono text-racing-silver bg-black/40 p-2 rounded border border-white/5">
            <div>OIL: <strong className="text-white">{oilTemp}°C</strong></div>
            <div>WATER: <strong className="text-white">{waterTemp}°C</strong></div>
            <div>BATT: <strong className="text-white">13.8V</strong></div>
          </div>

          {/* Press and Hold Rev Pedal */}
          <button
            onMouseDown={() => { setMode('MANUAL'); setIsPressingThrottle(true); }}
            onMouseUp={() => setIsPressingThrottle(false)}
            onTouchStart={() => { setMode('MANUAL'); setIsPressingThrottle(true); }}
            onTouchEnd={() => setIsPressingThrottle(false)}
            className={`w-full py-3 px-4 font-mono text-xs font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all select-none ${
              isPressingThrottle
                ? 'bg-racing-red text-white shadow-[0_0_25px_#D90429] scale-[0.98]'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <Flame size={14} className={isPressingThrottle ? 'text-amber-300 animate-bounce' : 'text-racing-red'} />
            <span>{isPressingThrottle ? 'THROTTLE ENGAGED [FULL POWER]' : 'HOLD TO REV THROTTLE PEDAL'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
