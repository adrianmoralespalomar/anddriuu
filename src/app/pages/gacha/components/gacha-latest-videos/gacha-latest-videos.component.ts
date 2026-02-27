import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { YoutuberService } from '../../services/youtuber.service';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  views?: string;
  date: string;
  duration?: string;
}

@Component({
  selector: 'app-gacha-latest-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gacha-latest-videos.component.html',
  styleUrls: ['./gacha-latest-videos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GachaLatestVideosComponent implements OnInit {
  private readonly youtuberService = inject(YoutuberService);

  protected readonly videos = signal<Video[]>([]);

  private readonly maxVideos = 5;

  protected readonly visibleVideos = computed(() => this.videos().slice(0, this.maxVideos));

  ngOnInit(): void {
    this.youtuberService.getLatestVideos().subscribe((v) => this.videos.set(v));
  }

  onWatchClick(videoId: string): void {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  }

  trackById(_index: number, item: Video): string {
    return item.id;
  }
}
