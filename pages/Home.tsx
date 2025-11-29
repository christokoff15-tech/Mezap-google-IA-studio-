import React from 'react';
import { Play, Bell, Info } from 'lucide-react';
import { Button } from '../components/Button';
import { PACKS } from '../constants';

interface HomeProps {
  onNavigate: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-30 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-900 tracking-tight">MEZAP TV</h1>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
          <Bell size={24} />
          <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>

      {/* Hero Video Section */}
      <div className="relative w-full aspect-video bg-gray-900 overflow-hidden">
        <img 
          src="https://picsum.photos/seed/worship/800/450" 
          alt="Featured Video" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">En Direct</span>
          <h2 className="text-white font-bold text-lg mb-1">Soirée de Miracles & Guérison</h2>
          <p className="text-gray-300 text-sm mb-3">Avec Pasteur Jean - Rejoignez-nous pour un temps fort.</p>
          <div className="flex gap-3">
             <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-200">
                <Play size={16} className="mr-1 fill-current" /> Regarder
             </Button>
             <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                <Info size={16} className="mr-1" /> Détails
             </Button>
          </div>
        </div>
      </div>

      {/* Proclamation of the Day */}
      <div className="p-4">
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 relative overflow-hidden shadow-sm">
           <div className="relative z-10">
             <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Proclamation du Jour</span>
             <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">"Je suis plus que vainqueur"</h3>
             <p className="text-gray-600 text-sm mb-3 italic">
               "Car tout ce qui est né de Dieu triomphe du monde; et la victoire qui triomphe du monde, c'est notre foi."
             </p>
             <button className="text-indigo-600 text-sm font-medium hover:underline">Écouter maintenant &rarr;</button>
           </div>
           <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-100 rounded-full opacity-50" />
        </div>
      </div>

      {/* Featured Packs Carousel (CTA to Marketplace) */}
      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800">Nouveautés Boutique</h3>
          <button onClick={() => onNavigate('market')} className="text-xs text-indigo-600 font-medium">Voir tout</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {PACKS.slice(0, 3).map((pack) => (
            <div key={pack.id} className="min-w-[160px] w-[160px] flex-shrink-0 cursor-pointer" onClick={() => onNavigate('market')}>
              <div className="aspect-square rounded-xl overflow-hidden mb-2 relative group">
                <img src={pack.coverImage} alt={pack.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white font-medium">
                  {pack.category}
                </div>
              </div>
              <h4 className="font-semibold text-sm text-gray-900 truncate">{pack.title}</h4>
              <p className="text-xs text-gray-500">{pack.price === 0 ? 'Gratuit' : `${pack.price} ${pack.currency}`}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Snippet */}
      <div className="px-4 py-4 bg-gray-50">
        <h3 className="font-bold text-gray-800 mb-3">Témoignages Récents</h3>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <div className="flex items-start gap-3">
              <img src="https://picsum.photos/seed/user4/50/50" alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm text-gray-600 line-clamp-2">"L'application a changé ma routine matinale. Je commence chaque journée avec paix et assurance."</p>
                <p className="text-xs font-medium text-gray-900 mt-1">- Sophie K.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
