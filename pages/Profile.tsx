import React, { useState } from 'react';
import { User, Settings, Award, Flame, BookOpen, Edit3, Save } from 'lucide-react';
import { MOCK_USER } from '../constants';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../components/Button';

const data = [
  { name: 'Lun', minutes: 20 },
  { name: 'Mar', minutes: 45 },
  { name: 'Mer', minutes: 30 },
  { name: 'Jeu', minutes: 15 },
  { name: 'Ven', minutes: 60 },
  { name: 'Sam', minutes: 10 },
  { name: 'Dim', minutes: 90 },
];

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'journal'>('stats');
  const [journalText, setJournalText] = useState('');

  return (
    <div className="pb-24 bg-white min-h-screen">
      {/* Header Profile */}
      <div className="bg-indigo-900 text-white pt-10 pb-16 px-6 rounded-b-[2.5rem] relative">
         <div className="flex justify-between items-start mb-6">
            <h1 className="text-xl font-bold">Mon Espace</h1>
            <Settings className="text-indigo-200" size={24} />
         </div>
         <div className="flex items-center gap-4">
            <div className="relative">
              <img src={MOCK_USER.avatar} alt="Profile" className="w-20 h-20 rounded-full border-4 border-indigo-800" />
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-indigo-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white">
                 NVL 12
              </div>
            </div>
            <div>
               <h2 className="text-xl font-bold">{MOCK_USER.name}</h2>
               <p className="text-indigo-200 text-sm">{MOCK_USER.email}</p>
            </div>
         </div>

         {/* Stats Cards floating */}
         <div className="absolute -bottom-10 left-6 right-6 flex justify-between bg-white rounded-xl shadow-lg p-4 text-gray-800">
            <div className="flex flex-col items-center flex-1 border-r border-gray-100">
               <div className="flex items-center gap-1 text-orange-500 font-bold text-lg">
                  <Flame size={20} fill="currentColor" /> {MOCK_USER.streak}
               </div>
               <span className="text-xs text-gray-400 uppercase tracking-wide">Jours streak</span>
            </div>
            <div className="flex flex-col items-center flex-1">
               <div className="flex items-center gap-1 text-indigo-600 font-bold text-lg">
                  <Award size={20} /> {MOCK_USER.points}
               </div>
               <span className="text-xs text-gray-400 uppercase tracking-wide">Points</span>
            </div>
         </div>
      </div>

      <div className="mt-16 px-4">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
           <button 
             onClick={() => setActiveTab('stats')}
             className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'stats' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400'}`}
           >
             Statistiques
           </button>
           <button 
             onClick={() => setActiveTab('journal')}
             className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'journal' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400'}`}
           >
             Journal Spirituel
           </button>
        </div>

        {activeTab === 'stats' ? (
          <div className="space-y-6 animate-in fade-in">
             <div>
                <h3 className="font-bold text-gray-800 mb-4">Temps d'écoute (min)</h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{fill: '#f3f4f6'}} />
                      <Bar dataKey="minutes" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </div>

             <div>
                <h3 className="font-bold text-gray-800 mb-3">Badges Obtenus</h3>
                <div className="grid grid-cols-3 gap-3">
                   {['Fidèle', 'Intercesseur', 'Mécène', 'Lève-tôt'].map((badge, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center gap-2 aspect-square border border-gray-100">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${idx < 2 ? 'bg-amber-100 text-amber-600' : 'bg-gray-200 text-gray-400'}`}>
                            <Award size={20} />
                         </div>
                         <span className={`text-xs font-medium ${idx < 2 ? 'text-gray-900' : 'text-gray-400'}`}>{badge}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in">
             <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                   <BookOpen className="text-yellow-600 mt-1" size={20} />
                   <div>
                      <h4 className="font-bold text-yellow-900 text-sm">Note du jour</h4>
                      <p className="text-xs text-yellow-800 mt-1">Qu'avez-vous reçu durant la proclamation d'aujourd'hui ?</p>
                   </div>
                </div>
             </div>
             
             <div className="relative">
                <textarea 
                  className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none bg-gray-50"
                  placeholder="Écrivez vos révélations ici..."
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                />
                <button className="absolute bottom-4 right-4 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-transform hover:scale-105">
                   <Save size={20} />
                </button>
             </div>

             <div className="space-y-3 mt-6">
                <h3 className="font-bold text-gray-800">Entrées précédentes</h3>
                {[1, 2].map((i) => (
                   <div key={i} className="border-l-4 border-indigo-200 pl-4 py-1">
                      <span className="text-xs text-gray-400 block mb-1">1{i} Octobre 2023</span>
                      <p className="text-sm text-gray-600 line-clamp-2">J'ai senti une paix profonde en écoutant le pack sur la guérison...</p>
                   </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
