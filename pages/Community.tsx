import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, Users, Lock, Plus } from 'lucide-react';
import { POSTS, GROUPS } from '../constants';
import { Button } from '../components/Button';

export const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wall' | 'groups'>('wall');

  return (
    <div className="pb-24 pt-4 px-0 bg-gray-50 min-h-screen">
      <div className="px-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Communauté</h1>
        <div className="flex p-1 bg-gray-200 rounded-xl">
           <button 
             onClick={() => setActiveTab('wall')}
             className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'wall' ? 'bg-white shadow text-indigo-900' : 'text-gray-600'}`}
           >
             Mur de Prière
           </button>
           <button 
             onClick={() => setActiveTab('groups')}
             className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'groups' ? 'bg-white shadow text-indigo-900' : 'text-gray-600'}`}
           >
             Groupes
           </button>
        </div>
      </div>

      {activeTab === 'wall' ? (
        <div className="space-y-4 px-4">
          {/* Post Input */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
             <div className="flex gap-3">
               <div className="w-10 h-10 bg-indigo-100 rounded-full flex-shrink-0" />
               <input 
                 type="text" 
                 placeholder="Partagez un témoignage ou une requête..." 
                 className="flex-1 bg-gray-50 rounded-full px-4 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300"
               />
             </div>
             <div className="flex justify-end mt-3 gap-2">
                <Button size="sm" variant="ghost">Témoignage</Button>
                <Button size="sm">Publier</Button>
             </div>
          </div>

          {/* Posts Feed */}
          {POSTS.map(post => (
            <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
               <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                     <img src={post.userAvatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                     <div>
                        <h4 className="font-semibold text-sm text-gray-900">{post.userName}</h4>
                        <span className="text-xs text-gray-400">{post.timestamp} • {post.type === 'priere' ? 'Requête' : 'Témoignage'}</span>
                     </div>
                  </div>
                  <button className="text-gray-400">...</button>
               </div>
               <p className="text-gray-800 text-sm mb-4 leading-relaxed">{post.content}</p>
               
               {post.type === 'priere' && (
                 <div className="mb-4">
                    <Button fullWidth size="sm" variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100">
                       🙏 Je prie pour vous
                    </Button>
                 </div>
               )}

               <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-gray-500">
                  <button className="flex items-center gap-1.5 text-xs hover:text-red-500 transition-colors">
                     <Heart size={16} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs hover:text-indigo-600 transition-colors">
                     <MessageCircle size={16} /> {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs hover:text-indigo-600 transition-colors">
                     <Share2 size={16} /> Partager
                  </button>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 px-4">
           {GROUPS.map(group => (
             <div key={group.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <img src={group.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{group.name}</h3>
                      {group.isPrivate && <Lock size={12} className="text-gray-400" />}
                   </div>
                   <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                      <Users size={12} /> {group.members} membres
                   </div>
                   <Button size="sm" variant="outline" className="h-8 text-xs w-24">Rejoindre</Button>
                </div>
             </div>
           ))}
           <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium flex items-center justify-center gap-2 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
              <Plus size={20} /> Créer un groupe
           </button>
        </div>
      )}
    </div>
  );
};
