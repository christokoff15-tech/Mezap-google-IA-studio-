import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, ChevronDown, Repeat, Heart, Share2, ListMusic, Volume2 } from 'lucide-react';
import { Track } from '../types';

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Player: React.FC<PlayerProps> = ({ 
  currentTrack, 
  isPlaying, 
  onPlayPause, 
  onClose,
  onNext,
  onPrev
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mock progress simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  if (!currentTrack) return null;

  // Mini Player
  if (!isExpanded) {
    return (
      <div 
        className="fixed bottom-[4.5rem] left-3 right-3 bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/20 z-30 text-white p-2 flex items-center justify-between cursor-pointer border border-white/10" 
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          {currentTrack.coverImage ? (
             <img src={currentTrack.coverImage} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" alt="Cover" />
          ) : (
             <div className="w-10 h-10 bg-purple-700 rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse-slow">
                <ListMusic size={20} className="text-purple-200" />
             </div>
          )}
          <div className="flex flex-col overflow-hidden min-w-0">
            <span className="font-semibold text-sm truncate">{currentTrack.title}</span>
            <span className="text-xs text-purple-300 truncate">{currentTrack.author || 'Lecture en cours...'}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0 px-2">
          <button 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={(e) => { e.stopPropagation(); onPlayPause(); }}
          >
            {isPlaying ? <Pause size={22} fill="white" /> : <Play size={22} fill="white" />}
          </button>
        </div>
        
        {/* Progress bar overlay on bottom of mini player */}
        <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gray-700 rounded-full overflow-hidden">
           <div className="h-full bg-purple-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
  }

  // Full Screen Player
  return (
    <div className="fixed inset-0 bg-gray-950 z-50 flex flex-col text-white animate-slide-up">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-gray-900 to-gray-950 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between p-4 pt- safe-top relative z-10">
        <button onClick={() => setIsExpanded(false)} className="p-2 text-gray-400 hover:text-white">
          <ChevronDown size={32} />
        </button>
        <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">En écoute</span>
        <button className="p-2 text-gray-400 hover:text-white">
           <Volume2 size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-10 relative z-10">
        {/* Cover Art */}
        <div className="w-72 h-72 rounded-3xl shadow-[0_20px_50px_rgba(147,51,234,0.3)] flex items-center justify-center relative overflow-hidden bg-gray-800 border border-white/5">
             {currentTrack.coverImage ? (
                <img src={currentTrack.coverImage} className="w-full h-full object-cover" alt="Cover" />
             ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-800 to-blue-600 opacity-80" />
                  <span className="text-8xl relative z-10">✝</span>
                </>
             )}
             
             {/* Spinning decorative ring */}
             {isPlaying && (
               <div className="absolute inset-0 border-4 border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
             )}
        </div>
        
        {/* Track Info */}
        <div className="space-y-2 w-full text-center">
          <h2 className="text-2xl font-bold truncate leading-tight">{currentTrack.title}</h2>
          <p className="text-purple-300 font-medium">{currentTrack.author || 'Pack Proclamation'}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-3">
           <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden cursor-pointer group">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full relative" 
                style={{ width: `${progress}%` }} 
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
           </div>
           <div className="flex justify-between text-xs text-gray-400 font-medium font-mono">
             <span>0:{progress < 10 ? `0${Math.floor(progress)}` : Math.floor(progress)}</span>
             <span>{currentTrack.duration}</span>
           </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-between w-full max-w-sm">
          <button className="p-3 text-gray-400 hover:text-white transition-colors">
             <Repeat size={22} />
          </button>
          
          <div className="flex items-center gap-6">
            <button onClick={onPrev} className="p-2 hover:bg-white/5 rounded-full transition-colors active:scale-90">
              <SkipBack size={32} fill="white" />
            </button>
            
            <button 
              onClick={onPlayPause}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg shadow-white/20 hover:scale-105 transition-all active:scale-95"
            >
               {isPlaying ? 
                <Pause size={36} className="text-purple-900 fill-current" /> : 
                <Play size={36} className="text-purple-900 fill-current ml-1" />
               }
            </button>
            
            <button onClick={onNext} className="p-2 hover:bg-white/5 rounded-full transition-colors active:scale-90">
              <SkipForward size={32} fill="white" />
            </button>
          </div>

          <button className="p-3 text-gray-400 hover:text-white transition-colors">
             <Share2 size={22} />
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 pt-0 flex justify-center pb-safe-bottom z-10">
        <button className="flex items-center gap-2 text-purple-300 bg-purple-900/30 px-6 py-3 rounded-full text-sm font-semibold backdrop-blur-sm border border-purple-500/30">
          <Heart size={18} />
          Ajouter aux favoris
        </button>
      </div>
    </div>
  );
};