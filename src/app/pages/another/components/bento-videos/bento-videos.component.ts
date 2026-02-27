import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { YoutubeService, YoutubeVideo } from '../../../../services/youtube.service';

@Component({
  selector: 'app-bento-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bento-videos.component.html',
  styleUrl: './bento-videos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BentoVideosComponent {
  private readonly youtubeService = inject(YoutubeService);

  public readonly videos = signal<YoutubeVideo[]>([]);
  public readonly isLoading = signal(true);

  constructor() {
    this.loadVideos();
  }

  private loadVideos(): void {
    this.youtubeService.getLatestVideos(undefined, 3).subscribe({
      next: (videos) => {
        this.videos.set(videos);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  public openVideo(videoUrl: string): void {
    window.open(videoUrl, '_blank');
  }
}
