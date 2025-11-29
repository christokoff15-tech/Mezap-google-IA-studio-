import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/Button';

interface OnboardingProps {
  onComplete: (mode: 'guest' | 'auth') => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "Bienvenue sur MEZAP",
      desc: "Votre sanctuaire numérique pour une croissance spirituelle quotidienne.",
      color: "bg-purple-600",
      image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "MEZAP TV",
      desc: "Des proclamations et enseignements en continu, 24h/24 pour édifier votre foi.",
      color: "bg-blue-600",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Communauté de Prière",
      desc: "Rejoignez des milliers de chrétiens. Partagez, priez et témoignez ensemble.",
      color: "bg-indigo-600",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      // Show auth choice
      setStep(3);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-white flex flex-col p-6 animate-fade-in">
        <div className="flex-1 flex flex-col justify-end pb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl text-white">
            <span className="text-3xl font-bold">M</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prêt à commencer ?</h1>
          <p className="text-gray-500 mb-8">Créez un compte pour sauvegarder votre progression ou explorez librement.</p>

          <div className="space-y-3">
            <Button fullWidth onClick={() => onComplete('auth')} size="lg">
              Créer un compte
            </Button>
            <Button fullWidth variant="outline" onClick={() => onComplete('auth')} size="lg">
              Se connecter
            </Button>
            <div className="my-2 flex items-center justify-center">
              <span className="text-gray-400 text-sm">ou</span>
            </div>
            <button 
              onClick={() => onComplete('guest')}
              className="w-full py-4 text-gray-600 font-medium hover:text-purple-600 transition-colors"
            >
              Continuer en mode Invité
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen relative flex flex-col bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={slides[step].image} 
          alt="Onboarding" 
          className="w-full h-full object-cover opacity-60 transition-opacity duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end p-8 pb-12">
        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium mb-6 w-fit border border-white/10">
          Étape {step + 1} sur 3
        </span>
        
        <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
          {slides[step].title}
        </h2>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          {slides[step].desc}
        </p>

        {/* Indicators */}
        <div className="flex gap-2 mb-8">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} 
            />
          ))}
        </div>

        <Button 
          onClick={handleNext}
          className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl border-none"
          size="lg"
        >
          {step === slides.length - 1 ? 'Commencer' : 'Suivant'}
          <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>
    </div>
  );
};