import { Routes } from '@angular/router';
import { ROUTES_PATHS } from 'src/app/shared/constants/routes.route';

const GENERAL_TITLE = 'Anddriuu';
export const ROUTES: Routes = [
  {
    title: `${GENERAL_TITLE} Gooner`,
    path: ROUTES_PATHS.HOME_PATH,
    loadComponent: () => import('./pages/home/home.component').then((x) => x.HomeComponent),
  },
  {
    title: `${GENERAL_TITLE} | Zenless Zone Zero`,
    path: ROUTES_PATHS.ZENLESS_ZONE_ZERO,
    loadComponent: () => import('./pages/games/zzz-old/zzz.component').then((x) => x.ZzzComponent),
  },
  {
    title: `${GENERAL_TITLE} | Zenless Zone Zero`,
    path: ROUTES_PATHS.ZENLESS_ZONE_ZERO.concat('-new'),
    loadComponent: () => import('./pages/games/zzz/zzz.component').then((x) => x.ZzzComponent),
  },
  {
    title: `${GENERAL_TITLE} | Honkai Star Rail`,
    path: ROUTES_PATHS.HONKAI_STAR_RAIL,
    loadComponent: () => import('./pages/games/hsr/hsr.component').then((x) => x.HsrComponent),
  },
];

export default ROUTES;
