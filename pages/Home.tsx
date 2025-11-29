import React, { useState, useRef, useEffect } from 'react';
import { Play, Bell, Search, Star, ArrowRight, Heart, MessageCircle, Users, Volume2, VolumeX, Maximize2, Eye, WifiOff } from 'lucide-react';
import { Button } from '../components/Button';
import { PackCard } from '../components/PackCard';
import { PACKS, DAILY_PROCLAMATION, POSTS, MEZAP_TV_PLAYLIST } from '../constants';
import { Pack, User } from '../types';

interface HomeProps {
  user: User;
  onNavigate: (tab: string) => void;
  onSelectPack: (pack: Pack) => void;
  onPlayVideo: (url: string) => void;
  onLogin: () => void;
  isOffline: boolean;
}

export const Home: React.FC<HomeProps> = ({ user, onNavigate, onSelectPack, onPlayVideo, onLogin, isOffline }) => {
  const paidPacks = PACKS.filter(p => !p.isFree).slice(0, 3);
  const prayers = POSTS.filter(p => p.type === 'priere').slice(0, 3);
  const testimonials = POSTS.filter(p => p.type === 'temoignage').slice(0, 3);

  // MEZAP TV State
  const [currentTvIndex, setCurrentTvIndex] = useState(0);
  const [isTvMuted, setIsTvMuted] = useState(true);
  const [viewerCount, setViewerCount] = useState("0");
  const tvVideoRef = useRef<HTMLVideoElement>(null);

  const currentTvVideo = MEZAP_TV_PLAYLIST[currentTvIndex];

  const handleTvVideoEnd = () => {
    // Loop to next video or go back to start
    setCurrentTvIndex((prev) => (prev + 1) % MEZAP_TV_PLAYLIST.length);
  };

  useEffect(() => {
    // When index changes, ensuring the new video plays
    if (tvVideoRef.current && !isOffline) {
      tvVideoRef.current.load();
      tvVideoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [currentTvIndex, isOffline]);

  useEffect(() => {
    // Simulate random viewer count between 1.5k and 99k
    const count = Math.floor(Math.random() * (99000 - 1500) + 1500);
    setViewerCount((count / 1000).toFixed(1) + 'k');
  }, []);

  return (
    <div className="pb-32 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-30 px-4 pt-safe-top pb-3 border-b border-gray-100 flex justify-between items-center">
        <div>
           {user.isGuest ? (
             <div className="flex items-center gap-2">
               <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Mode Invité</span>
               <button onClick={onLogin} className="text-xs text-purple-600 font-bold underline">Se connecter</button>
             </div>
           ) : (
             <p className="text-xs text-gray-500 font-medium">Bonjour, {user.name.split(' ')[0]}</p>
           )}
           <h1 className="text-xl font-bold text-gray-900 tracking-tight">Proclamation Authentique</h1>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>
      </div>

      {/* MEZAP TV Section (Live Player) */}
      <div className="mt-4 px-4">
        {isOffline ? (
          <div className="w-full aspect-video bg-gray-900 rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center shadow-xl">
             <WifiOff size={48} className="mb-4 text-gray-500" />
             <h3 className="font-bold text-lg mb-2">Connexion Introuvable</h3>
             <p className="text-sm text-gray-400">MEZAP TV nécessite une connexion internet. Veuillez vérifier votre réseau.</p>
          </div>
        ) : (
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl shadow-purple-900/10 group">
            <video
              ref={tvVideoRef}
              src={currentTvVideo.url}
              className="w-full h-full object-cover"
              autoPlay
              muted={isTvMuted}
              playsInline
              onEnded={handleTvVideoEnd}
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none" />
            
            {/* Top Controls */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-auto">
               <div className="flex gap-2">
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse shadow-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" /> Live
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 rounded bg-black/50 text-white text-[10px] font-bold backdrop-blur-sm border border-white/10">
                     <Eye size={10} /> {viewerCount}
                  </span>
                  <span className="px-2 py-1 rounded bg-black/50 text-white text-[10px] font-bold backdrop-blur-sm border border-white/10">
                    MEZAP TV
                  </span>
               </div>
               <button 
                 onClick={() => setIsTvMuted(!isTvMuted)}
                 className="w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors border border-white/10"
               >
                 {isTvMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
               </button>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 p-4 w-full pointer-events-auto flex items-end justify-between">
              <div className="flex-1 mr-4">
                <h2 className="text-white font-bold text-lg mb-1 leading-tight line-clamp-1">{currentTvVideo.title}</h2>
                <p className="text-gray-300 text-xs line-clamp-1">Diffusion en continu • {currentTvIndex + 1}/{MEZAP_TV_PLAYLIST.length}</p>
              </div>
              <button 
                onClick={() => onPlayVideo(currentTvVideo.url)}
                className="w-10 h-10 bg-white text-purple-900 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
              >
                 <Maximize2 size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Latest Videos Playlist Thumbnails */}
        {!isOffline && (
          <div className="mt-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">À suivre sur MEZAP TV</h3>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {MEZAP_TV_PLAYLIST.map((video, index) => (
                <div 
                  key={video.id} 
                  className={`w-32 flex-shrink-0 cursor-pointer active:scale-95 transition-transform ${index === currentTvIndex ? 'opacity-50' : 'opacity-100'}`}
                  onClick={() => {
                    setCurrentTvIndex(index);
                    setIsTvMuted(false); // Auto unmute if user manually selects
                  }}
                >
                   <div className={`relative aspect-video rounded-lg overflow-hidden mb-1.5 bg-gray-200 ${index === currentTvIndex ? 'ring-2 ring-purple-600' : ''}`}>
                      <img src={video.thumbnail} className="w-full h-full object-cover" alt={video.title} />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                         {index === currentTvIndex ? (
                           <div className="flex gap-0.5 items-end h-3">
                             <div className="w-1 bg-white animate-[pulse_1s_ease-in-out_infinite] h-full" />
                             <div className="w-1 bg-white animate-[pulse_1.5s_ease-in-out_infinite] h-2/3" />
                             <div className="w-1 bg-white animate-[pulse_0.5s_ease-in-out_infinite] h-full" />
                           </div>
                         ) : (
                           <div className="w-6 h-6 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <Play size={10} fill="white" className="text-white ml-0.5" />
                           </div>
                         )}
                      </div>
                   </div>
                   <p className={`text-[10px] font-semibold line-clamp-2 leading-tight ${index === currentTvIndex ? 'text-purple-600' : 'text-gray-800'}`}>
                     {video.title}
                   </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Daily Proclamation */}
      <div className="px-4 mt-6">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden">
           <div className="relative z-10">
             <div className="flex items-center gap-2 mb-2">
               <span className="bg-white/20 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Proclamation du Jour</span>
               <Star size={12} fill="white" className="text-white" />
             </div>
             <h3 className="text-xl font-bold mb-1">{DAILY_PROCLAMATION.title}</h3>
             <p className="text-orange-100 text-xs font-mono mb-3">{DAILY_PROCLAMATION.verse}</p>
             <p className="text-white/90 text-sm mb-4 italic leading-relaxed">
               "{DAILY_PROCLAMATION.text}"
             </p>
             <button className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-transform">
               <Play size={16} fill="currentColor" /> Écouter (2min)
             </button>
           </div>
           
           {/* Decor */}
           <div className="absolute -right-4 -bottom-10 opacity-20 rotate-12">
              <Star size={120} />
           </div>
        </div>
      </div>

      {/* Free Packs */}
      <div className="mt-8">
        <div className="flex justify-between items-center px-4 mb-3">
          <h3 className="font-bold text-gray-900 text-lg">🎁 Packs Gratuits</h3>
          <button onClick={() => onNavigate('market')} className="text-xs text-purple-600 font-bold">Voir tout</button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide snap-x snap-mandatory">
          {PACKS.filter(p => p.isFree).map((pack) => (
            <div key={pack.id} className="min-w-[160px] w-[160px] flex-shrink-0 snap-start">
               <PackCard 
                 pack={pack} 
                 onPress={() => onSelectPack(pack)} 
                 onPlayVideo={onPlayVideo}
               />
            </div>
          ))}
        </div>
      </div>

      {/* Packs Payants List */}
      <div className="mt-6 px-4">
        <h3 className="font-bold text-gray-900 text-lg mb-3">💎 Packs Premium</h3>
        <div className="flex flex-col gap-3">
          {paidPacks.map((pack) => (
            <PackCard 
               key={pack.id}
               pack={pack}
               variant="horizontal"
               onPress={() => onSelectPack(pack)}
               onPlayVideo={onPlayVideo}
               isPremiumLocked={!user.isPremium}
            />
          ))}
        </div>
        <button 
          onClick={() => onNavigate('market')}
          className="w-full mt-4 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          Voir la suite <ArrowRight size={16} />
        </button>
      </div>

      {/* Prayer Wall Preview */}
      <div className="mt-8 px-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-900 text-lg">🙏 Mur de Prière</h3>
          <button onClick={() => onNavigate('community')} className="text-xs text-purple-600 font-bold">Voir toutes</button>
        </div>
        <div className="space-y-3">
          {prayers.map(post => (
             <div key={post.id} className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
                <div className="flex items-center gap-3 mb-2">
                   <img src={post.userAvatar} alt="" className="w-8 h-8 rounded-full object-cover border border-white" />
                   <div>
                      <p className="text-xs font-bold text-gray-900">{post.userName}</p>
                      <p className="text-[10px] text-gray-500">{post.timestamp}</p>
                   </div>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed mb-3 line-clamp-2">"{post.content}"</p>
                <div className="flex items-center justify-between">
                   <span className="text-xs text-indigo-600 font-medium flex items-center gap-1">
                      <Users size={12} /> {post.prayerCount} prient
                   </span>
                   <button className="text-xs bg-white text-indigo-600 px-3 py-1.5 rounded-full font-bold shadow-sm border border-indigo-100">
                      Je prie pour vous
                   </button>
                </div>
             </div>
          ))}
          {prayers.length === 0 && <p className="text-sm text-gray-500 italic">Aucune requête récente.</p>}
        </div>
      </div>

      {/* Testimonials Preview */}
      <div className="mt-8 mb-6">
        <div className="flex justify-between items-center px-4 mb-3">
          <h3 className="font-bold text-gray-900 text-lg">✨ Témoignages</h3>
          <button onClick={() => onNavigate('community')} className="text-xs text-purple-600 font-bold">Voir tous</button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide snap-x snap-mandatory">
           {testimonials.map(post => (
             <div key={post.id} className="min-w-[260px] w-[260px] snap-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                     <img src={post.userAvatar} alt="" className="w-8 h-8 rounded-full" />
                     <span className="text-xs font-bold text-gray-900 truncate">{post.userName}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-2">
                     {post.content}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-gray-400 mt-2">
                   <div className="flex items-center gap-1 text-xs">
                      <Heart size={14} /> {post.likes}
                   </div>
                   <div className="flex items-center gap-1 text-xs">
                      <MessageCircle size={14} /> {post.comments}
                   </div>
                </div>
             </div>
           ))}
           {testimonials.length === 0 && <div className="px-4 text-sm text-gray-500 italic">Aucun témoignage récent.</div>}
        </div>
      </div>

      {/* Premium Banner */}
      {!user.isPremium && (
        <div className="px-4 mt-2">
          <div className="bg-gray-900 rounded-2xl p-6 text-center relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-3xl mb-2 block">👑</span>
              <h3 className="text-xl font-bold text-white mb-2">Passez à MEZAP Premium</h3>
              <p className="text-gray-400 text-sm mb-4">Accès illimité à tous les packs, mode hors-ligne et contenus exclusifs.</p>
              <Button size="sm" variant="white" className="font-bold text-purple-900">
                Essayer gratuitement
              </Button>
            </div>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-20" />
          </div>
        </div>
      )}
    </div>
  );
};