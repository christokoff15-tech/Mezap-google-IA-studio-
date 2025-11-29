import React, { useState, useEffect } from 'react';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { Library } from './pages/Library';
import { Community } from './pages/Community';
import { Profile } from './pages/Profile';
import { Navigation } from './components/Navigation';
import { Player } from './components/Player';
import { Track, Pack } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTab, setCurrentTab] = useState('home');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Mock library with one initial track
  const [myTracks, setMyTracks] = useState<Track[]>([
    { id: 'demo1', title: 'Bienvenue sur MEZAP', duration: '01:30', url: '#' }
  ]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handlePurchase = (pack: Pack) => {
    // Add tracks to library
    const newTracks = pack.tracks;
    setMyTracks(prev => [...prev, ...newTracks]);
    alert(`Merci ! Le pack "${pack.title}" a été ajouté à votre bibliothèque.`);
  };

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home onNavigate={setCurrentTab} />;
      case 'market':
        return <Marketplace onPurchase={handlePurchase} />;
      case 'library':
        return <Library tracks={myTracks} onPlay={handlePlayTrack} />;
      case 'community':
        return <Community />;
      case 'profile':
        return <Profile />;
      default:
        return <Home onNavigate={setCurrentTab} />;
    }
  };

  if (!isAuthenticated) {
    return <Onboarding onLogin={handleLogin} />;
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 font-sans">
      {/* Simulation of mobile device wrapper on desktop, full width on mobile */}
      <div className="w-full max-w-lg bg-white min-h-screen relative shadow-2xl flex flex-col">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {renderContent()}
        </main>

        {/* Floating Player */}
        {currentTrack && (
          <Player 
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayPause={togglePlayPause}
            onClose={() => setCurrentTrack(null)}
            onNext={() => {}} // Mock next
            onPrev={() => {}} // Mock prev
          />
        )}

        {/* Bottom Navigation */}
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </div>
  );
}
