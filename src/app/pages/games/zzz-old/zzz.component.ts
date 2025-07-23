import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BackgroundService } from 'src/app/services/background.service';
import { PullsService } from 'src/app/services/pulls.service';
import { YoutubeService, YoutubeVideo } from 'src/app/services/youtube.service';
import { scrollFadeIn } from 'src/app/shared/animations/scroll-fade-in-left';
import { NavSectionComponent } from 'src/app/shared/components/nav-section/nav-section.component';
import { GAMES_ZZZ_SETTINGS } from 'src/app/shared/constants/games/zzz';
import { BACKGROUND_ZZZ_PATH } from 'src/app/shared/constants/images';
import { ZENLESS_ZONE_ZERO_UID } from 'src/app/shared/constants/uid';
import { copyToClipboard } from 'src/app/shared/utils/copy-to-clipboard';
import { openYoutubeVideo } from 'src/app/shared/utils/open-yt-video';
import { headerAnimation } from '../animations/header';

@Component({
  selector: 'app-zzz',
  standalone: true,
  imports: [CommonModule, NavSectionComponent],
  templateUrl: './zzz.component.html',
  styleUrls: ['./zzz.component.css'],
})
export class ZzzComponent implements OnInit {
  @Input() value = '';
  private readonly backgroundService = inject(BackgroundService);
  private readonly youtubeService = inject(YoutubeService);
  private readonly pullsService = inject(PullsService);
  private readonly domSanitizer = inject(DomSanitizer);
  protected isCopied = false;
  protected readonly zzzUID = ZENLESS_ZONE_ZERO_UID;
  protected youtubeVideos: YoutubeVideo[] | undefined = undefined;
  protected gameZZZSettings = GAMES_ZZZ_SETTINGS;
  protected sections: any[] = GAMES_ZZZ_SETTINGS.PAGE_SECTIONS;

  ngOnInit() {
    this.getLatestVideos();
    this.getLatestPulls(); // Es un UID de test, aandriu deberia hacerlo publico para poder visualizarlo
    this.changeBackgroundImage();
    this.initAnimations();
  }

  getLatestVideos(): void {
    this.youtubeService.getLatestVideos('| Zenless Zone Zero').subscribe({
      next: (resp) => {
        this.youtubeVideos = resp;
      },
    });
  }

  getLatestPulls(): void {
    this.pullsService.getLatestPulls().subscribe({
      next: (resp) => {
        console.log(resp);
      },
    });
  }

  changeBackgroundImage = (): void => this.backgroundService.setBackgroundImage(BACKGROUND_ZZZ_PATH);

  initAnimations(): void {
    headerAnimation();
    scrollFadeIn('.fade-in-left', 'left');
    scrollFadeIn('.fade-in-right', 'right');
  }

  goToVideo = (videoId: string) => openYoutubeVideo(videoId);

  async onCopy() {
    const success = await copyToClipboard(ZENLESS_ZONE_ZERO_UID);
    if (success) {
      this.isCopied = true;
      setTimeout(() => (this.isCopied = false), 2000);
    }
  }

  getUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
