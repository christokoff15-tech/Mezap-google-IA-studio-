import React from 'react';
import { Facebook } from 'lucide-react';

export const SocialFloating: React.FC = () => {
  return (
    <div className="fixed top-1/2 right-0 -translate-y-1/2 z-40 flex flex-col gap-3 translate-x-2 hover:translate-x-0 transition-transform">
      <a href="#" className="bg-[#1877F2] text-white p-2.5 rounded-l-xl shadow-lg hover:pr-4 transition-all">
        <Facebook size={20} />
      </a>
      <a href="#" className="bg-black text-white p-2.5 rounded-l-xl shadow-lg hover:pr-4 transition-all flex items-center justify-center">
         <span className="font-bold text-xs">Tk</span>
      </a>
    </div>
  );
};