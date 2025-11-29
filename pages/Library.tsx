import React, { useState } from 'react';
import { Download, MoreVertical, Play, WifiOff, CheckCircle } from 'lucide-react';
import { Track } from '../types';

interface LibraryProps {
  tracks: Track[];
  onPlay: (track: Track) => void;
}

export const Library: React.FC<LibraryProps> = ({ tracks, onPlay }) => {
  const [offlineMode, setOfflineMode] = useState(false);
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());

  const toggleDownload = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(downloadedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setDownloadedIds(next);
  };

  const filteredTracks = offlineMode 
    ? tracks.filter(t => downloadedIds.has(t.id)) 
    : tracks;

  return (
    <div className="pb-24 pt-4 px-4 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mes Proclamations</h1>
        <button 
          onClick={() => setOfflineMode(!offlineMode)}
          className={`p-2 rounded-full transition-colors ${offlineMode ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-500'}`}
        >
          <WifiOff size={20} />
        </button>
      </div>

      {offlineMode && (
         <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800 flex items-center gap-2">
            <WifiOff size={16} />
            Mode hors-ligne activé. Seuls les téléchargements sont visibles.
         </div>
      )}

      <div className="space-y-3">
        {filteredTracks.length === 0 ? (
           <div className="text-center py-12 text-gray-400">
             <p>Aucune proclamation trouvée.</p>
           </div>
        ) : (
          filteredTracks.map(track => {
            const isDownloaded = downloadedIds.has(track.id);
            return (
              <div 
                key={track.id} 
                className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group active:scale-[0.99] transition-transform cursor-pointer"
                onClick={() => onPlay(track)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                    <Play size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{track.title}</h4>
                    <p className="text-xs text-gray-500">{track.duration} • Audio</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                   <button 
                     onClick={(e) => toggleDownload(track.id, e)}
                     className={`p-2 rounded-full ${isDownloaded ? 'text-green-500' : 'text-gray-300 hover:text-gray-500'}`}
                   >
                     {isDownloaded ? <CheckCircle size={20} /> : <Download size={20} />}
                   </button>
                   <button className="p-2 text-gray-400 hover:text-gray-600">
                     <MoreVertical size={20} />
                   </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
