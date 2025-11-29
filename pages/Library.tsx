import React, { useState } from 'react';
import { Download, MoreVertical, Play, WifiOff, CheckCircle, Trash2 } from 'lucide-react';
import { Pack } from '../types';

interface LibraryProps {
  packs: Pack[];
  onPlay: (pack: Pack) => void;
  downloadedIds: Set<string>;
  onToggleDownload: (id: string) => void;
  isOffline: boolean;
}

export const Library: React.FC<LibraryProps> = ({ 
  packs, 
  onPlay, 
  downloadedIds, 
  onToggleDownload,
  isOffline
}) => {
  const [showOnlyDownloads, setShowOnlyDownloads] = useState(isOffline);

  // Auto switch to downloaded view if offline
  React.useEffect(() => {
    if (isOffline) setShowOnlyDownloads(true);
  }, [isOffline]);

  const toggleDownload = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleDownload(id);
  };

  const filteredPacks = showOnlyDownloads 
    ? packs.filter(p => downloadedIds.has(p.id)) 
    : packs;

  return (
    <div className="pb-24 pt-4 px-4 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mes Proclamations</h1>
        <button 
          onClick={() => setShowOnlyDownloads(!showOnlyDownloads)}
          disabled={isOffline}
          className={`p-2 rounded-full transition-colors ${showOnlyDownloads || isOffline ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-500'}`}
        >
          <WifiOff size={20} />
        </button>
      </div>

      {(showOnlyDownloads || isOffline) && (
         <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800 flex items-center gap-2">
            <WifiOff size={16} />
            {isOffline 
              ? "Vous êtes hors-ligne. Affichage des téléchargements." 
              : "Affichage des packs téléchargés."}
         </div>
      )}

      <div className="space-y-4">
        {filteredPacks.length === 0 ? (
           <div className="text-center py-12 text-gray-400">
             <p>{isOffline ? "Aucun pack téléchargé pour le mode hors-ligne." : "Votre bibliothèque est vide."}</p>
           </div>
        ) : (
          filteredPacks.map(pack => {
            const isDownloaded = downloadedIds.has(pack.id);

            return (
              <div key={pack.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header Card */}
                <div 
                  className="p-3 flex items-center justify-between cursor-pointer active:bg-gray-50"
                  onClick={() => onPlay(pack)}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={pack.coverImage} alt={pack.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play size={24} fill="white" className="text-white opacity-90" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{pack.title}</h4>
                      <p className="text-xs text-gray-500">{pack.author}</p>
                      <p className="text-xs text-indigo-600 mt-1 font-medium">{pack.audioDuration} • Audio</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                     {!isOffline && (
                       <button 
                         onClick={(e) => toggleDownload(pack.id, e)}
                         className={`p-2 rounded-full transition-colors ${isDownloaded ? 'text-green-500 bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                       >
                         {isDownloaded ? <CheckCircle size={20} /> : <Download size={20} />}
                       </button>
                     )}
                     {isOffline && isDownloaded && (
                       <span className="p-2 text-green-500">
                         <CheckCircle size={20} />
                       </span>
                     )}
                     <button className="p-2 text-gray-400 hover:text-gray-600">
                       <MoreVertical size={20} />
                     </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};