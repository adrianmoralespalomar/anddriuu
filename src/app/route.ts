import { Routes } from '@angular/router';
import { ROUTES_PATHS } from 'src/app/shared/constants/routes.route';

export const ROUTES: Routes = [
  {
    path: ROUTES_PATHS.HOME_PATH,
    loadComponent: () => import('./pages/home/home.component').then((x) => x.HomeComponent),
  },
  {
    path: ROUTES_PATHS.ZENLESS_ZONE_ZERO,
    loadComponent: () => import('./pages/games/zzz/zzz.component').then((x) => x.ZzzComponent),
  },
];

export default ROUTES;
