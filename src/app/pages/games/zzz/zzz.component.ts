import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BackgroundService } from 'src/app/services/background.service';

@Component({
  selector: 'app-zzz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zzz.component.html',
  styleUrls: ['./zzz.component.css'],
})
export class ZzzComponent implements OnInit {
  private readonly backgroundService = inject(BackgroundService);

  ngOnInit() {
    this.changeBackgroundImage();
  }

  changeBackgroundImage = (): void => this.backgroundService.setBackgroundImage('/assets/images/background_games.webp');
}
