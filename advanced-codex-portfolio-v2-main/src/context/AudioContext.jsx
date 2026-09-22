import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContextState = createContext({
  isMuted: true,
  toggleAudio: () => {},
  playInteractionSound: () => {},
});

export function AudioProvider({ children }) {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef(null);
  const droneNodesRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const startDrone = () => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    // Master drone gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2.5);
    masterGain.connect(ctx.destination);

    // Deep sub oscillator (55Hz root - A1)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, ctx.currentTime);

    // Harmonic fifth (82.4Hz - E2)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(82.4, ctx.currentTime);

    // Warm low-pass filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, ctx.currentTime);
    filter.Q.setValueAtTime(2, ctx.currentTime);

    // Subtle LFO modulation on filter
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(40, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(masterGain);

    osc1.start();
    osc2.start();
    lfo.start();

    droneNodesRef.current = { masterGain, osc1, osc2, lfo };
  };

  const stopDrone = () => {
    if (droneNodesRef.current && audioCtxRef.current) {
      const { masterGain, osc1, osc2, lfo } = droneNodesRef.current;
      const ctx = audioCtxRef.current;
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      setTimeout(() => {
        try {
          osc1.stop();
          osc2.stop();
          lfo.stop();
        } catch {
          // ignore already stopped
        }
        droneNodesRef.current = null;
      }, 1300);
    }
  };

  const toggleAudio = () => {
    initAudio();
    setIsMuted((prev) => {
      const next = !prev;
      if (!next) {
        startDrone();
      } else {
        stopDrone();
      }
      return next;
    });
  };

  const playInteractionSound = (type = 'hover') => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.012, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587, now);
        osc.frequency.exponentialRampToValueAtTime(293, now + 0.12);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.13);
      }
    } catch {
      // safe fallback
    }
  };

  useEffect(() => {
    return () => {
      stopDrone();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <AudioContextState.Provider value={{ isMuted, toggleAudio, playInteractionSound }}>
      {children}
    </AudioContextState.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContextState);
}
