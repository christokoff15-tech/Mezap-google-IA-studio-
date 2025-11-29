import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Lock, Smartphone } from 'lucide-react';
import { PACKS } from '../constants';
import { Pack } from '../types';
import { Button } from '../components/Button';

interface MarketplaceProps {
  onPurchase: (pack: Pack) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onPurchase }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tout');
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const categories = ['Tout', 'Foi', 'Guérison', 'Prospérité', 'Relations', 'Leadership'];
  
  const filteredPacks = selectedCategory === 'Tout' 
    ? PACKS 
    : PACKS.filter(p => p.category === selectedCategory);

  const handleBuyClick = (pack: Pack) => {
    setSelectedPack(pack);
    setPaymentModalOpen(true);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentModalOpen(false);
      if (selectedPack) onPurchase(selectedPack);
      setSelectedPack(null);
    }, 2000);
  };

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
          <div key={pack.id} className="flex flex-col">
            <div className="aspect-square rounded-xl overflow-hidden mb-2 relative bg-gray-200">
               <img src={pack.coverImage} alt={pack.title} className="w-full h-full object-cover" />
               <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur rounded-lg px-2 py-1 text-xs font-bold shadow-sm">
                 {pack.price} {pack.currency}
               </div>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{pack.title}</h3>
            <p className="text-xs text-gray-500 line-clamp-1 mb-2">{pack.description}</p>
            <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => handleBuyClick(pack)}>
               Acheter
            </Button>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedPack && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in slide-in-from-bottom-10">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Confirmer l'achat</h2>
              <button onClick={() => setPaymentModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                Fermer
              </button>
            </div>
            
            <div className="flex gap-4 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
               <img src={selectedPack.coverImage} className="w-16 h-16 rounded-lg object-cover" alt="" />
               <div>
                  <h3 className="font-semibold text-sm">{selectedPack.title}</h3>
                  <p className="text-indigo-600 font-bold">{selectedPack.price} {selectedPack.currency}</p>
               </div>
            </div>

            <div className="space-y-3">
               <button 
                 onClick={handlePayment}
                 disabled={isProcessing}
                 className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
               >
                 <div className="flex items-center gap-3">
                    <Smartphone className="text-gray-500 group-hover:text-indigo-600" />
                    <div className="text-left">
                       <p className="font-semibold text-sm">Mobile Money</p>
                       <p className="text-xs text-gray-500">CinetPay (Orange, MTN, Moov)</p>
                    </div>
                 </div>
                 <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-indigo-500" />
               </button>

               <button 
                 onClick={handlePayment}
                 disabled={isProcessing}
                 className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
               >
                 <div className="flex items-center gap-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Google_Play_2022_icon.svg" className="w-5 h-5" alt="Google Play" />
                    <div className="text-left">
                       <p className="font-semibold text-sm">Google Play</p>
                       <p className="text-xs text-gray-500">Achat intégré sécurisé</p>
                    </div>
                 </div>
                 <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-indigo-500" />
               </button>
            </div>

            {isProcessing && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
