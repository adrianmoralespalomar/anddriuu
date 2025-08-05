import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BackgroundService } from 'src/app/services/background.service';
import { PullsService } from 'src/app/services/pulls.service';
import { YoutubeService, YoutubeVideo } from 'src/app/services/youtube.service';
import { ZENLESS_ZONE_ZERO_UID } from 'src/app/shared/constants/uid';
import { copyToClipboard } from 'src/app/shared/utils/copy-to-clipboard';
import { openUrl } from 'src/app/shared/utils/open-url';
import { openYoutubeVideo } from 'src/app/shared/utils/open-yt-video';
import { GameOptionsComponent, MenuItem } from './game-options/game-options.component';
import { GalleryItem, GamesContentComponent } from './games-content/games-content.component';
@Component({
  selector: 'app-zzz',
  standalone: true,
  imports: [CommonModule, GameOptionsComponent, GamesContentComponent],
  templateUrl: './zzz.component.html',
  styleUrls: ['./zzz.component.css'],
})
export class ZzzComponent implements OnInit {
  private readonly backgroundService = inject(BackgroundService);
  private readonly youtubeService = inject(YoutubeService);
  private readonly pullsService = inject(PullsService);
  private readonly domSanitizer = inject(DomSanitizer);
  protected youtubeVideos: YoutubeVideo[] | undefined = undefined;
  ngOnInit() {
    this.getLatestVideos();
    this.changeBackgroundImage();
  }

  getLatestVideos(): void {
    this.youtubeService.getLatestVideos('| Zenless Zone Zero', 8).subscribe({
      next: (resp) => {
        this.youtubeVideos = resp;
      },
    });
  }

  changeBackgroundImage = (): void => this.backgroundService.setBackgroundImage('/assets/images/background_games.webp');

  getCurrentSelectedItem(): string {
    return '';
  }

  getUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  protected isCopied = false;
  protected readonly zzzUID = ZENLESS_ZONE_ZERO_UID;
  async onCopy() {
    const success = await copyToClipboard(ZENLESS_ZONE_ZERO_UID);
    if (success) {
      this.isCopied = true;
      setTimeout(() => (this.isCopied = false), 2000);
    }
  }

  goToVideo = (videoId: string) => openYoutubeVideo(videoId);

  openUrl = (url: string) => openUrl(url);

  onSelection(index: number) {
    console.log('Opción seleccionada:', index);
  }

  currentItem: MenuItem | null = null;
  selectedItem: MenuItem | null = null;

  menuItems: MenuItem[] = [
    { id: 'home', label: 'Inicio', icon: '🏠', data: { route: '/home' } },
    { id: 'profile', label: 'Perfil', icon: '👤', data: { route: '/profile' } },
    { id: 'settings', label: 'Configuración', icon: '⚙️', data: { route: '/settings' } },
    { id: 'stats', label: 'Estadísticas', icon: '📊', data: { route: '/stats' } },
    { id: 'contact', label: 'Contacto', icon: '📞', data: { route: '/contact' } },
  ];

  onItemSelected(event: { item: MenuItem; index: number }) {
    this.selectedItem = event.item;
    console.log('Item seleccionado:', event.item, 'Índice:', event.index);

    // Aquí podrías navegar a una ruta
    // this.router.navigate([event.item.data?.route]);
  }

  onItemChanged(event: { item: MenuItem; index: number }) {
    this.currentItem = event.item;
    this.navigateToImage(event.index);
    console.log('Item actual:', event.item, 'Índice:', event.index);
  }

  galleryItems = signal<GalleryItem[]>([
    {
      id: '1',
      imageUrl: 'assets/images/latest_pulls_zzz.webp',
      title: 'Montañas Majestuosas',
      description: 'Un paisaje impresionante al atardecer',
      alt: 'Montañas al atardecer',
    },
    {
      id: '2',
      imageUrl: 'assets/images/latest_pulls_hsr.webp',
      title: 'Playa Paradisíaca',
      description: 'Aguas cristalinas y arena blanca',
      alt: 'Playa tropical',
    },
    {
      id: '3',
      imageUrl: 'assets/images/latest_pulls_zzz.webp',
      title: 'Bosque Encantado',
      description: 'Naturaleza en su máximo esplendor',
      alt: 'Bosque verde',
    },
    {
      id: '4',
      imageUrl: 'assets/images/latest_pulls_hsr.webp',
      title: 'Ciudad Nocturna',
      description: 'Luces brillantes en la oscuridad',
      alt: 'Ciudad nocturna',
    },
    {
      id: '5',
      imageUrl: 'assets/images/latest_pulls_zzz.webp',
      title: 'Campo Florido',
      description: 'Colores vibrantes de la primavera',
      alt: 'Campo de flores',
    },
  ]);

  defaultIndex = signal<number>(0);
  externalIndex = signal<number | null>(null);

  navigateToImage(index: number): void {
    this.externalIndex.set(index);
  }

  resetNavigation(): void {
    this.externalIndex.set(null);
  }
}
