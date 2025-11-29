
export interface User {
  id: string;
  name: string;
  email: string | null;
  avatar: string;
  streak: number;
  points: number;
  badges: string[];
  isGuest: boolean;
  isPremium: boolean;
  library: string[]; // Array of Pack IDs
}

// Updated structure based on request: 1 Video, 1 Audio, 1 Text
export interface Pack {
  id: string;
  title: string;
  author: string;
  category: 'Foi' | 'Guérison' | 'Prospérité' | 'Relations' | 'Leadership';
  price: number;
  currency: string;
  coverImage: string;
  rating?: number;
  isFree?: boolean;
  isNew?: boolean;
  description?: string;

  // Structure Components
  descriptionVideoUrl: string; // Vidéo de description/explication
  audioUrl: string;            // Le fichier audio
  audioDuration: string;       // Durée de l'audio
  textContent: string;         // Le texte de la proclamation
  verses?: Verse[];           // Optional context verses
}

// Track interface kept for the Player component state
export interface Track {
  id: string;
  title: string;
  duration: string; // "MM:SS"
  url: string; 
  author?: string;      // Added for context in player
  coverImage?: string;  // Added for context in player
  transcription?: string;
  verses?: Verse[];
}

export interface Verse {
  reference: string;
  text: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  relatedPackId?: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  type: 'temoignage' | 'priere';
  likes: number;
  comments: number;
  timestamp: string;
  prayerCount?: number;
}

export interface Group {
  id: string;
  name: string;
  members: number;
  image: string;
  isPrivate: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
