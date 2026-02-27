import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bento-about',
  standalone: true,
  imports: [],
  templateUrl: './bento-about.component.html',
  styleUrl: './bento-about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BentoAboutComponent {
  public readonly description = 'Content creator especializado en juegos gacha como Genshin Impact, Zenless Zone Zero y Honkai Star Rail. Transmisiones en vivo, guías, análisis y entretenimiento.';

  public readonly highlights = [
    { icon: '🎮', text: 'Gacha Gaming Expert' },
    { icon: '📊', text: 'Data & Analytics' },
    { icon: '🎭', text: 'Entertainment' },
  ];
}
