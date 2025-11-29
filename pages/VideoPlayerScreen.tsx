import React from 'react';
import { X } from 'lucide-react';

interface VideoPlayerScreenProps {
  videoUrl: string;
  onClose: () => void;
}

export const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({ videoUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col justify-center animate-in fade-in">
       <button 
         onClick={onClose} 
         className="absolute top-4 right-4 z-10 text-white p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-colors"
       >
         <X size={24} />
       </button>
       <div className="w-full aspect-video bg-black relative">
        <video 
             src={videoUrl} 
             controls 
             autoPlay 
             className="w-full h-full object-contain"
           />
       </div>
    </div>
  );
};