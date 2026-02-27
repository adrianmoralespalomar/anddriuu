import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface Stat {
  label: string;
  value: string;
  icon: string;
  trend?: string;
}

@Component({
  selector: 'app-bento-stats',
  standalone: true,
  imports: [],
  templateUrl: './bento-stats.component.html',
  styleUrl: './bento-stats.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BentoStatsComponent {
  public readonly stats = signal<Stat[]>([
    {
      label: 'Subscribers',
      value: '50K+',
      icon: '👥',
      trend: '+2.5K',
    },
    {
      label: 'Videos',
      value: '500+',
      icon: '🎬',
      trend: '+15',
    },
    {
      label: 'Streams',
      value: '200+',
      icon: '📡',
      trend: 'Live',
    },
  ]);
}
