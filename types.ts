export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  streak: number;
  points: number;
  badges: string[];
}

export interface Pack {
  id: string;
  title: string;
  category: 'Foi' | 'Guérison' | 'Prospérité' | 'Relations' | 'Leadership';
  price: number;
  currency: string;
  coverImage: string;
  description: string;
  tracks: Track[];
  isOwned?: boolean;
}

export interface Track {
  id: string;
  title: string;
  duration: string; // "MM:SS"
  url: string; // Placeholder URL
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  relatedTrackId?: string;
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
}

export interface Group {
  id: string;
  name: string;
  members: number;
  image: string;
  isPrivate: boolean;
}
