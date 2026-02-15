import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloatingWindowService } from '../../services/floating-window.service';
import { FloatingWindowComponent } from '../../shared/components/floating-window/floating-window.component';
import { SidebarMenuComponent } from '../../shared/components/sidebar-menu/sidebar-menu.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { LatestVideosComponent } from './components/latest-videos/latest-videos.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { YouTuberHeaderComponent } from './components/youtuber-header/youtuber-header.component';

@Component({
  selector: 'app-youtuber',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, LatestVideosComponent, AboutSectionComponent, NewsletterComponent, SidebarMenuComponent, YouTuberHeaderComponent, FloatingWindowComponent],
  templateUrl: './youtuber.component.html',
  styleUrl: './youtuber.component.css',
})
export class YoutuberComponent {
  constructor(public floatingWindowService: FloatingWindowService) {}
}
