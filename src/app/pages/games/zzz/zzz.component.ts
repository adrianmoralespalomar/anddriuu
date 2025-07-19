import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { BackgroundService } from 'src/app/services/background.service';
import { YoutubeService, YoutubeVideo } from 'src/app/services/youtube.service';
import { BACKGROUND_ZZZ_PATH } from 'src/app/shared/constants/images';
import { ZENLESS_ZONE_ZERO_UID } from 'src/app/shared/constants/uid';
import { copyToClipboard } from 'src/app/shared/utils/copy-to-clipboard';

@Component({
  selector: 'app-zzz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zzz.component.html',
  styleUrls: ['./zzz.component.css'],
})
export class ZzzComponent implements OnInit {
  @Input() value = '';
  private readonly backgroundService = inject(BackgroundService);
  private readonly youtubeService = inject(YoutubeService);
  protected isCopied = false;
  protected readonly zzzUID = ZENLESS_ZONE_ZERO_UID;
  protected sections = ['header-zzz', 'copy-uid', 'latest-videos', 'latest-pulls', 'warps-per-patch'];
  protected youtubeVideos: YoutubeVideo[] | undefined = undefined;

  ngOnInit() {
    this.youtubeService.getLatestVideos('| Zenless Zone Zero').subscribe({
      next: (resp) => {
        this.youtubeVideos = resp;
      },
    });
    this.backgroundService.setBackgroundImage(BACKGROUND_ZZZ_PATH);
  }

  goToVideo(videoId: string) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  }

  async onCopy() {
    const success = await copyToClipboard(ZENLESS_ZONE_ZERO_UID);
    if (success) {
      this.isCopied = true;
      setTimeout(() => (this.isCopied = false), 2000);
    }
  }
}
