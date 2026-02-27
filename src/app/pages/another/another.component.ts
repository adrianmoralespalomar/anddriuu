import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BentoAboutComponent } from './components/bento-about/bento-about.component';
import { BentoHeroComponent } from './components/bento-hero/bento-hero.component';
import { BentoSocialComponent } from './components/bento-social/bento-social.component';
import { BentoStatsComponent } from './components/bento-stats/bento-stats.component';
import { BentoVideosComponent } from './components/bento-videos/bento-videos.component';

@Component({
  selector: 'app-another',
  standalone: true,
  imports: [BentoHeroComponent, BentoVideosComponent, BentoSocialComponent, BentoStatsComponent, BentoAboutComponent],
  templateUrl: './another.component.html',
  styleUrl: './another.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnotherComponent {}
