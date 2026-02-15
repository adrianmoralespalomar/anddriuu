import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  @ViewChild('heroImage') heroImage!: ElementRef;
  private scrollListener: any;

  ngOnInit(): void {
    this.scrollListener = this.onWindowScroll.bind(this);
    window.addEventListener('scroll', this.scrollListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollListener);
  }

  onWindowScroll(): void {
    const scrolled = window.pageYOffset;
    const heroElement = document.querySelector('.hero-image') as HTMLElement;
    const heroContent = document.querySelector('.hero-content') as HTMLElement;

    if (heroElement) {
      // Parallax effect: move upward at 50% of scroll speed to keep image coverage
      const yPos = -scrolled * 0.5;
      heroElement.style.transform = `translateY(${yPos}px)`;
    }

    if (heroContent) {
      // Fade out content as you scroll
      const opacity = Math.max(0, 1 - scrolled / 400);
      heroContent.style.opacity = opacity.toString();
    }
  }
}
