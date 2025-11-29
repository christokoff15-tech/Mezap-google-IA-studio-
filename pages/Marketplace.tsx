import React, { useState } from 'react';
import { Search, Filter, Smartphone } from 'lucide-react';
import { PACKS } from '../constants';
import { Pack } from '../types';
import { PackCard } from '../components/PackCard';

interface MarketplaceProps {
  onPurchase: (pack: Pack) => void;
  onPlayVideo: (url: string) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onPurchase, onPlayVideo }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tout');
  // We can keep the payment logic here or move it to details, 
  // but for this update, onPress triggers the details view passed via onPurchase prop
  
  const categories = ['Tout', 'Foi', 'Guérison', 'Prospérité', 'Relations', 'Leadership'];
  
  const filteredPacks = selectedCategory === 'Tout' 
    ? PACKS 
    : PACKS.filter(p => p.category === selectedCategory);

  return (
    <div className="pb-24 pt-4 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Boutique</h1>
      
      {/* Search & Filter */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button className="p-2.5 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200">
          <Filter size={18} />
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredPacks.map(pack => (
          <PackCard 
            key={pack.id} 
            pack={pack} 
            onPress={() => onPurchase(pack)} 
            onPlayVideo={onPlayVideo}
          />
        ))}
      </div>
    </div>
  );
};