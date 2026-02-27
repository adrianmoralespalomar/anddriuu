import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SvgComponent } from 'src/app/shared/components/svg/svg.component';

@Component({
  selector: 'app-intro-section',
  standalone: true,
  imports: [CommonModule, SvgComponent],
  templateUrl: './intro-section.component.html',
  styleUrl: './intro-section.component.css',
})
export class IntroSectionComponent implements OnInit, OnDestroy {
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
      // Parallax effect: move upward at 50% of scroll speed to keep image coverage
      const yPos = -scrolled * 0.5;
      introElement.style.transform = `translateY(${yPos}px)`;
    }

    if (introContent) {
      // Fade out content as you scroll
      const opacity = Math.max(0, 1 - scrolled / 400);
      introContent.style.opacity = opacity.toString();
    }
  }
}
