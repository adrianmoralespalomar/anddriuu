import { Routes } from '@angular/router';
import { ROUTES_PATHS } from 'src/shared/constants/routes.route';

export const ROUTES: Routes = [
  {
    path: ROUTES_PATHS.ZENLESS_ZONE_ZERO,
    loadComponent: () => import('./games/zzz/zzz.component').then((x) => x.ZzzComponent),
  },
];

export default ROUTES;
