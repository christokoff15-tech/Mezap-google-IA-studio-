import React from 'react';
import { Play, Lock, Star, ArrowRight } from 'lucide-react';
import { Pack } from '../types';
import { Button } from './Button';

interface PackCardProps {
  pack: Pack;
  onPress: () => void;
  onPlayVideo: (url: string) => void;
  variant?: 'vertical' | 'horizontal';
  isPremiumLocked?: boolean;
}

export const PackCard: React.FC<PackCardProps> = ({ 
  pack, 
  onPress, 
  onPlayVideo, 
  variant = 'vertical',
  isPremiumLocked = false
}) => {
  const handleThumbnailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pack.descriptionVideoUrl) {
      onPlayVideo(pack.descriptionVideoUrl);
    }
  };

  if (variant === 'horizontal') {
    return (
      <div 
        className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-center active:scale-[0.99] transition-transform cursor-pointer"
        onClick={onPress}
      >
        <div 
          className="w-20 h-20 rounded-xl overflow-hidden relative flex-shrink-0 group"
          onClick={handleThumbnailClick}
        >
          <img src={pack.coverImage} alt={pack.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
             {isPremiumLocked ? (
               <Lock className="text-white drop-shadow-md" size={16} />
             ) : (
               <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                 <Play className="text-white fill-current ml-0.5" size={12} />
               </div>
             )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 leading-tight mb-1">{pack.title}</h4>
          <p className="text-xs text-gray-500 mb-2">{pack.author}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
              {pack.isFree ? 'Gratuit' : `${pack.price} ${pack.currency}`}
            </span>
            {pack.rating && (
              <div className="flex items-center text-[10px] text-gray-400">
                <Star size={10} className="text-amber-400 fill-amber-400 mr-0.5" /> {pack.rating}
              </div>
            )}
          </div>
        </div>
        <button className="p-2 bg-gray-50 text-gray-400 rounded-full hover:text-purple-600">
          <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  // Vertical (Standard)
  return (
    <div className="flex flex-col">
      <div 
        className="aspect-square rounded-xl overflow-hidden mb-2 relative bg-gray-200 group cursor-pointer"
        onClick={handleThumbnailClick}
      >
         <img src={pack.coverImage} alt={pack.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all">
                <Play className="text-white fill-white ml-1" size={16} />
            </div>
         </div>
         {pack.isFree ? (
           <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
             GRATUIT
           </div>
         ) : (
           <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur rounded-lg px-2 py-1 text-xs font-bold shadow-sm">
             {pack.price} {pack.currency}
           </div>
         )}
      </div>
      <div onClick={onPress} className="cursor-pointer">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 truncate">{pack.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-1 mb-2">{pack.author}</p>
        {!pack.isFree && (
          <Button size="sm" variant="outline" className="w-full text-xs h-8">
             Acheter
          </Button>
        )}
      </div>
    </div>
  );
};