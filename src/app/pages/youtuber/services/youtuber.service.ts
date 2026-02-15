import { Injectable } from '@angular/core';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  views: string;
  date: string;
  duration: string;
}

@Injectable({
  providedIn: 'root',
})
export class YoutuberService {
  private videos: Video[] = [
    {
      id: 'dQw4w9WgXcQ',
      title: '🎮 Zenless Zone Zero - Ellen Joe Review & Build Guide',
      description: 'Ellen Joe es insana. En este video repasamos su kit completo, team synergies y cómo maximizar el damage en Zenless Zone Zero.',
      thumbnail: 'https://via.placeholder.com/400x225?text=Zenless+Zone+Zero',
      views: '324K views',
      date: '2 days ago',
      duration: '24:15',
    },
    {
      id: 'jNQXAC9IVRw',
      title: '⭐ Genshin Impact - Neuvillette Full Review 5.0',
      description: 'El piolet más roto de Genshin. Analizamos el damage potential, rotations y si vale la pena hacer pulls por él.',
      thumbnail: 'https://via.placeholder.com/400x225?text=Genshin+Impact+Neuvillette',
      views: '456K views',
      date: '5 days ago',
      duration: '28:42',
    },
    {
      id: '9bZkp7q19f0',
      title: '🌟 Honkai Star Rail - Firefly DPS Guide',
      description: 'Firefly es la DPS que estábamos esperando. Comparamos builds, relics y teams para maximizar su potencial.',
      thumbnail: 'https://via.placeholder.com/400x225?text=Honkai+Star+Rail+Firefly',
      views: '289K views',
      date: '1 week ago',
      duration: '22:50',
    },
    {
      id: '2Xc_qfS0HLs',
      title: '💜 Recopilación de 50/50 Perdidos - Compilation 2024',
      description: 'Todos nuestros 50/50 perdidos compilados en un video. Risa, llanto y más 50/50 perdidos. La experiencia de un collector.',
      thumbnail: 'https://via.placeholder.com/400x225?text=50+50+Perdidos',
      views: '578K views',
      date: '2 weeks ago',
      duration: '31:20',
    },
    {
      id: 'kJQDxkshed0',
      title: '🎯 Genshin 4.7 - Nuevos personajes y armas tier list',
      description: 'Análisis completo de todos los nuevos personajes y armas para la versión 4.7. ¿Quién ocupa el primer lugar?',
      thumbnail: 'https://via.placeholder.com/400x225?text=Genshin+4.7+Tier+List',
      views: '412K views',
      date: '2 weeks ago',
      duration: '26:35',
    },
    {
      id: 'CsHiG-43Fzg',
      title: '👑 Zenless Zone Zero - Tier Ranking de personajes S2',
      description: 'Ranking actualizado de todos los personajes en ZZZ. Analizamos DPS, Stun y Support tiers actuales.',
      thumbnail: 'https://via.placeholder.com/400x225?text=ZZZ+Tier+Ranking',
      views: '267K views',
      date: '3 weeks ago',
      duration: '19:45',
    },
  ];

  constructor() {}

  getLatestVideos(): Video[] {
    return this.videos;
  }

  getVideoById(id: string): Video | undefined {
    return this.videos.find((video) => video.id === id);
  }
}
