import { openUrl } from './open-url';

export function openYoutubeVideo(videoId: string): void {
  openUrl(`https://www.youtube.com/watch?v=${videoId}`);
}
