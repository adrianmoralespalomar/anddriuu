import { Routes } from '@angular/router';
import { ROUTES_PATHS } from 'src/app/shared/constants/routes.route';

export const ROUTES: Routes = [
  {
    title: 'Aandriu Gooner',
    path: ROUTES_PATHS.HOME_PATH,
    loadComponent: () => import('./pages/home/home.component').then((x) => x.HomeComponent),
  },
  {
    title: 'Zenless Zone Zero',
    path: ROUTES_PATHS.ZENLESS_ZONE_ZERO,
    loadComponent: () => import('./pages/games/zzz/zzz.component').then((x) => x.ZzzComponent),
  },
  {
    title: 'Honkai Star Rail',
    path: ROUTES_PATHS.HONKAI_STAR_RAIL,
    loadComponent: () => import('./pages/games/hsr/hsr.component').then((x) => x.HsrComponent),
  },
];

export default ROUTES;
