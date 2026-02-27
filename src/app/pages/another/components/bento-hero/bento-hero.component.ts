import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bento-hero',
  standalone: true,
  imports: [],
  templateUrl: './bento-hero.component.html',
  styleUrl: './bento-hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BentoHeroComponent {
  public readonly logoPath = '/assets/images/logo_anddriuu.webp';
}
