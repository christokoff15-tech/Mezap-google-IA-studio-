import { Pack, Post, Group, User } from './types';
import React from 'react';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Esther Grace',
  email: 'esther@example.com',
  avatar: 'https://picsum.photos/seed/user1/100/100',
  streak: 12,
  points: 450,
  badges: ['Fidèle', 'Intercesseur']
};

export const PACKS: Pack[] = [
  {
    id: 'p1',
    title: 'Fondements de la Foi',
    category: 'Foi',
    price: 4.99,
    currency: 'EUR',
    coverImage: 'https://picsum.photos/seed/foi/400/400',
    description: 'Bâtissez une foi inébranlable avec ces proclamations puissantes.',
    tracks: [
      { id: 't1', title: 'Je crois en Dieu', duration: '03:45', url: '#' },
      { id: 't2', title: 'La montagne se déplace', duration: '05:12', url: '#' },
    ]
  },
  {
    id: 'p2',
    title: 'Guérison Divine',
    category: 'Guérison',
    price: 3000,
    currency: 'XOF',
    coverImage: 'https://picsum.photos/seed/heal/400/400',
    description: 'Proclamations pour la santé du corps et de l\'âme.',
    tracks: [
      { id: 't3', title: 'Par ses meurtrissures', duration: '04:20', url: '#' },
      { id: 't4', title: 'Santé parfaite', duration: '06:00', url: '#' },
    ]
  },
  {
    id: 'p3',
    title: 'Leadership Spirituel',
    category: 'Leadership',
    price: 9.99,
    currency: 'EUR',
    coverImage: 'https://picsum.photos/seed/leader/400/400',
    description: 'Pour les pasteurs et leaders d\'influence.',
    tracks: [
      { id: 't5', title: 'Vision claire', duration: '08:15', url: '#' },
      { id: 't6', title: 'Sagesse de Salomon', duration: '05:30', url: '#' },
    ]
  },
    {
    id: 'p4',
    title: 'Prospérité du Royaume',
    category: 'Prospérité',
    price: 5000,
    currency: 'XOF',
    coverImage: 'https://picsum.photos/seed/money/400/400',
    description: 'Activer les bénédictions financières selon la parole.',
    tracks: [
      { id: 't7', title: 'Tête et non queue', duration: '03:10', url: '#' },
      { id: 't8', title: 'Abondance', duration: '04:45', url: '#' },
    ]
  }
];

export const POSTS: Post[] = [
  {
    id: 'post1',
    userId: 'u2',
    userName: 'Jean Baptiste',
    userAvatar: 'https://picsum.photos/seed/u2/100/100',
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
    userAvatar: 'https://picsum.photos/seed/u3/100/100',
    content: 'Priez pour mon fils qui passe son examen demain. Merci la famille MEZAP.',
    type: 'priere',
    likes: 89,
    comments: 120,
    timestamp: 'Il y a 5h'
  }
];

export const GROUPS: Group[] = [
  { id: 'g1', name: 'Intercesseurs du Matin', members: 1240, image: 'https://picsum.photos/seed/g1/100/100', isPrivate: false },
  { id: 'g2', name: 'Femmes de Valeur', members: 850, image: 'https://picsum.photos/seed/g2/100/100', isPrivate: true },
  { id: 'g3', name: 'Jeunesse en Feu', members: 300, image: 'https://picsum.photos/seed/g3/100/100', isPrivate: false },
];
