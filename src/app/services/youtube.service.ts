import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private apiKey = 'AIzaSyD_U071NlLDHUrTl-0WQEXLw2plu4_jnb4';
  private andriuChannelId = 'UCpP1Ki0BltI_ecCXWVus_nA';
  private baseUrl = 'https://www.googleapis.com/youtube/v3';
  private areMocksAvailable = false;
  constructor(private http: HttpClient) {}

  getLatestVideos(searchQuery?: string, maxResults = 5) {
    let params = new HttpParams().set('key', this.apiKey).set('channelId', this.andriuChannelId).set('part', 'snippet').set('order', 'date').set('maxResults', maxResults).set('type', 'video');

    if (searchQuery) {
      params = params.set('q', searchQuery);
    }
    const url = `${this.baseUrl}/search`;
    return (this.areMocksAvailable ? of(getLatesVideosMock) : this.http.get(url, { params })).pipe(
      map((res: any) =>
        res.items.map((item: any) => ({
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium.url,
          videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          publishedAt: item.snippet.publishedAt,
          videoId: item.id.videoId,
        }))
      )
    );
  }
}

export interface YoutubeVideo {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  publishedAt: string;
  videoId: string;
}

export const getLatesVideosMock = {
  kind: 'youtube#searchListResponse',
  etag: '-n0yCxVPr-VihxXd895kyMtF3m8',
  nextPageToken: 'CAUQAA',
  regionCode: 'ES',
  pageInfo: {
    totalResults: 160,
    resultsPerPage: 5,
  },
  items: [
    {
      kind: 'youtube#searchResult',
      etag: 'aaVqQ13rzKhkBpd5CvQui_KgrZw',
      id: {
        kind: 'youtube#video',
        videoId: 'g5Nf5QQd0lI',
      },
      snippet: {
        publishedAt: '2025-07-17T15:01:17Z',
        channelId: 'UCpP1Ki0BltI_ecCXWVus_nA',
        title: 'Ha pasado MEDIO AÑO y SIGUE TIER SS+ | Miyabi Guia y Build ACTUALIZADA | Zenless Zone Zero',
        description: 'Aquí tenéis la Guia de Miyabi, un personaje de Zenless Zone Zero (ZZZ) que ha vuelto MÁS FUERTE QUE NUNCA de tipo hielo y ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/g5Nf5QQd0lI/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/g5Nf5QQd0lI/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/g5Nf5QQd0lI/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'anddriuu',
        liveBroadcastContent: 'none',
        publishTime: '2025-07-17T15:01:17Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'g8ol5T8psCg5xW1PSGrpTFwFkGg',
      id: {
        kind: 'youtube#video',
        videoId: 'AThJ3oQ86vc',
      },
      snippet: {
        publishedAt: '2025-07-15T22:00:02Z',
        channelId: 'UCpP1Ki0BltI_ecCXWVus_nA',
        title: 'NO SOLAMENTE MEJORA A LOS ANÓMALOS | Guia y Build Yuzuha | Zenless Zone Zero',
        description: 'Aquí tenéis la Guia de Yuzuha, un personaje de la 2.1 de Zenless Zone Zero (ZZZ) de tipo support y ethereo. Vamos a hablar de ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/AThJ3oQ86vc/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/AThJ3oQ86vc/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/AThJ3oQ86vc/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'anddriuu',
        liveBroadcastContent: 'none',
        publishTime: '2025-07-15T22:00:02Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'uXaEcsb5ml0OOfxM3yi31FJ8xgM',
      id: {
        kind: 'youtube#video',
        videoId: 'FLwN_SBth6M',
      },
      snippet: {
        publishedAt: '2025-07-12T14:00:23Z',
        channelId: 'UCpP1Ki0BltI_ecCXWVus_nA',
        title: '¿SERÁ LA SIGUIENTE ASTRA YAO? O talvez… | Yuzuha Acceso Anticipado | Zenless Zone Zero',
        description: 'PROBÉ A YUZUHA DE MANERA ANTICIPADA de Zenless Zone Zero (zzz) y su mejora general no tiene sentido. Nuevo ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/FLwN_SBth6M/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/FLwN_SBth6M/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/FLwN_SBth6M/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'anddriuu',
        liveBroadcastContent: 'none',
        publishTime: '2025-07-12T14:00:23Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'zLUGY4DYosQtuqFoCScFk9peFu4',
      id: {
        kind: 'youtube#video',
        videoId: 'hPKgwPHaQzI',
      },
      snippet: {
        publishedAt: '2025-07-04T18:06:52Z',
        channelId: 'UCpP1Ki0BltI_ecCXWVus_nA',
        title: '😭¡NO TENEMOS SUFICIENTES AHORROS! | Yuzuha vs Alice &amp; Miyabi | Zenless Zone Zero',
        description: 'Tirar por Yuzuha, Alice, Miyabi o Yanagi como reruns? Zenless Zone Zero (ZZZ) nos ha traído la versión 2.1 MUY COMPLICADA.',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/hPKgwPHaQzI/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/hPKgwPHaQzI/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/hPKgwPHaQzI/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'anddriuu',
        liveBroadcastContent: 'none',
        publishTime: '2025-07-04T18:06:52Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'ev5Ics0FmZoOKRJdteOxBJsTVWA',
      id: {
        kind: 'youtube#video',
        videoId: '0zgaRnrYNws',
      },
      snippet: {
        publishedAt: '2025-06-29T16:00:03Z',
        channelId: 'UCpP1Ki0BltI_ecCXWVus_nA',
        title: 'TOP 5 PERSONAJES que NECESITAN UNA MEJORA YA | Zenless Zone Zero',
        description: 'Este es el Top 5 personajes de Zenless Zone Zero que necesitan una mejora (buff) de manera urgente. En este top hablaré sobre ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/0zgaRnrYNws/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/0zgaRnrYNws/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/0zgaRnrYNws/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'anddriuu',
        liveBroadcastContent: 'none',
        publishTime: '2025-06-29T16:00:03Z',
      },
    },
  ],
};
