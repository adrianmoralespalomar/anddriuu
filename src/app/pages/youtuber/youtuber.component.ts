import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { FloatingWindowService } from '../../services/floating-window.service';
import { FloatingWindowComponent } from '../../shared/components/floating-window/floating-window.component';
import { SidebarMenuComponent } from '../../shared/components/sidebar-menu/sidebar-menu.component';
import { IntroSectionComponent } from './components/intro-section/intro-section.component';
import { LatestVideosComponent } from './components/latest-videos/latest-videos.component';
import { YouTuberHeaderComponent } from './components/youtuber-header/youtuber-header.component';

@Component({
  selector: 'app-youtuber',
  standalone: true,
  imports: [CommonModule, IntroSectionComponent, LatestVideosComponent, SidebarMenuComponent, YouTuberHeaderComponent, FloatingWindowComponent],
  templateUrl: './youtuber.component.html',
  styleUrl: './youtuber.component.css',
})
export class YoutuberComponent {
  showScrollButton = false;

  public floatingWindowService = inject(FloatingWindowService);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || 0;
    this.showScrollButton = scrollPos > 240; // show after some scrolling
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
