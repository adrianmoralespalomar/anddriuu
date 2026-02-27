import { ChangeDetectionStrategy, Component } from '@angular/core';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
  hoverColor: string;
}

@Component({
  selector: 'app-bento-social',
  standalone: true,
  imports: [],
  templateUrl: './bento-social.component.html',
  styleUrl: './bento-social.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BentoSocialComponent {
  public readonly socialLinks: SocialLink[] = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/channel/UCpP1Ki0BltI_ecCXWVus_nA',
      icon: '▶',
      color: '#FF0000',
      hoverColor: '#CC0000',
    },
    {
      name: 'Twitter',
      url: 'https://x.com/anddriuuu',
      icon: '𝕏',
      color: '#1DA1F2',
      hoverColor: '#0d8bd9',
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/XzrMNZQhMC',
      icon: '💬',
      color: '#5865F2',
      hoverColor: '#4752d9',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@anddriuu',
      icon: '♪',
      color: '#000000',
      hoverColor: '#333333',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/anddriuu__/',
      icon: '📷',
      color: '#E4405F',
      hoverColor: '#d12f4d',
    },
  ];

  public openLink(url: string): void {
    window.open(url, '_blank');
  }
}
