import { CommonModule } from '@angular/common';
import { Component, computed, effect, type ElementRef, HostListener, Input, type OnChanges, type OnDestroy, type OnInit, signal, type SimpleChanges, ViewChild } from '@angular/core';
export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  alt?: string;
}

@Component({
  selector: 'app-games-content',
  templateUrl: './games-content.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./games-content.component.css'],
})
export class GamesContentComponent implements OnInit, OnDestroy, OnChanges {
  @Input() galleryItems: GalleryItem[] = [];
  @Input() defaultImageIndex = 0;
  @Input() externalImageIndex: number | null = null;

  @ViewChild('scrollSection', { static: true }) scrollSection!: ElementRef;
  @ViewChild('contentContainer', { static: true }) contentContainer!: ElementRef;

  // Signals para estado reactivo
  items = signal<GalleryItem[]>([]);
  currentIndex = signal<number>(0);
  fadeOutIndex = signal<number>(-1);
  isAnimating = signal<boolean>(false);

  // Propiedades para scroll
  private scrollThreshold = 50;
  private lastScrollY = 0;
  private scrollTimeout: any;

  // Computed para obtener el item actual
  currentItem = computed(() => {
    const index = this.currentIndex();
    const itemsArray = this.items();
    return itemsArray[index] || null;
  });

  constructor() {
    // Effect para reaccionar a cambios externos
    effect(() => {
      if (this.externalImageIndex !== null && this.externalImageIndex !== this.currentIndex()) {
        this.goToImage(this.externalImageIndex);
      }
    });
  }

  ngOnInit(): void {
    this.initializeGallery();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['galleryItems'] && changes['galleryItems'].currentValue) {
      this.items.set(changes['galleryItems'].currentValue);
    }

    if (changes['defaultImageIndex'] && changes['defaultImageIndex'].currentValue !== undefined) {
      this.currentIndex.set(changes['defaultImageIndex'].currentValue);
    }

    if (changes['externalImageIndex'] && changes['externalImageIndex'].currentValue !== null) {
      this.goToImage(changes['externalImageIndex'].currentValue);
    }
  }

  ngOnDestroy(): void {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  private initializeGallery(): void {
    this.items.set(this.galleryItems);
    this.currentIndex.set(this.defaultImageIndex);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      this.handleScroll();
    }, 10);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        this.nextImage();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        this.prevImage();
        break;
    }
  }

  private handleScroll(): void {
    if (this.isAnimating()) return;

    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - this.lastScrollY;

    if (Math.abs(scrollDelta) > this.scrollThreshold) {
      if (scrollDelta > 0) {
        this.nextImage();
      } else {
        this.prevImage();
      }
      this.lastScrollY = currentScrollY;
    }
  }

  nextImage(): void {
    const current = this.currentIndex();
    const total = this.items().length;

    if (current < total - 1) {
      this.goToImage(current + 1);
    }
  }

  prevImage(): void {
    const current = this.currentIndex();

    if (current > 0) {
      this.goToImage(current - 1);
    }
  }

  goToImage(newIndex: number): void {
    const current = this.currentIndex();
    const total = this.items().length;

    if (newIndex === current || this.isAnimating() || newIndex < 0 || newIndex >= total) {
      return;
    }

    this.isAnimating.set(true);
    this.fadeOutIndex.set(current);

    // Usar setTimeout para permitir que Angular procese los cambios
    setTimeout(() => {
      this.currentIndex.set(newIndex);
      this.fadeOutIndex.set(-1);

      // Limpiar después de la animación
      setTimeout(() => {
        this.isAnimating.set(false);
      }, 600);
    }, 50);
  }

  // Método público para uso externo
  public navigateToImage(index: number): void {
    this.goToImage(index);
  }

  // Método público para obtener el índice actual
  public getCurrentIndex(): number {
    return this.currentIndex();
  }

  // Método público para obtener el item actual
  public getCurrentItem(): GalleryItem | null {
    return this.currentItem();
  }
}
