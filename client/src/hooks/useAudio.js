import { useRef, useCallback } from 'react';

/**
 * Custom hook to trigger Web Audio synthesized tones for pit radio and shift beeps.
 */
export const useAudio = () => {
  const audioCtxRef = useRef(null);

  const playShiftBeep = useCallback((freq = 880, durationMs = 80) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + durationMs / 1000);
    } catch (e) {
      console.warn('[AKR Audio Engine] AudioContext playback inhibited:', e);
    }
  }, []);

  return { playShiftBeep };
};

export default useAudio;
