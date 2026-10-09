import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine';
import { siteConfig } from '../data/content';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioMode, setAudioMode] = useState('idle');

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
      setAudioMode(state.mode);
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = () => {
    romanticAudio.toggle();
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    romanticAudio.toggleMute();
  };

  return (
    <div 
      className="fixed top-4 right-3 sm:top-5 sm:right-5 z-50 flex items-center gap-2 group"
      style={{ top: 'calc(1rem + env(safe-area-inset-top, 0px))' }}
      aria-label="Background music controls"
    >
      <div 
        onClick={handleTogglePlay}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleTogglePlay(); }}
        className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full glass-card hover:border-pink-500/50 shadow-glow-sm cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-95 select-none"
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {/* Equalizer animation */}
        <div className="flex items-end gap-[3px] h-3.5 sm:h-4 w-3.5 sm:w-4">
          <span 
            className={`w-[2.5px] sm:w-[3px] bg-gradient-to-t from-pink-500 to-rose-400 rounded-full transition-all duration-300 ${
              isPlaying && !isMuted ? 'animate-[bounce_0.8s_ease-in-out_infinite] h-3.5 sm:h-4' : 'h-1.5 opacity-50'
            }`} 
          />
          <span 
            className={`w-[2.5px] sm:w-[3px] bg-gradient-to-t from-pink-500 to-rose-400 rounded-full transition-all duration-300 ${
              isPlaying && !isMuted ? 'animate-[bounce_1.1s_ease-in-out_0.2s_infinite] h-2.5 sm:h-3' : 'h-2 opacity-50'
            }`} 
          />
          <span 
            className={`w-[2.5px] sm:w-[3px] bg-gradient-to-t from-pink-500 to-rose-400 rounded-full transition-all duration-300 ${
              isPlaying && !isMuted ? 'animate-[bounce_0.9s_ease-in-out_0.4s_infinite] h-3.5 sm:h-4' : 'h-1 opacity-50'
            }`} 
          />
        </div>

        {/* Music label */}
        <div className="flex flex-col text-left">
          <span className="text-[10px] sm:text-[11px] font-medium text-pink-200 tracking-wide flex items-center gap-1">
            <Music className="w-2.5 h-2.5 text-rose-400" />
            <span className="truncate max-w-[80px] sm:max-w-[130px]">
              {siteConfig.audio.trackTitle}
            </span>
          </span>
          <span className="text-[8px] sm:text-[9px] text-pink-400/80 -mt-0.5">
            {isPlaying ? (isMuted ? 'Muted' : 'Now Playing') : 'Tap to Play'}
          </span>
        </div>

        {/* Play/Pause icon button */}
        <button
          type="button"
          className="p-1 rounded-full text-pink-200/90 hover:text-white hover:bg-rose-500/20 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> : <Play className="w-3 sm:w-3.5 h-3 sm:h-3.5" />}
        </button>

        {/* Mute button */}
        {isPlaying && (
          <button
            type="button"
            onClick={handleToggleMute}
            className="p-1 rounded-full text-pink-300 hover:text-white hover:bg-rose-500/20 transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-rose-400" /> : <Volume2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
}
