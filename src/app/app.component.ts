import { Component } from '@angular/core';
import { ROUTES_PATHS } from 'src/shared/constants/routes.route';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  protected readonly routesPaths = ROUTES_PATHS;
  title = 'anddriuu';
}
