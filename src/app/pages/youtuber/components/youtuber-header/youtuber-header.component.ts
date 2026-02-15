import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-youtuber-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './youtuber-header.component.html',
  styleUrl: './youtuber-header.component.css',
})
export class YouTuberHeaderComponent {
  isVisible = signal(false);
  private lastScrollPosition = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset;
    const heroHeight = 600; // Altura aproximada del hero section

    // Mostrar header cuando se pasa la altura del hero
    if (scrollPosition > heroHeight) {
      this.isVisible.set(true);
    } else {
      this.isVisible.set(false);
    }

    this.lastScrollPosition = scrollPosition;
  }
}
