import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundFx } from '../services/soundEffects';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('akr_sound_enabled') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('akr_sound_enabled', soundEnabled);
  }, [soundEnabled]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      soundFx.playEngineStartup();
    }
  };

  const playClick = () => {
    if (soundEnabled) {
      soundFx.playTick();
    }
  };

  const playBeep = () => {
    if (soundEnabled) {
      soundFx.playTelemetryBeep();
    }
  };

  const playEngine = () => {
    if (soundEnabled) {
      soundFx.playEngineStartup();
    }
  };

  const playShiftSound = () => {
    if (soundEnabled) {
      soundFx.playShift();
    }
  };

  return (
    <AudioContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playClick,
        playBeep,
        playEngine,
        playShiftSound
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
