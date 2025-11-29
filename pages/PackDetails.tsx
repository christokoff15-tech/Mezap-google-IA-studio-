import React, { useState } from 'react';
import { ArrowLeft, Play, FileText, Video, Share2, Heart, Clock, Star, Lock, Download, CheckCircle, WifiOff } from 'lucide-react';
import { Pack } from '../types';
import { Button } from '../components/Button';

interface PackDetailsProps {
  pack: Pack;
  onBack: () => void;
  onPlayAudio: (pack: Pack) => void;
  onPlayVideo: (url: string) => void;
  onBuy: () => void;
  isPremium: boolean;
  isOwned: boolean;
  isDownloaded: boolean;
  isOffline: boolean;
  onToggleDownload: () => void;
}

export const PackDetails: React.FC<PackDetailsProps> = ({ 
  pack, 
  onBack, 
  onPlayAudio, 
  onPlayVideo,
  onBuy,
  isPremium,
  isOwned,
  isDownloaded,
  isOffline,
  onToggleDownload
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'text'>('content');
  const canAccess = pack.isFree || isOwned || isPremium;

  // Logic to determine if media is playable
  const canPlayMedia = canAccess && (!isOffline || isDownloaded);
  const canPlayVideo = canAccess && !isOffline; // Videos are streaming only for now

  return (
    <div className="bg-white min-h-screen pb-24 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-30 px-4 pt-safe-top pb-3 border-b border-gray-100 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-700 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <span className="font-bold text-gray-900 truncate max-w-[200px]">{pack.title}</span>
        <div className="flex gap-2">
           <button 
             onClick={onToggleDownload}
             disabled={!canAccess || isOffline}
             className={`p-2 rounded-full transition-colors ${
               isDownloaded 
                 ? 'bg-green-100 text-green-600' 
                 : 'hover:bg-gray-100 text-gray-600 disabled:opacity-50'
             }`}
           >
             {isDownloaded ? <CheckCircle size={20} /> : <Download size={20} />}
           </button>
           <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
             <Heart size={20} />
           </button>
           <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
             <Share2 size={20} />
           </button>
        </div>
      </div>

      <div className="p-4">
        {/* Pack Info */}
        <div className="flex gap-4 mb-6">
           <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
              <img src={pack.coverImage} alt={pack.title} className="w-full h-full object-cover" />
           </div>
           <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                 <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {pack.category}
                 </span>
                 {pack.rating && (
                   <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                      <Star size={10} fill="currentColor" /> {pack.rating}
                   </span>
                 )}
              </div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight mb-1">{pack.title}</h1>
              <p className="text-sm text-gray-500 mb-2">{pack.author}</p>
              
              {!canAccess && (
                 <div className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    <Lock size={12} /> {pack.price} {pack.currency}
                 </div>
              )}
              {isOffline && !isDownloaded && (
                 <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-lg mt-1">
                    <WifiOff size={12} /> Non téléchargé
                 </div>
              )}
           </div>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
           <button 
             onClick={() => setActiveTab('content')}
             className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'content' ? 'bg-white shadow-sm text-indigo-900' : 'text-gray-500'}`}
           >
             <Play size={16} /> Média
           </button>
           <button 
             onClick={() => setActiveTab('text')}
             className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'text' ? 'bg-white shadow-sm text-indigo-900' : 'text-gray-500'}`}
           >
             <FileText size={16} /> Texte
           </button>
        </div>

        {activeTab === 'content' ? (
          <div className="space-y-4">
            {/* Description Video */}
            <div className={`bg-white border border-gray-100 rounded-2xl p-4 shadow-sm ${!canPlayVideo ? 'opacity-70 grayscale-[0.5]' : ''}`}>
               <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-pink-100 text-pink-600 rounded-full">
                     <Video size={20} />
                  </div>
                  <div>
                     <h3 className="font-bold text-gray-900">Introduction Vidéo</h3>
                     <p className="text-xs text-gray-500">{isOffline ? 'Non disponible hors-ligne' : 'Comprendre le contexte'}</p>
                  </div>
               </div>
               
               <div 
                 className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden group cursor-pointer"
                 onClick={() => {
                   if (canPlayVideo) onPlayVideo(pack.descriptionVideoUrl);
                   else if (isOffline) alert("Vidéo indisponible hors connexion.");
                 }}
               >
                  <img src={pack.coverImage} className="w-full h-full object-cover opacity-60" alt="" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        {isOffline ? <WifiOff size={24} className="text-white/50" /> : <Play size={24} fill="white" className="text-white ml-1" />}
                     </div>
                  </div>
               </div>
            </div>

            {/* Audio Proclamation */}
            <div className={`bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg shadow-purple-500/20 ${!canPlayMedia ? 'opacity-90' : ''}`}>
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <h3 className="font-bold text-lg">Proclamation Audio</h3>
                     <div className="flex items-center gap-2 text-purple-200 text-xs mt-1">
                        <Clock size={12} /> {pack.audioDuration}
                        <span>•</span>
                        <span>{isDownloaded ? 'Hors-ligne' : 'Streaming'}</span>
                     </div>
                  </div>
                  <div className="p-2 bg-white/20 backdrop-blur-md rounded-full">
                     {isDownloaded ? <CheckCircle size={20} /> : <Play size={20} fill="white" />}
                  </div>
               </div>

               {canAccess ? (
                  canPlayMedia ? (
                    <Button 
                      variant="white" 
                      fullWidth 
                      className="font-bold text-purple-700"
                      onClick={() => onPlayAudio(pack)}
                    >
                      <Play size={18} className="mr-2" /> Écouter maintenant
                    </Button>
                  ) : (
                    <Button 
                      variant="secondary" 
                      fullWidth 
                      className="font-bold bg-gray-200 text-gray-500"
                      disabled
                    >
                      <WifiOff size={18} className="mr-2" /> Téléchargement requis
                    </Button>
                  )
               ) : (
                  <Button variant="secondary" fullWidth className="font-bold" onClick={onBuy}>
                    Débloquer le Pack
                  </Button>
               )}
            </div>
            
            {isOffline && !isDownloaded && canAccess && (
              <p className="text-center text-xs text-red-500 mt-2 font-medium">
                Connectez-vous à internet pour télécharger ce pack.
              </p>
            )}
            {!canAccess && (
              <p className="text-center text-xs text-gray-500 mt-4">
                Ce contenu est verrouillé. Achetez le pack ou abonnez-vous à Premium pour y accéder.
              </p>
            )}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm min-h-[300px]">
            {canPlayMedia ? (
              <>
                <h2 className="font-serif text-2xl text-gray-900 mb-6 leading-relaxed">
                  {pack.textContent}
                </h2>
                
                {pack.verses && pack.verses.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Versets de référence</h3>
                    <div className="space-y-4">
                      {pack.verses.map((verse, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-xl border-l-4 border-indigo-500">
                           <p className="text-gray-800 italic mb-2">"{verse.text}"</p>
                           <p className="text-indigo-600 font-bold text-xs text-right">{verse.reference}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                 {isOffline && !isDownloaded ? (
                   <>
                     <WifiOff size={48} className="text-gray-300 mb-4" />
                     <h3 className="font-bold text-gray-900">Contenu non téléchargé</h3>
                     <p className="text-sm text-gray-500 mt-1 max-w-[200px]">
                       Le texte n'est pas disponible hors-ligne.
                     </p>
                   </>
                 ) : (
                   <>
                     <Lock size={48} className="text-gray-200 mb-4" />
                     <h3 className="font-bold text-gray-900">Texte Verrouillé</h3>
                     <p className="text-sm text-gray-500 mt-1 max-w-[200px]">
                        Le texte de la proclamation est réservé aux possesseurs du pack.
                     </p>
                   </>
                 )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};