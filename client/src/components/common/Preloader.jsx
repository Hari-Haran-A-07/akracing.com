import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Shield, Zap, CheckCircle2, Activity } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const Preloader = ({ onComplete }) => {
  const { soundEnabled, toggleSound, playEngine, playBeep, playShiftSound } = useAudio();

  // Boot sequence phases:
  // 0: Initializing text
  // 1: Diagnostic checklist (ENGINE, TELEMETRY, etc.)
  // 2: Logo reveal with vibration & light sweep
  // 3: "READY TO RACE" + Speedometer needle sweep (0 -> 200 -> 350 -> 0)
  // 4: Complete
  const [phase, setPhase] = useState(0);
  const [activeCheckItem, setActiveCheckItem] = useState(0);
  const [sweepSpeed, setSweepSpeed] = useState(0);

  const checklist = [
    { label: "ENGINE [4.0L FLAT-6]", detail: "IGNITION MAPS CALIBRATED" },
    { label: "TELEMETRY [MOTEC 1000HZ]", detail: "CAN-BUS STREAM SYNCED" },
    { label: "AERODYNAMICS [CFD]", detail: "850KG DOWNFORCE PROFILE READY" },
    { label: "TRACK DATA [SPA-FRANCORCHAMPS]", detail: "LIDAR ELEVATION MATRIX LOADED" },
    { label: "RACE CONTROL [FIA HOMOLOGATION]", detail: "CHASSIS #09 CLEARED" },
    { label: "SYSTEM READY", detail: "ALL PROTOCOLS NOMINAL" }
  ];

  useEffect(() => {
    // Check if user has already seen preloader in this session
    const hasSeen = sessionStorage.getItem('akr_intro_completed');
    if (hasSeen) {
      onComplete?.();
      return;
    }

    // Step 1: Start Diagnostics checklist
    const tPhase1 = setTimeout(() => {
      setPhase(1);
    }, 600);

    // Step 2: Step through checklist items
    const checkTimers = [];
    checklist.forEach((_, idx) => {
      checkTimers.push(
        setTimeout(() => {
          setActiveCheckItem(idx);
          if (soundEnabled) playBeep();
        }, 900 + idx * 320)
      );
    });

    // Step 3: Reveal Official Logo
    const tPhase2 = setTimeout(() => {
      setPhase(2);
      if (soundEnabled) playEngine();
    }, 3100);

    // Step 4: "READY TO RACE" & Speedometer Needle Sweep
    const tPhase3 = setTimeout(() => {
      setPhase(3);
      if (soundEnabled) playShiftSound();

      // Needle sweep sequence: 0 -> 200 -> 350 -> 0
      let s = 0;
      const sweepInterval = setInterval(() => {
        s += 12;
        if (s <= 350) {
          setSweepSpeed(s);
        } else {
          clearInterval(sweepInterval);
          // Return to 0
          const downInterval = setInterval(() => {
            s -= 25;
            if (s <= 0) {
              clearInterval(downInterval);
              setSweepSpeed(0);
              // Complete preloader
              setTimeout(() => {
                sessionStorage.setItem('akr_intro_completed', 'true');
                onComplete?.();
              }, 400);
            } else {
              setSweepSpeed(s);
            }
          }, 30);
        }
      }, 25);
    }, 4500);

    return () => {
      clearTimeout(tPhase1);
      clearTimeout(tPhase2);
      clearTimeout(tPhase3);
      checkTimers.forEach(clearTimeout);
    };
  }, [soundEnabled]);

  const handleSkip = () => {
    sessionStorage.setItem('akr_intro_completed', 'true');
    onComplete?.();
  };

  const needleAngle = -120 + (sweepSpeed / 350) * 240;

  return (
    <motion.div
      className="fixed inset-0 z-[100000] bg-racing-black flex flex-col items-center justify-center overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Cinematic CRT Scan Lines & Ambient Flares */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-racing-red/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Controls Header */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between text-xs font-mono text-racing-silver z-20">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-racing-red animate-ping" />
          <span className="tracking-widest uppercase text-white font-bold">AKR COCKPIT BOOT PROTOCOL</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 hover:text-white transition-colors uppercase tracking-widest text-[11px]"
          >
            {soundEnabled ? <Volume2 size={14} className="text-racing-red" /> : <VolumeX size={14} />}
            <span>{soundEnabled ? 'AUDIO: ACTIVE' : 'AUDIO: OFF'}</span>
          </button>
          <button
            onClick={handleSkip}
            className="text-[11px] uppercase tracking-widest border border-white/20 px-3 py-1 hover:border-racing-red hover:text-racing-red transition-all"
          >
            SKIP INTRO [ESC]
          </button>
        </div>
      </div>

      {/* Center Stages Container */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl px-6 text-center w-full">
        {/* PHASE 0 & 1: System Initializing & Diagnostics */}
        {phase <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-lg space-y-6"
          >
            <div className="flex items-center justify-center gap-3 text-racing-red font-mono text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">
              <Activity size={16} className="animate-spin" />
              <span>SYSTEM INITIALIZING</span>
            </div>

            {/* Diagnostics Sequence */}
            <div className="space-y-2 text-left bg-black/60 border border-white/10 p-5 rounded-lg font-mono text-xs shadow-2xl">
              {checklist.map((item, idx) => {
                const isDone = activeCheckItem >= idx;
                const isCurrent = activeCheckItem === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isDone ? 1 : 0.2, x: 0 }}
                    className={`flex items-center justify-between p-2 rounded transition-colors ${
                      isCurrent ? 'bg-racing-red/15 text-racing-red font-bold' : isDone ? 'text-white' : 'text-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isDone ? (
                        <CheckCircle2 size={14} className="text-racing-red" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-white/20" />
                      )}
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[10px] text-racing-silver">{isDone ? item.detail : 'PENDING'}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* PHASE 2: Official Logo Lock-in & Vibration Sweep */}
        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 0.9, 1],
              scale: [0.8, 1.02, 1],
              x: [0, -2, 2, -1, 1, 0] // slight vibration effect
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center space-y-6"
          >
            {/* Official Logo Badge with Light Sweep */}
            <div className="relative p-5 bg-white rounded-xl border-2 border-racing-red shadow-[0_0_50px_rgba(217,4,41,0.6)] overflow-hidden group">
              <img
                src="/images/akr-logo.jpg"
                alt="Ajith Kumar Racing Official Logo"
                className="h-24 sm:h-32 w-auto object-contain"
              />
              {/* Sharp Light Sweep Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent transform -skew-x-12"
                initial={{ left: '-150%' }}
                animate={{ left: '150%' }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
              />
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
                AJITH KUMAR <span className="text-racing-red">RACING</span>
              </h1>
              <p className="font-mono text-xs sm:text-sm tracking-[0.4em] uppercase text-racing-silver">
                SPEED &bull; PRECISION &bull; PERFORMANCE
              </p>
            </div>
          </motion.div>
        )}

        {/* PHASE 3: "READY TO RACE" & 0 -> 200 -> 350 -> 0 Speedometer Sweep */}
        {phase === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: [0.7, 1.1, 1], opacity: 1 }}
              className="text-racing-red font-display text-3xl sm:text-5xl font-black uppercase tracking-widest text-shadow shadow-racing-red"
            >
              READY TO RACE
            </motion.div>

            {/* High-Speed Gauge Sweep */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="10"
                  strokeDasharray="360"
                  strokeDashoffset="120"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#D90429"
                  strokeWidth="10"
                  strokeDasharray="360"
                  strokeDashoffset={360 - (sweepSpeed / 350) * 240}
                  strokeLinecap="round"
                />
              </svg>

              {/* Sweeping Needle */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ transform: `rotate(${needleAngle}deg)` }}
              >
                <div className="w-1.5 h-28 bg-racing-red rounded-full shadow-[0_0_15px_#D90429] origin-bottom -translate-y-14" />
              </div>

              {/* Digital Readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-display text-5xl font-black text-white">{sweepSpeed}</span>
                <span className="text-xs font-mono text-racing-red font-bold">KM / H</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Subtext */}
      <div className="absolute bottom-8 text-center text-[10px] font-mono tracking-widest text-white/40 uppercase">
        INTERNATIONAL MOTORSPORT PLATFORM &bull; AJITH KUMAR RACING &bull; 2026 CAMPAIGN
      </div>
    </motion.div>
  );
};
