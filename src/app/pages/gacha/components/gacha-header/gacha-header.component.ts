import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-gacha-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gacha-header.component.html',
  styleUrl: './gacha-header.component.css',
})
export class GachaHeaderComponent {
  isVisible = signal(false);
  openMenu = signal<number | null>(null);
  private lastScrollPosition = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset;
    const heroHeight = 600;

    if (scrollPosition > heroHeight) {
      this.isVisible.set(true);
    } else {
      this.isVisible.set(false);
    }

    this.lastScrollPosition = scrollPosition;
  }

  toggleMenu(index: number): void {
    this.openMenu.set(this.openMenu() === index ? null : index);
  }
}
