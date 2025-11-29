import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, X, ChevronDown, Repeat, ListMusic } from 'lucide-react';
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
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  if (!currentTrack) return null;

  // Mini Player
  if (!isExpanded) {
    return (
      <div className="fixed bottom-20 left-4 right-4 bg-indigo-900 rounded-xl shadow-xl z-40 text-white p-3 flex items-center justify-between cursor-pointer max-w-2xl mx-auto" onClick={() => setIsExpanded(true)}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-indigo-700 rounded-lg flex items-center justify-center flex-shrink-0">
             <span className="text-xs">IMG</span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-sm truncate">{currentTrack.title}</span>
            <span className="text-xs text-indigo-300">En cours de lecture...</span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button 
            className="p-2 hover:bg-white/10 rounded-full"
            onClick={(e) => { e.stopPropagation(); onPlayPause(); }}
          >
            {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
          </button>
        </div>
      </div>
    );
  }

  // Full Screen Player
  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 mt-2">
        <button onClick={() => setIsExpanded(false)} className="p-2">
          <ChevronDown size={28} />
        </button>
        <span className="text-sm font-medium tracking-wide uppercase text-gray-400">Lecteur MEZAP</span>
        <button className="p-2">
           <ListMusic size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8">
        <div className="w-64 h-64 bg-indigo-800 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 to-purple-800 opacity-50" />
             <span className="text-6xl font-bold opacity-20">✝</span>
        </div>
        
        <div className="space-y-2 w-full">
          <h2 className="text-2xl font-bold truncate">{currentTrack.title}</h2>
          <p className="text-gray-400">Pack Proclamation</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
           <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full" 
                style={{ width: `${progress}%` }} 
              />
           </div>
           <div className="flex justify-between text-xs text-gray-400">
             <span>0:{progress < 10 ? `0${progress}` : progress}</span>
             <span>{currentTrack.duration}</span>
           </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between w-full max-w-xs">
          <button className="p-3 text-gray-400 hover:text-white">
             <Repeat size={20} />
          </button>
          <button onClick={onPrev} className="p-3 hover:bg-white/10 rounded-full">
            <SkipBack size={28} fill="white" />
          </button>
          <button 
            onClick={onPlayPause}
            className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-500 transition-transform active:scale-95"
          >
             {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
          </button>
          <button onClick={onNext} className="p-3 hover:bg-white/10 rounded-full">
            <SkipForward size={28} fill="white" />
          </button>
          <button className="p-3 text-gray-400 hover:text-white" onClick={() => setIsExpanded(false)}>
             <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
