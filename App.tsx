import React, { useState, useEffect } from 'react';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { Library } from './pages/Library';
import { Community } from './pages/Community';
import { Profile } from './pages/Profile';
import { PackDetails } from './pages/PackDetails';
import { AdminDashboard } from './pages/AdminDashboard';
import { PaymentScreen } from './pages/PaymentScreen';
import { Navigation } from './components/Navigation';
import { Player } from './components/Player';
import { Chatbot } from './components/Chatbot';
import { SocialFloating } from './components/SocialFloating';
import { VideoPlayerScreen } from './pages/VideoPlayerScreen';
import { Track, Pack, User } from './types';
import { GUEST_USER, MOCK_USER, PACKS } from './constants';
import { WifiOff } from 'lucide-react';

// Simulated Splash Screen
const SplashScreen = () => (
  <div className="fixed inset-0 bg-purple-600 flex items-center justify-center z-50 animate-fade-in">
    <div className="text-white flex flex-col items-center">
      <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl animate-bounce">
         <span className="text-4xl font-bold text-purple-600">M</span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight">MEZAP</h1>
      <p className="text-purple-200 mt-2 text-sm uppercase tracking-widest font-medium">Proclamation Authentique</p>
    </div>
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // Offline & Download State
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [downloadedPackIds, setDownloadedPackIds] = useState<Set<string>>(new Set());

  // Navigation & Transaction State
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedPackForDetails, setSelectedPackForDetails] = useState<Pack | null>(null);
  const [packToBuy, setPackToBuy] = useState<Pack | null>(null);
  
  // Media State
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Simulate initialization check
    const init = async () => {
      // Check local storage for user or onboarding status
      const hasSeenOnboarding = localStorage.getItem('mezap_onboarding');
      const savedDownloads = localStorage.getItem('mezap_downloads');
      
      if (savedDownloads) {
        setDownloadedPackIds(new Set(JSON.parse(savedDownloads)));
      }
      
      setTimeout(() => {
        if (!hasSeenOnboarding) {
          setShowOnboarding(true);
        } else {
          // Default to Guest if no user persistence logic for this demo
          setCurrentUser(GUEST_USER);
        }
        setLoading(false);
      }, 2500); // Splash duration
    };
    init();
  }, []);

  const handleOnboardingComplete = (mode: 'guest' | 'auth') => {
    localStorage.setItem('mezap_onboarding', 'true');
    setShowOnboarding(false);
    if (mode === 'auth') {
      setCurrentUser(MOCK_USER); // Simulate login
    } else {
      setCurrentUser(GUEST_USER);
    }
  };

  const handleLogin = () => {
    // Simulate login flow from guest mode
    const isConfirm = window.confirm("Simulation: Voulez-vous vous connecter en tant que Esther Grace ?");
    if (isConfirm) setCurrentUser(MOCK_USER);
  };

  const handleToggleDownload = (packId: string) => {
    const next = new Set(downloadedPackIds);
    if (next.has(packId)) {
      next.delete(packId);
    } else {
      next.add(packId);
    }
    setDownloadedPackIds(next);
    localStorage.setItem('mezap_downloads', JSON.stringify(Array.from(next)));
  };

  const handleOpenPackDetails = (pack: Pack) => {
    setSelectedPackForDetails(pack);
    window.scrollTo(0,0);
  };

  const handleInitiatePurchase = (pack: Pack) => {
    setPackToBuy(pack);
  };

  const handlePurchaseSuccess = (pack: Pack) => {
    if (!currentUser) return;
    
    // Add pack to user library
    const updatedUser = {
      ...currentUser,
      library: [...currentUser.library, pack.id]
    };
    setCurrentUser(updatedUser);
    setPackToBuy(null);
  };

  const handlePlayAudioFromPack = (pack: Pack) => {
    const track: Track = {
      id: pack.id,
      title: pack.title,
      duration: pack.audioDuration,
      url: pack.audioUrl,
      author: pack.author,
      coverImage: pack.coverImage,
      transcription: pack.textContent,
      verses: pack.verses
    };
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayVideo = (url: string) => {
    if (isOfflineMode) {
      alert("La lecture vidéo n'est pas disponible en mode hors-ligne.");
      return;
    }
    setCurrentVideoUrl(url);
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setSelectedPackForDetails(null); 
    window.scrollTo(0,0);
  };

  const renderContent = () => {
    if (isAdminMode) {
      return <AdminDashboard onExit={() => setIsAdminMode(false)} />;
    }

    if (!currentUser) return null;

    // Check if we are showing pack details
    if (selectedPackForDetails) {
      const isOwned = currentUser.library.includes(selectedPackForDetails.id);
      const isDownloaded = downloadedPackIds.has(selectedPackForDetails.id);
      
      return (
        <PackDetails 
          pack={selectedPackForDetails}
          onBack={() => setSelectedPackForDetails(null)}
          onPlayAudio={handlePlayAudioFromPack}
          onPlayVideo={handlePlayVideo}
          onBuy={() => handleInitiatePurchase(selectedPackForDetails)}
          isPremium={currentUser.isPremium}
          isOwned={isOwned}
          isDownloaded={isDownloaded}
          isOffline={isOfflineMode}
          onToggleDownload={() => handleToggleDownload(selectedPackForDetails.id)}
        />
      );
    }

    // Filter packs owned by user for Library
    const userPacks = PACKS.filter(p => currentUser.library.includes(p.id) || p.isFree);

    switch (currentTab) {
      case 'home':
        return (
          <Home 
            user={currentUser} 
            onNavigate={handleTabChange} 
            onSelectPack={handleOpenPackDetails} 
            onPlayVideo={handlePlayVideo}
            onLogin={handleLogin} 
            isOffline={isOfflineMode}
          />
        );
      case 'market':
        return <Marketplace onPurchase={handleOpenPackDetails} onPlayVideo={handlePlayVideo} />;
      case 'library':
        return (
          <Library 
            packs={userPacks} 
            onPlay={handleOpenPackDetails} 
            downloadedIds={downloadedPackIds}
            onToggleDownload={handleToggleDownload}
            isOffline={isOfflineMode}
          />
        );
      case 'community':
        return <Community />;
      case 'profile':
        return <Profile onAdminClick={() => setIsAdminMode(true)} />;
      default:
        return (
          <Home 
            user={currentUser} 
            onNavigate={handleTabChange} 
            onSelectPack={handleOpenPackDetails} 
            onPlayVideo={handlePlayVideo}
            onLogin={handleLogin} 
            isOffline={isOfflineMode}
          />
        );
    }
  };

  if (loading) return <SplashScreen />;

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="flex justify-center min-h-screen bg-black font-sans">
      <div className="w-full sm:max-w-md bg-white min-h-screen relative shadow-2xl flex flex-col sm:rounded-3xl sm:my-8 overflow-hidden">
        
        {/* Network Toggle Simulation */}
        <div 
          className={`absolute top-0 left-0 right-0 h-1 z-50 ${isOfflineMode ? 'bg-red-500' : 'bg-green-500'}`} 
          onClick={() => setIsOfflineMode(!isOfflineMode)}
          title="Toggle Network Simulation"
        />
        
        {isOfflineMode && (
          <div className="bg-gray-800 text-white text-xs py-1 px-4 flex items-center justify-center gap-2 sticky top-0 z-50">
             <WifiOff size={12} /> Mode Hors-ligne activé
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-hide bg-gray-50 pb-20">
          {renderContent()}
        </main>

        {/* Modals & Overlays */}
        {!selectedPackForDetails && !isAdminMode && !packToBuy && <Chatbot />}
        {!selectedPackForDetails && !isAdminMode && !packToBuy && <SocialFloating />}

        {packToBuy && (
          <PaymentScreen 
            pack={packToBuy} 
            onClose={() => setPackToBuy(null)} 
            onSuccess={handlePurchaseSuccess} 
          />
        )}

        {/* Global Player */}
        {!isAdminMode && (
          <Player 
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onClose={() => setCurrentTrack(null)}
            onNext={() => {}} 
            onPrev={() => {}} 
          />
        )}

        {/* Full Screen Video Player */}
        {currentVideoUrl && (
          <VideoPlayerScreen 
            videoUrl={currentVideoUrl} 
            onClose={() => setCurrentVideoUrl(null)} 
          />
        )}

        {/* Bottom Navigation */}
        {!selectedPackForDetails && !isAdminMode && (
          <Navigation currentTab={currentTab} onTabChange={handleTabChange} />
        )}
      </div>
    </div>
  );
}