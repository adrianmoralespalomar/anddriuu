import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SvgComponent } from 'src/app/shared/components/svg/svg.component';

@Component({
  selector: 'app-gacha-intro-section',
  standalone: true,
  imports: [CommonModule, SvgComponent],
  templateUrl: './gacha-intro-section.component.html',
  styleUrl: './gacha-intro-section.component.css',
})
export class GachaIntroSectionComponent implements OnInit, OnDestroy {
  @ViewChild('introImage') introImage!: ElementRef;
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
    const introElement = document.querySelector('.intro-image') as HTMLElement;
    const introContent = document.querySelector('.intro-content') as HTMLElement;

    if (introElement) {
      const yPos = -scrolled * 0.5;
      introElement.style.transform = `translateY(${yPos}px)`;
    }

    if (introContent) {
      const opacity = Math.max(0, 1 - scrolled / 400);
      introContent.style.opacity = opacity.toString();
    }
  }
}
