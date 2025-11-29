import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { Button } from '../components/Button';

interface OnboardingProps {
  onLogin: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'intro' | 'auth'>('intro');

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 flex flex-col text-white p-6 relative overflow-hidden">
        <div className="flex-1 flex flex-col justify-center items-center text-center z-10">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20">
            <span className="text-4xl font-bold">M</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">MEZAP</h1>
          <p className="text-lg text-indigo-200 mb-8 max-w-xs">
            Votre compagnon spirituel quotidien pour des proclamations puissantes.
          </p>
          <div className="space-y-4 w-full max-w-xs">
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
               <Check className="text-green-400 flex-shrink-0" />
               <span className="text-sm text-left">Croissance spirituelle 24h/24</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
               <Check className="text-green-400 flex-shrink-0" />
               <span className="text-sm text-left">Proclamations audio guidées</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
               <Check className="text-green-400 flex-shrink-0" />
               <span className="text-sm text-left">Communauté de prière</span>
            </div>
          </div>
        </div>
        <div className="z-10 mt-8 mb-4">
          <Button 
            fullWidth 
            size="lg" 
            className="bg-white text-indigo-900 hover:bg-gray-100 font-bold"
            onClick={() => setStep('auth')}
          >
            Commencer
          </Button>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Bienvenue</h2>
        <p className="text-gray-500 mb-8">Connectez-vous pour accéder à vos proclamations.</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="email" 
                placeholder="votre@email.com" 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
          
          <Button fullWidth onClick={onLogin}>Se connecter</Button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-red-500 font-bold">G</span>
              <span className="ml-2 font-medium text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-blue-600 font-bold">f</span>
              <span className="ml-2 font-medium text-gray-700">Facebook</span>
            </button>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-gray-400 mt-6">
        En continuant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
      </p>
    </div>
  );
};
