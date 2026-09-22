import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export default function SoundToggle() {
  const { isMuted, toggleAudio } = useAudio();

  return (
    <button
      onClick={toggleAudio}
      data-cursor="hover"
      aria-label={isMuted ? "Enable Ambient Audio" : "Mute Audio"}
      className="group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-purple-deep bg-surface-deep/80 hover:border-accent-violet/50 backdrop-blur-md transition-all duration-300 shadow-sm"
    >
      <div className="relative flex items-center justify-center text-accent-soft group-hover:text-accent-violet">
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-accent-magenta animate-pulse" />
        )}
      </div>

      <div className="flex items-center gap-[2px] h-3">
        <span
          className={`w-[2px] rounded-full bg-accent-violet transition-all duration-300 ${
            !isMuted ? 'h-3 animate-[pulse_0.7s_ease-in-out_infinite]' : 'h-1.5 opacity-30'
          }`}
        />
        <span
          className={`w-[2px] rounded-full bg-accent-magenta transition-all duration-300 ${
            !isMuted ? 'h-2 animate-[pulse_0.9s_ease-in-out_infinite_0.2s]' : 'h-1 opacity-30'
          }`}
        />
        <span
          className={`w-[2px] rounded-full bg-accent-crimson transition-all duration-300 ${
            !isMuted ? 'h-3.5 animate-[pulse_0.6s_ease-in-out_infinite_0.4s]' : 'h-1.5 opacity-30'
          }`}
        />
      </div>

      <span className="text-[10px] font-mono tracking-widest text-text-muted group-hover:text-text-main uppercase select-none">
        {isMuted ? "AUDIO OFF" : "AUDIO ON"}
      </span>
    </button>
  );
}
