import { Component, inject, OnInit } from '@angular/core';
import { BackgroundService } from 'src/app/services/background.service';
import { SvgComponent } from 'src/app/shared/components/svg/svg.component';
import { BACKGROUND_HOME_PATH } from 'src/app/shared/constants/images';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SvgComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private readonly backgroundService = inject(BackgroundService);

  ngOnInit() {
    this.backgroundService.setBackgroundImage(BACKGROUND_HOME_PATH);
  }
}
