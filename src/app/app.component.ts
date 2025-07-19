import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ROUTES_PATHS } from 'src/app/shared/constants/routes.route';
import { BackgroundService } from './services/background.service';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, CommonModule],
  template: `
    <gooner-header />
    <div class="parallax-bg" [ngStyle]="{ 'background-image': backgrounImage() ? 'url(' + backgrounImage() + ')' : 'none' }"></div>
    <main class="main-content">
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  private readonly backgroundService = inject(BackgroundService);
  protected backgrounImage = computed(() => this.backgroundService.backgrounImage());
  protected readonly routesPaths = ROUTES_PATHS;
}
