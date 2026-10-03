import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Shield, Zap } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0); // 0: line, 1: emblem, 2: full logo, 3: completed
  const { soundEnabled, toggleSound, playEngine } = useAudio();

  useEffect(() => {
    // Check if user has already seen preloader in this session
    const hasSeen = sessionStorage.getItem('akr_intro_completed');
    if (hasSeen) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            sessionStorage.setItem('akr_intro_completed', 'true');
            onComplete?.();
          }, 600);
          return 100;
        }
        const increment = prev < 60 ? Math.floor(Math.random() * 8 + 4) : Math.floor(Math.random() * 12 + 6);
        return Math.min(100, prev + increment);
      });
    }, 45);

    const t1 = setTimeout(() => setStage(1), 400);
    const t2 = setTimeout(() => {
      setStage(2);
      if (soundEnabled) playEngine();
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [soundEnabled]);

  const handleSkip = () => {
    sessionStorage.setItem('akr_intro_completed', 'true');
    onComplete?.();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100000] bg-racing-black flex flex-col items-center justify-center overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Background Cinematic Grid & Subtle Light Flare */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-racing-red/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar with Sound Toggle and Skip */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between text-xs font-mono text-racing-silver">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-racing-red animate-ping" />
          <span className="tracking-widest uppercase">AKR PIT LAUNCH PROTOCOL v2.6</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 hover:text-white transition-colors uppercase tracking-widest text-[11px]"
          >
            {soundEnabled ? <Volume2 size={14} className="text-racing-red" /> : <VolumeX size={14} />}
            <span>{soundEnabled ? 'AUDIO: ENGAGED' : 'AUDIO: MUTED'}</span>
          </button>
          <button
            onClick={handleSkip}
            className="text-[11px] uppercase tracking-widest border border-white/20 px-3 py-1 hover:border-racing-red hover:text-racing-red transition-all"
          >
            SKIP INTRO [ESC]
          </button>
        </div>
      </div>

      {/* Center Cinematic Reveal Sequence */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl px-6 text-center">
        {/* Horizontal Accelerating Racing Line */}
        <div className="w-full max-w-md h-[2px] bg-white/10 relative overflow-hidden mb-8">
          <motion.div
            className="absolute top-0 left-0 h-full bg-racing-red shadow-[0_0_12px_#D90429]"
            initial={{ left: '-100%', width: '30%' }}
            animate={{ left: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          />
        </div>

        {/* AKR Emblem & Title */}
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="emblem-reveal"
              initial={{ scale: 0.85, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Dynamic Badge */}
              <div className="relative mb-4">
                <div className="w-20 h-20 border border-racing-red/40 rotate-45 flex items-center justify-center bg-black/60 shadow-[0_0_30px_rgba(217,4,41,0.3)]">
                  <span className="-rotate-45 font-display text-2xl font-black tracking-tighter text-white">
                    AK<span className="text-racing-red">R</span>
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-racing-red" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-racing-red" />
              </div>

              <motion.h1
                className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-2"
                initial={{ letterSpacing: '0.2em', opacity: 0 }}
                animate={{ letterSpacing: '0.02em', opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                AJITH KUMAR <span className="text-racing-red">RACING</span>
              </motion.h1>

              <motion.p
                className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-racing-silver/90 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                RACING. PERFORMANCE. PRECISION.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Telemetry Counter & Progress Bar */}
        <div className="w-64 flex flex-col gap-2 mt-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-racing-silver tracking-widest text-[10px]">INITIALIZING SYSTEMS</span>
            <span className="text-racing-red font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-none overflow-hidden relative">
            <motion.div
              className="h-full bg-racing-red"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-mono text-white/30 tracking-widest uppercase">
            <span>GT3-01 HYBRID CFD</span>
            <span>TELEMETRY SYNCED</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Editorial Subtext */}
      <div className="absolute bottom-8 text-center text-[10px] font-mono tracking-widest text-white/40 uppercase">
        INTERNATIONAL MOTORSPORT PLATFORM &bull; 2026 CAMPAIGN
      </div>
    </motion.div>
  );
};
