import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
}

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css',
})
export class NewsletterComponent {
  socialLinks: SocialLink[] = [
    {
      name: 'YouTube',
      icon: '📺',
      url: 'https://www.youtube.com/channel/UCpP1Ki0BltI_ecCXWVus_nA',
      color: '#ff0000',
    },
    {
      name: 'Twitch',
      icon: '📡',
      url: 'https://www.twitch.tv/anddriuuu',
      color: '#9146ff',
    },
    {
      name: 'Twitter',
      icon: '𝕏',
      url: 'https://x.com/anddriuuu',
      color: '#000000',
    },
    {
      name: 'Discord',
      icon: '💬',
      url: 'https://discord.gg/XzrMNZQhMC',
      color: '#5865F2',
    },
    {
      name: 'TikTok',
      icon: '🎵',
      url: 'https://www.tiktok.com/@anddriuu',
      color: '#000000',
    },
    {
      name: 'Instagram',
      icon: '📸',
      url: 'https://www.instagram.com/anddriuu__/',
      color: '#E4405F',
    },
  ];

  onSocialClick(url: string): void {
    window.open(url, '_blank');
  }
}
