import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-latest-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './latest-videos.component.html',
  styleUrls: ['./latest-videos.component.css'],
})
export class LatestVideosComponent implements OnInit {
  videos: Video[] = [];

  constructor(private youtuberService: YoutuberService) {}

  ngOnInit(): void {
    this.youtuberService.getLatestVideos().subscribe((v) => (this.videos = v));
  }

  onWatchClick(videoId: string): void {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  }

  trackById(_index: number, item: Video) {
    return item.id;
  }
}
