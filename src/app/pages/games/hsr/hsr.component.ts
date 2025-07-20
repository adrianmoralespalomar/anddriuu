import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { BackgroundService } from 'src/app/services/background.service';
import { YoutubeService, YoutubeVideo } from 'src/app/services/youtube.service';
import { scrollFadeIn } from 'src/app/shared/animations/scroll-fade-in-left';
import { BACKGROUND_HSR_PATH } from 'src/app/shared/constants/images';
import { HONKAI_STAR_RAIL_UID } from 'src/app/shared/constants/uid';
import { copyToClipboard } from 'src/app/shared/utils/copy-to-clipboard';
import { openYoutubeVideo } from 'src/app/shared/utils/open-yt-video';
import { headerAnimation } from '../zzz/animations/header';

@Component({
  selector: 'app-hsr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hsr.component.html',
  styleUrls: ['./hsr.component.css'],
})
export class HsrComponent implements OnInit {
  @Input() value = '';
  protected isCopied = false;
  protected readonly hsrUID = HONKAI_STAR_RAIL_UID;
  private readonly backgroundService = inject(BackgroundService);
  private readonly youtubeService = inject(YoutubeService);
  protected youtubeVideos: YoutubeVideo[] | undefined = undefined;

  ngOnInit() {
    this.getLatestVideos();
    this.changeBackgroundImage();
    this.initAnimations();
  }

  getLatestVideos(): void {
    this.youtubeService.getLatestVideos('Honkai').subscribe({
      next: (resp) => {
        this.youtubeVideos = resp;
      },
    });
  }

  changeBackgroundImage = (): void => this.backgroundService.setBackgroundImage(BACKGROUND_HSR_PATH);

  initAnimations(): void {
    headerAnimation();
    scrollFadeIn('.fade-in-left', 'left');
    scrollFadeIn('.fade-in-right', 'right');
  }

  goToVideo = (videoId: string) => openYoutubeVideo(videoId);

  async onCopy() {
    const success = await copyToClipboard(HONKAI_STAR_RAIL_UID);
    if (success) {
      this.isCopied = true;
      setTimeout(() => (this.isCopied = false), 2000);
    }
  }
}
