import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SvgComponent } from 'src/app/shared/components/svg/svg.component';
import { GachaHeaderComponent } from './components/gacha-header/gacha-header.component';
import { GachaLatestVideosComponent } from './components/gacha-latest-videos/gacha-latest-videos.component';

@Component({
  selector: 'app-gacha',
  standalone: true,
  imports: [CommonModule, GachaHeaderComponent, GachaLatestVideosComponent, SvgComponent],
  templateUrl: './gacha.component.html',
  styleUrl: './gacha.component.css',
})
export class GachaComponent {}
