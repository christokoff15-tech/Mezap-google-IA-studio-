import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, FileAudio, ShieldAlert, 
  Bell, TrendingUp, DollarSign, Activity, 
  Search, Edit, Trash2, CheckCircle, XCircle, 
  LogOut, Plus, Play, MoreVertical, Settings 
} from 'lucide-react';
import { PACKS, POSTS, MEZAP_TV_PLAYLIST, MOCK_USER } from '../constants';
import { Pack, Post } from '../types';
import { Button } from '../components/Button';

interface AdminDashboardProps {
  onExit: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'users' | 'moderation'>('overview');
  
  // Mock Data for Admin
  const stats = [
    { title: 'Utilisateurs Totaux', value: '12,450', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { title: 'Revenus Mensuels', value: '4,200€', change: '+8%', icon: DollarSign, color: 'bg-green-500' },
    { title: 'Écoutes Actives', value: '854', change: '+24%', icon: Activity, color: 'bg-purple-500' },
    { title: 'Nouveaux Abonnés', value: '145', change: '+5%', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const renderSidebar = () => (
    <div className="w-20 lg:w-64 bg-slate-900 text-white flex flex-col h-full transition-all duration-300">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold">A</div>
        <span className="font-bold text-lg hidden lg:block">Admin Panel</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-purple-600' : 'hover:bg-slate-800 text-slate-400'}`}
        >
          <LayoutDashboard size={20} />
          <span className="hidden lg:block font-medium">Vue d'ensemble</span>
        </button>
        <button 
          onClick={() => setActiveTab('content')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'content' ? 'bg-purple-600' : 'hover:bg-slate-800 text-slate-400'}`}
        >
          <FileAudio size={20} />
          <span className="hidden lg:block font-medium">Contenus</span>
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'users' ? 'bg-purple-600' : 'hover:bg-slate-800 text-slate-400'}`}
        >
          <Users size={20} />
          <span className="hidden lg:block font-medium">Utilisateurs</span>
        </button>
        <button 
          onClick={() => setActiveTab('moderation')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'moderation' ? 'bg-purple-600' : 'hover:bg-slate-800 text-slate-400'}`}
        >
          <ShieldAlert size={20} />
          <span className="hidden lg:block font-medium">Modération</span>
        </button>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={onExit}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={20} />
          <span className="hidden lg:block font-medium">Quitter Admin</span>
        </button>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6 animate-in fade-in">
      <h2 className="text-2xl font-bold text-gray-800">Tableau de bord</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                  <Icon className={stat.color.replace('bg-', 'text-')} size={24} />
                </div>
                <span className="text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-500 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Activité Récente</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                  JP
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Jean Pierre a acheté "Guérison Divine"</p>
                  <p className="text-xs text-gray-500">Il y a 2 minutes</p>
                </div>
                <span className="ml-auto font-bold text-green-600">+50€</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm bg-gradient-to-br from-purple-900 to-indigo-900 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Bell size={20} /> Push Notifications
            </h3>
            <p className="text-purple-200 text-sm mb-4">Envoyer une notification "Proclamation du Jour" à tous les utilisateurs.</p>
            <textarea 
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm text-white placeholder-purple-300 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
              rows={3}
              placeholder="Message de la notification..."
              defaultValue="🔥 Nouvelle proclamation disponible : La victoire est à vous !"
            />
            <Button size="sm" variant="white" className="text-purple-900 font-bold">
              Envoyer à tous (12k)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Contenus</h2>
        <Button size="sm"><Plus size={18} className="mr-2" /> Nouveau Pack</Button>
      </div>

      {/* Packs Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
           <h3 className="font-bold text-gray-700">Bibliothèque Audio ({PACKS.length})</h3>
           <div className="flex gap-2">
             <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input type="text" placeholder="Rechercher..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none" />
             </div>
           </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="p-4">Titre</th>
              <th className="p-4">Catégorie</th>
              <th className="p-4">Prix</th>
              <th className="p-4">Statut</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {PACKS.map((pack) => (
              <tr key={pack.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={pack.coverImage} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{pack.title}</p>
                      <p className="text-xs text-gray-500">{pack.author}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-bold">{pack.category}</span>
                </td>
                <td className="p-4 text-sm font-medium">
                  {pack.isFree ? 'Gratuit' : `${pack.price} ${pack.currency}`}
                </td>
                <td className="p-4">
                  <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                    <CheckCircle size={14} /> Actif
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MEZAP TV Manager */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Play size={20} className="text-red-600" /> Gestion MEZAP TV
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
           {MEZAP_TV_PLAYLIST.map((video, idx) => (
             <div key={video.id} className="group relative aspect-video bg-gray-100 rounded-xl overflow-hidden border-2 border-transparent hover:border-purple-500 transition-all cursor-pointer">
                <img src={video.thumbnail} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-white font-bold text-xs">Modifier</span>
                </div>
                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                   #{idx + 1}
                </div>
             </div>
           ))}
           <button className="aspect-video border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-purple-600 hover:border-purple-400 transition-colors">
              <Plus size={24} className="mb-2" />
              <span className="text-xs font-bold">Ajouter Vidéo</span>
           </button>
        </div>
      </div>
    </div>
  );

  const renderModeration = () => (
    <div className="space-y-6 animate-in fade-in">
       <h2 className="text-2xl font-bold text-gray-800">Modération</h2>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Pending Posts */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                   <ShieldAlert size={20} className="text-orange-500" /> En attente de validation
                </h3>
                <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-bold">3 nouveaux</span>
             </div>
             
             <div className="space-y-4">
                {POSTS.map((post) => (
                   <div key={post.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                         <div className="flex items-center gap-2">
                            <img src={post.userAvatar} className="w-6 h-6 rounded-full" alt="" />
                            <span className="text-xs font-bold text-gray-700">{post.userName}</span>
                         </div>
                         <span className="text-[10px] text-gray-400">{post.type.toUpperCase()}</span>
                      </div>
                      <p className="text-sm text-gray-600 italic mb-3">"{post.content}"</p>
                      <div className="flex gap-2">
                         <Button size="xs" variant="primary" className="bg-green-600 hover:bg-green-700 text-white border-none shadow-none">
                            Approuver
                         </Button>
                         <Button size="xs" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            Rejeter
                         </Button>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Reported Users */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-gray-800 mb-4">Utilisateurs Signalés</h3>
             <div className="text-center py-10 text-gray-400">
                <CheckCircle size={48} className="mx-auto mb-2 text-green-200" />
                <p>Aucun signalement actif.</p>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {renderSidebar()}
      
      <main className="flex-1 overflow-y-auto p-6 lg:p-10">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'content' && renderContent()}
        {activeTab === 'users' && <div className="flex items-center justify-center h-full text-gray-400">Gestion Utilisateurs (Module à venir)</div>}
        {activeTab === 'moderation' && renderModeration()}
      </main>
    </div>
  );
};