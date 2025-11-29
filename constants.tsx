
import { Pack, Post, Group, User, ChatMessage } from './types';

export const GUEST_USER: User = {
  id: 'guest',
  name: 'Invité',
  email: null,
  avatar: 'https://ui-avatars.com/api/?name=Invité&background=random',
  streak: 0,
  points: 0,
  badges: [],
  isGuest: true,
  isPremium: false,
  library: []
};

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Esther Grace',
  email: 'esther@example.com',
  avatar: 'https://i.pravatar.cc/150?u=esther',
  streak: 12,
  points: 450,
  badges: ['Fidèle', 'Intercesseur'],
  isGuest: false,
  isPremium: true,
  library: ['p1', 'p2']
};

export const PACKS: Pack[] = [
  {
    id: 'p1',
    title: 'Fondements de la Foi',
    author: 'Pasteur Chris',
    category: 'Foi',
    price: 0,
    isFree: true,
    currency: 'EUR',
    coverImage: 'https://images.unsplash.com/photo-1507692049790-de58293a4697?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    description: 'Une série de proclamations pour bâtir une foi solide et inébranlable.',
    
    // Structure: Video, Audio, Text
    descriptionVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    audioUrl: '#',
    audioDuration: '03:45',
    textContent: 'Je déclare aujourd\'hui que ma foi est inébranlable. Je ne marche pas par la vue, mais par la foi. Tout ce que je lie sur terre est lié dans les cieux.',
    verses: [{ reference: 'Marc 11:23', text: 'Si quelqu\'un dit à cette montagne...' }]
  },
  {
    id: 'p2',
    title: 'Guérison Divine',
    author: 'Prophétesse Sarah',
    category: 'Guérison',
    price: 5000,
    currency: 'XOF',
    coverImage: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    description: 'Recevez la guérison divine et la santé parfaite par la puissance de la Parole.',

    descriptionVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    audioUrl: '#',
    audioDuration: '06:00',
    textContent: 'Par ses meurtrissures, je suis guéri. Aucune maladie ne peut subsister dans mon corps qui est le temple du Saint-Esprit. Je reçois la vie de Dieu en moi maintenant.',
    verses: [{ reference: 'Ésaïe 53:5', text: 'Mais il était blessé pour nos péchés...' }]
  },
  {
    id: 'p3',
    title: 'Leadership Spirituel',
    author: 'Bishop Tudor',
    category: 'Leadership',
    price: 9.99,
    currency: 'EUR',
    coverImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop',
    rating: 4.7,
    description: 'Développez votre leadership avec sagesse et intégrité spirituelle.',

    descriptionVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    audioUrl: '#',
    audioDuration: '08:15',
    textContent: 'Je suis la tête et non la queue. Dieu m\'a donné un esprit de force, d\'amour et de sagesse. Je dirige avec humilité et vision.',
  },
  {
    id: 'p4',
    title: 'Prospérité du Royaume',
    author: 'Apôtre Paul',
    category: 'Prospérité',
    price: 5000,
    currency: 'XOF',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1000&auto=format&fit=crop',
    rating: 4.6,
    description: 'Les principes du Royaume pour une prospérité intégrale et bénie.',

    descriptionVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    audioUrl: '#',
    audioDuration: '04:45',
    textContent: 'L\'Éternel est mon berger, je ne manquerai de rien. L\'abondance est mon partage. Je suis béni pour bénir les nations.',
  }
];

export const POSTS: Post[] = [
  {
    id: 'post1',
    userId: 'u2',
    userName: 'Jean Baptiste',
    userAvatar: 'https://i.pravatar.cc/150?u=jean',
    content: 'Gloire à Dieu ! Après 21 jours de proclamations sur la guérison, j\'ai reçu mon miracle médical ce matin.',
    type: 'temoignage',
    likes: 124,
    comments: 45,
    timestamp: 'Il y a 2h'
  },
  {
    id: 'post2',
    userId: 'u3',
    userName: 'Marie Claire',
    userAvatar: 'https://i.pravatar.cc/150?u=marie',
    content: 'Priez pour mon fils qui passe son examen demain. Merci la famille MEZAP.',
    type: 'priere',
    likes: 89,
    comments: 120,
    timestamp: 'Il y a 5h',
    prayerCount: 230
  }
];

export const GROUPS: Group[] = [
  {
    id: 'g1',
    name: 'Guerriers de Prière',
    members: 1250,
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop',
    isPrivate: false
  },
  {
    id: 'g2',
    name: 'Femmes de Foi',
    members: 890,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop',
    isPrivate: true
  },
  {
    id: 'g3',
    name: 'Jeunes en Christ',
    members: 3400,
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000&auto=format&fit=crop',
    isPrivate: false
  }
];

export const MEZAP_TV_PLAYLIST = [
  {
    id: 'v1',
    title: 'Louange Matinale Intense',
    thumbnail: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=300&auto=format&fit=crop',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'v2',
    title: 'Enseignement: La Foi qui déplace les montagnes',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    id: 'v3',
    title: 'Témoignage Impactant',
    thumbnail: 'https://images.unsplash.com/photo-1507692049790-de58293a4697?q=80&w=300&auto=format&fit=crop',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Volcano.mp4'
  }
];

export const CHAT_INITIAL_MESSAGE: ChatMessage = {
  id: 'init',
  text: 'Bonjour ! Je suis l\'assistant spirituel MEZAP. Comment puis-je vous aider aujourd\'hui ?',
  sender: 'bot',
  timestamp: new Date()
};

export const DAILY_PROCLAMATION = {
  title: "Je suis plus que vainqueur",
  verse: "Romains 8:37",
  text: "Mais dans toutes ces choses nous sommes plus que vainqueurs par celui qui nous a aimés.",
  audioUrl: "#"
};
