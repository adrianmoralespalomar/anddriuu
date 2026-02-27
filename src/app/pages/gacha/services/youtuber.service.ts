import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  views?: string;
  date: string;
  duration?: string;
}

@Injectable({
  providedIn: 'root',
})
export class YoutuberService {
  private apiKey = 'AIzaSyD_U071NlLDHUrTl-0WQEXLw2plu4_jnb4';
  private andriuChannelId = 'UCpP1Ki0BltI_ecCXWVus_nA';
  private baseUrl = 'https://www.googleapis.com/youtube/v3';
  private areMocksAvailable = false;

  constructor(private http: HttpClient) {}

  getLatestVideos(searchQuery?: string, maxResults = 6): Observable<Video[]> {
    let params = new HttpParams().set('key', this.apiKey).set('channelId', this.andriuChannelId).set('part', 'snippet').set('order', 'date').set('maxResults', String(maxResults)).set('type', 'video');

    if (searchQuery) {
      params = params.set('q', searchQuery);
    }

    const url = `${this.baseUrl}/search`;

    return (this.areMocksAvailable ? of({ items: [] }) : this.http.get(url, { params })).pipe(
      map((res: any) =>
        (res.items || []).map((item: any) => ({
          id: item.id?.videoId || item.id,
          title: item.snippet?.title || '',
          description: item.snippet?.description || '',
          thumbnail: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || '',
          views: '',
          date: item.snippet?.publishedAt || '',
          duration: '',
        })),
      ),
    );
  }

  getVideoById(id: string): Observable<Video | undefined> {
    // Use the 'videos' endpoint if needed for more details (duration, statistics)
    const params = new HttpParams().set('key', this.apiKey).set('id', id).set('part', 'snippet');
    const url = `${this.baseUrl}/videos`;
    return this.http.get(url, { params }).pipe(
      map((res: any) => {
        const item = res.items && res.items[0];
        if (!item) return undefined;
        return {
          id: item.id,
          title: item.snippet?.title || '',
          description: item.snippet?.description || '',
          thumbnail: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || '',
          views: '',
          date: item.snippet?.publishedAt || '',
          duration: '',
        } as Video;
      }),
    );
  }
}
